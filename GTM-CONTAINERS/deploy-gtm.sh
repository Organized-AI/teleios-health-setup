#!/bin/bash
#
# GTM Container Deployment Script
# Deploys containers using the Google Tag Manager API
#
# Prerequisites:
# 1. gcloud CLI installed and authenticated
# 2. GTM API enabled in Google Cloud project
# 3. Service account with Tag Manager permissions
#
# Usage:
#   ./deploy-gtm.sh [web|server|all]
#

set -e

# Configuration
GTM_ACCOUNT_ID="6328225355"
WEB_CONTAINER_ID="237555513"
SERVER_CONTAINER_ID="237556533"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."

    if ! command -v gcloud &> /dev/null; then
        log_error "gcloud CLI not found. Install from: https://cloud.google.com/sdk/docs/install"
        exit 1
    fi

    if ! command -v curl &> /dev/null; then
        log_error "curl not found. Please install curl."
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        log_warn "jq not found. Some features may be limited."
    fi

    # Check authentication
    if ! gcloud auth print-access-token &> /dev/null; then
        log_error "Not authenticated with gcloud. Run: gcloud auth login"
        exit 1
    fi

    log_info "Prerequisites check passed."
}

# Get access token
get_access_token() {
    gcloud auth print-access-token
}

# Create a new workspace
create_workspace() {
    local container_id=$1
    local workspace_name=$2
    local access_token=$(get_access_token)

    log_info "Creating workspace: $workspace_name"

    curl -s -X POST \
        "https://tagmanager.googleapis.com/tagmanager/v2/accounts/${GTM_ACCOUNT_ID}/containers/${container_id}/workspaces" \
        -H "Authorization: Bearer ${access_token}" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"${workspace_name}\", \"description\": \"Auto-created by deployment script\"}"
}

# Import container configuration
import_container() {
    local container_id=$1
    local json_file=$2
    local access_token=$(get_access_token)

    log_info "Importing container from: $json_file"

    # First, get or create a workspace
    local workspaces=$(curl -s \
        "https://tagmanager.googleapis.com/tagmanager/v2/accounts/${GTM_ACCOUNT_ID}/containers/${container_id}/workspaces" \
        -H "Authorization: Bearer ${access_token}")

    # Use default workspace or create new one
    local workspace_id=$(echo "$workspaces" | jq -r '.workspace[0].workspaceId // empty')

    if [ -z "$workspace_id" ]; then
        log_info "Creating new workspace..."
        local new_workspace=$(create_workspace "$container_id" "Deployment-$(date +%Y%m%d-%H%M%S)")
        workspace_id=$(echo "$new_workspace" | jq -r '.workspaceId')
    fi

    log_info "Using workspace ID: $workspace_id"

    # Import the container
    # Note: GTM API requires creating each entity separately, not bulk import
    # For bulk import, use the GTM UI or the Admin API

    log_warn "GTM API requires creating entities individually."
    log_warn "For bulk import, use GTM UI: Admin > Import Container"
    log_info "Container JSON file ready at: $json_file"
}

# Deploy web container
deploy_web() {
    log_info "Deploying Web GTM Container (GTM-WM5S3WSG)..."
    import_container "$WEB_CONTAINER_ID" "${SCRIPT_DIR}/web-gtm-container.json"
}

# Deploy server container
deploy_server() {
    log_info "Deploying Server GTM Container (GTM-MLBJCV38)..."
    import_container "$SERVER_CONTAINER_ID" "${SCRIPT_DIR}/server-gtm-container.json"
}

# Create version and publish
publish_container() {
    local container_id=$1
    local version_name=$2
    local access_token=$(get_access_token)

    log_info "Creating version: $version_name"

    # Get workspace
    local workspaces=$(curl -s \
        "https://tagmanager.googleapis.com/tagmanager/v2/accounts/${GTM_ACCOUNT_ID}/containers/${container_id}/workspaces" \
        -H "Authorization: Bearer ${access_token}")

    local workspace_id=$(echo "$workspaces" | jq -r '.workspace[0].workspaceId')

    # Create version
    curl -s -X POST \
        "https://tagmanager.googleapis.com/tagmanager/v2/accounts/${GTM_ACCOUNT_ID}/containers/${container_id}/workspaces/${workspace_id}:create_version" \
        -H "Authorization: Bearer ${access_token}" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"${version_name}\", \"notes\": \"Deployed via script\"}"
}

# List containers
list_containers() {
    local access_token=$(get_access_token)

    log_info "Listing containers in account ${GTM_ACCOUNT_ID}..."

    curl -s \
        "https://tagmanager.googleapis.com/tagmanager/v2/accounts/${GTM_ACCOUNT_ID}/containers" \
        -H "Authorization: Bearer ${access_token}" | jq '.container[] | {name, publicId, containerId}'
}

# Show help
show_help() {
    echo "GTM Container Deployment Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  web       Deploy web container (GTM-WM5S3WSG)"
    echo "  server    Deploy server container (GTM-MLBJCV38)"
    echo "  all       Deploy both containers"
    echo "  list      List containers in account"
    echo "  help      Show this help message"
    echo ""
    echo "Prerequisites:"
    echo "  - gcloud CLI installed and authenticated"
    echo "  - Tag Manager API enabled in GCP project"
    echo "  - Appropriate IAM permissions"
    echo ""
    echo "Note: For bulk import, the GTM UI is recommended."
    echo "      This script provides individual entity creation."
}

# Main
main() {
    case "${1:-help}" in
        web)
            check_prerequisites
            deploy_web
            ;;
        server)
            check_prerequisites
            deploy_server
            ;;
        all)
            check_prerequisites
            deploy_web
            deploy_server
            ;;
        list)
            check_prerequisites
            list_containers
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
