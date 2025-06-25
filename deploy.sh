#!/bin/bash

# Deployment script for resume-ai
echo "🚀 Starting deployment process..."

# Ensure we're on main branch
git checkout main

# Create or switch to deployment branch
git checkout deployment 2>/dev/null || git checkout -b deployment

# Merge latest changes from main
echo "📦 Merging latest changes from main..."
git merge main --no-edit

# Ensure resume-data.json exists for deployment
if [ ! -f "resume-data.json" ]; then
    echo "⚠️  resume-data.json not found! Please create it for deployment."
    echo "You can copy from resume-data.json.example and edit with your data."
    exit 1
fi

# Commit any changes
git add .
git commit -m "Update deployment branch - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to trigger Vercel deployment
echo "🌐 Pushing to deployment branch..."
git push origin deployment

echo "✅ Deployment triggered! Check Vercel dashboard for status."
echo "🔄 Switching back to main branch..."
git checkout main