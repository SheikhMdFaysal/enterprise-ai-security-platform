#!/bin/bash
# DigitalOcean Deployment Script
# Enterprise AI Security Red Teaming Platform

set -e

echo "=== DigitalOcean Deployment ==="
echo ""

# Check doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "ERROR: doctl CLI not installed."
    echo "Install: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    exit 1
fi

# Check authentication
echo "Checking DigitalOcean authentication..."
doctl auth list || { echo "Run: doctl auth init"; exit 1; }

echo ""
echo "Deploying app from .do/app.yaml..."
doctl apps create --spec .do/app.yaml --wait

echo ""
echo "Deployment complete!"
echo "Run 'doctl apps list' to see your app URL."
