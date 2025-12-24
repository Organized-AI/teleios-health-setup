#!/bin/bash

# GTM JSON Validation Script
# Validates GTM container exports and tracking configurations

FILE_PATH="$1"

# Only process JSON files that look like GTM containers or tracking configs
if [[ ! "$FILE_PATH" =~ \.(json)$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

# Check if it's a GTM container export
if grep -q "exportFormatVersion" "$FILE_PATH" 2>/dev/null; then
    echo "✓ Valid GTM container export format detected"
    
    # Check for required fields
    if ! grep -q "containerVersion" "$FILE_PATH"; then
        echo "⚠ Warning: Missing containerVersion field"
    fi
    
    # Check for Meta Pixel ID placeholder
    if grep -q "YOUR_PIXEL_ID\|PIXEL_ID_HERE\|912613798381607" "$FILE_PATH"; then
        echo "ℹ Note: Contains Meta Pixel ID - verify it's correct"
    fi
    
    # Check for access token placeholder
    if grep -q "YOUR_ACCESS_TOKEN\|ACCESS_TOKEN_HERE\|EAA" "$FILE_PATH"; then
        echo "ℹ Note: Contains access token - ensure it's valid"
    fi
fi

# Check if it's a webhook payload
if grep -q "event_name\|user_data" "$FILE_PATH" 2>/dev/null; then
    echo "✓ Tracking event payload detected"
    
    # Validate required fields for CAPI
    if ! grep -q "email_address\|phone_number" "$FILE_PATH"; then
        echo "⚠ Warning: Missing user identifiers (email/phone) for matching"
    fi
fi

exit 0
