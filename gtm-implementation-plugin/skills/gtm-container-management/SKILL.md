---
name: gtm-container-management
description: Manage Google Tag Manager containers including import/export, version control, and workspace management. Use when importing container JSON files, managing multiple workspaces, or deploying changes across environments.
---

# GTM Container Management Skill

This skill covers GTM container operations, import/export procedures, and version management.

## When to Use This Skill

- Importing container JSON files
- Exporting containers for backup
- Managing multiple workspaces
- Deploying changes across environments
- Merging container configurations

## Container Structure

### Web GTM Container
```json
{
  "exportFormatVersion": 2,
  "exportTime": "2024-01-01 00:00:00",
  "containerVersion": {
    "accountId": "123456789",
    "containerId": "12345678",
    "containerVersionId": "1",
    "name": "Container Name",
    "tag": [...],
    "trigger": [...],
    "variable": [...],
    "folder": [...]
  }
}
```

## Import Operations

### Import to New Container
1. Open GTM → Select container
2. Admin → Import Container
3. Upload JSON file
4. Choose "Overwrite" for new containers
5. Review changes → Confirm

### Import to Existing Container
1. Admin → Import Container
2. Upload JSON file
3. Choose "Merge" → "Rename conflicting tags/triggers/variables"
4. Review changes carefully
5. Confirm → Submit to publish

### Merge Strategies
- **Overwrite**: Replace all existing components
- **Merge (Rename)**: Keep both, rename conflicts
- **Merge (Overwrite)**: Replace conflicts, keep unique

## Export Operations

### Export Current Version
1. Admin → Export Container
2. Downloads JSON file
3. Use for backup or migration

### Export Specific Version
1. Versions → Select version
2. Three dots menu → Export
3. Downloads that version's JSON

## Version Management

### Create Version
```
Submit → Add version name and description → Publish
```

### Version Naming Convention
```
[Project] - [Feature] v[Major].[Minor]
Example: "Teleios Health - Lead Tracking v1.2"
```

## Workspace Best Practices

### Development Workflow
1. **Default Workspace**: Production-ready changes
2. **Dev Workspace**: Testing new features
3. **Staging Workspace**: Pre-production validation

## Recovery Procedures

### Rollback to Previous Version
1. Versions → Find working version
2. Three dots → Publish
3. Creates new version with old config

### Restore Deleted Items
- Check version history
- Export old version
- Import specific components
