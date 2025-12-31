# Phase 5 Complete: Publish GTM Containers

**Date:** December 31, 2024
**Status:** PENDING - Requires GTM API Access

---

## Summary

Phase 5 involves publishing the GTM containers to make all tracking configurations live. This requires GTM API access through MCP tools.

---

## Container Details

### Server GTM Container (sGTM)

| Field | Value |
|-------|-------|
| Container ID | GTM-MLBJCV38 |
| Account ID | 6328225355 |
| Container ID (numeric) | 237556533 |
| Workspace ID | 4 |
| Pending Changes | 12 |
| Status | **PENDING PUBLISH** |

### Web GTM Container

| Field | Value |
|-------|-------|
| Container ID | GTM-WM5S3WSG |
| Account ID | 6328225355 |
| Container ID (numeric) | 237555513 |
| Workspace ID | 3 |
| Pending Changes | Multiple |
| Status | **PENDING PUBLISH** |

---

## Required Actions

### 1. Publish Server GTM Container

```
Step 1: Create Version
  Tool: gtm_workspace
  Parameters:
    accountId: 6328225355
    containerId: 237556533
    workspaceId: 4
    action: createVersion

Step 2: Publish Version
  Tool: gtm_version
  Parameters:
    action: publish
    accountId: 6328225355
    containerId: 237556533
    containerVersionId: [from Step 1 response]
```

### 2. Publish Web GTM Container

```
Step 1: Create Version
  Tool: gtm_workspace
  Parameters:
    accountId: 6328225355
    containerId: 237555513
    workspaceId: 3
    action: createVersion

Step 2: Publish Version
  Tool: gtm_version
  Parameters:
    action: publish
    accountId: 6328225355
    containerId: 237555513
    containerVersionId: [from Step 1 response]
```

### 3. Verify Publication

```
Tool: gtm_version_header
Parameters:
  action: latest
  accountId: 6328225355
  containerId: [237556533 or 237555513]
```

---

## Manual Publish Alternative

If MCP tools are unavailable, publish manually:

1. **Server GTM:**
   - Go to: https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/4
   - Click "Submit" in top right
   - Add version name: "Phase 5 - Full CAPI Implementation"
   - Click "Publish"

2. **Web GTM:**
   - Go to: https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3
   - Click "Submit" in top right
   - Add version name: "Phase 5 - Enhanced Tracking"
   - Click "Publish"

---

## Verification Checklist

| Check | Status |
|-------|--------|
| sGTM Version Created | Pending |
| sGTM Version Published | Pending |
| Web GTM Version Created | Pending |
| Web GTM Version Published | Pending |
| Both containers verified live | Pending |

---

## Next Steps

Once containers are published:
1. Verify via gtm_version_header tool
2. Test tracking on live site
3. Update this file with version IDs and timestamps
