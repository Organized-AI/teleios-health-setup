#!/usr/bin/env node
/**
 * GTM Container Deployment Script (Node.js)
 *
 * Deploys GTM containers using the Google Tag Manager API v2
 *
 * Prerequisites:
 * 1. npm install googleapis
 * 2. Service account JSON key with Tag Manager permissions
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 *
 * Usage:
 *   node deploy-gtm.js web     # Deploy web container
 *   node deploy-gtm.js server  # Deploy server container
 *   node deploy-gtm.js all     # Deploy both
 *   node deploy-gtm.js list    # List containers
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  accountId: '6328225355',
  webContainerId: '237555513',
  serverContainerId: '237556533',
  webContainerPublicId: 'GTM-WM5S3WSG',
  serverContainerPublicId: 'GTM-MLBJCV38'
};

// Try to load googleapis
let google;
try {
  google = require('googleapis').google;
} catch (e) {
  console.log('\n⚠️  googleapis package not installed.\n');
  console.log('To enable programmatic GTM deployment, run:');
  console.log('  npm install googleapis\n');
  console.log('For now, use the manual import method:');
  console.log('1. Open GTM: https://tagmanager.google.com/');
  console.log('2. Go to Admin → Import Container');
  console.log('3. Upload the JSON file from this directory\n');
  process.exit(0);
}

// Initialize Tag Manager API
async function getTagManagerClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers']
  });

  const authClient = await auth.getClient();
  return google.tagmanager({ version: 'v2', auth: authClient });
}

// List all containers in the account
async function listContainers() {
  console.log('📋 Listing containers...\n');

  try {
    const tagmanager = await getTagManagerClient();
    const response = await tagmanager.accounts.containers.list({
      parent: `accounts/${CONFIG.accountId}`
    });

    const containers = response.data.container || [];
    console.log('Containers in account ' + CONFIG.accountId + ':\n');

    containers.forEach(container => {
      console.log(`  📦 ${container.name}`);
      console.log(`     ID: ${container.containerId}`);
      console.log(`     Public ID: ${container.publicId}`);
      console.log(`     Type: ${container.usageContext.join(', ')}`);
      console.log('');
    });

    return containers;
  } catch (error) {
    console.error('❌ Error listing containers:', error.message);
    throw error;
  }
}

// Get or create a workspace
async function getOrCreateWorkspace(tagmanager, containerId, name) {
  const parent = `accounts/${CONFIG.accountId}/containers/${containerId}`;

  // List existing workspaces
  const response = await tagmanager.accounts.containers.workspaces.list({ parent });
  const workspaces = response.data.workspace || [];

  // Find default workspace or first available
  let workspace = workspaces.find(w => w.name === 'Default Workspace') || workspaces[0];

  if (!workspace) {
    // Create new workspace
    const createResponse = await tagmanager.accounts.containers.workspaces.create({
      parent,
      requestBody: {
        name: name || `Deploy-${Date.now()}`,
        description: 'Created by deployment script'
      }
    });
    workspace = createResponse.data;
    console.log(`  ✅ Created workspace: ${workspace.name}`);
  } else {
    console.log(`  📂 Using workspace: ${workspace.name}`);
  }

  return workspace;
}

// Create a variable
async function createVariable(tagmanager, workspacePath, variable) {
  try {
    const response = await tagmanager.accounts.containers.workspaces.variables.create({
      parent: workspacePath,
      requestBody: variable
    });
    console.log(`  ✅ Created variable: ${variable.name}`);
    return response.data;
  } catch (error) {
    if (error.code === 409) {
      console.log(`  ⏭️  Variable exists: ${variable.name}`);
    } else {
      console.error(`  ❌ Error creating variable ${variable.name}:`, error.message);
    }
  }
}

// Create a trigger
async function createTrigger(tagmanager, workspacePath, trigger) {
  try {
    const response = await tagmanager.accounts.containers.workspaces.triggers.create({
      parent: workspacePath,
      requestBody: trigger
    });
    console.log(`  ✅ Created trigger: ${trigger.name}`);
    return response.data;
  } catch (error) {
    if (error.code === 409) {
      console.log(`  ⏭️  Trigger exists: ${trigger.name}`);
    } else {
      console.error(`  ❌ Error creating trigger ${trigger.name}:`, error.message);
    }
  }
}

// Create a tag
async function createTag(tagmanager, workspacePath, tag) {
  try {
    const response = await tagmanager.accounts.containers.workspaces.tags.create({
      parent: workspacePath,
      requestBody: tag
    });
    console.log(`  ✅ Created tag: ${tag.name}`);
    return response.data;
  } catch (error) {
    if (error.code === 409) {
      console.log(`  ⏭️  Tag exists: ${tag.name}`);
    } else {
      console.error(`  ❌ Error creating tag ${tag.name}:`, error.message);
    }
  }
}

// Deploy a container from JSON
async function deployContainer(containerId, jsonFile, containerName) {
  console.log(`\n🚀 Deploying ${containerName} (${containerId})...\n`);

  try {
    // Read JSON file
    const jsonPath = path.join(__dirname, jsonFile);
    if (!fs.existsSync(jsonPath)) {
      console.error(`❌ JSON file not found: ${jsonPath}`);
      return false;
    }

    const containerConfig = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const version = containerConfig.containerVersion;

    const tagmanager = await getTagManagerClient();

    // Get or create workspace
    const workspace = await getOrCreateWorkspace(tagmanager, containerId, 'Teleios-Deploy');
    const workspacePath = workspace.path;

    console.log('\n📝 Creating variables...');
    for (const variable of (version.variable || [])) {
      // Clean up variable for API (remove IDs that will be auto-generated)
      const cleanVariable = {
        name: variable.name,
        type: variable.type,
        parameter: variable.parameter,
        notes: variable.notes
      };
      await createVariable(tagmanager, workspacePath, cleanVariable);
    }

    console.log('\n⚡ Creating triggers...');
    const triggerMap = {}; // Map old IDs to new IDs
    for (const trigger of (version.trigger || [])) {
      const cleanTrigger = {
        name: trigger.name,
        type: trigger.type,
        customEventFilter: trigger.customEventFilter,
        filter: trigger.filter,
        parameter: trigger.parameter
      };
      const created = await createTrigger(tagmanager, workspacePath, cleanTrigger);
      if (created) {
        triggerMap[trigger.triggerId] = created.triggerId;
      }
    }

    console.log('\n🏷️  Creating tags...');
    for (const tag of (version.tag || [])) {
      // Map old trigger IDs to new ones
      const firingTriggerIds = (tag.firingTriggerId || []).map(id => triggerMap[id] || id);

      const cleanTag = {
        name: tag.name,
        type: tag.type,
        parameter: tag.parameter,
        firingTriggerId: firingTriggerIds,
        tagFiringOption: tag.tagFiringOption,
        priority: tag.priority
      };
      await createTag(tagmanager, workspacePath, cleanTag);
    }

    console.log(`\n✅ ${containerName} deployment complete!`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Open GTM: https://tagmanager.google.com/`);
    console.log(`   2. Review changes in workspace: ${workspace.name}`);
    console.log(`   3. Preview and test`);
    console.log(`   4. Submit and publish`);

    return true;
  } catch (error) {
    console.error(`\n❌ Deployment failed:`, error.message);
    return false;
  }
}

// Deploy web container
async function deployWeb() {
  return deployContainer(
    CONFIG.webContainerId,
    'web-gtm-container.json',
    'Web GTM Container'
  );
}

// Deploy server container
async function deployServer() {
  console.log('\n⚠️  Server container deployment has limitations:');
  console.log('   - CAPIG tags require manual creation (template not in API)');
  console.log('   - Clients may need manual configuration');
  console.log('   - Update secret constants after import\n');

  return deployContainer(
    CONFIG.serverContainerId,
    'server-gtm-container.json',
    'Server GTM Container'
  );
}

// Show help
function showHelp() {
  console.log(`
GTM Container Deployment Script

Usage: node deploy-gtm.js [command]

Commands:
  web       Deploy web container (${CONFIG.webContainerPublicId})
  server    Deploy server container (${CONFIG.serverContainerPublicId})
  all       Deploy both containers
  list      List containers in account
  help      Show this help message

Prerequisites:
  - npm install googleapis
  - GOOGLE_APPLICATION_CREDENTIALS set to service account JSON
  - Service account has Tag Manager Edit permissions

Environment:
  GOOGLE_APPLICATION_CREDENTIALS - Path to service account key file
  `);
}

// Main
async function main() {
  const command = process.argv[2] || 'help';

  switch (command) {
    case 'web':
      await deployWeb();
      break;
    case 'server':
      await deployServer();
      break;
    case 'all':
      await deployWeb();
      await deployServer();
      break;
    case 'list':
      await listContainers();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
