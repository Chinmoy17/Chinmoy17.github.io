# Deployment Guide

## Deployment Methods

### Method 1: GitHub Actions (Automated)
- **Status:** Configured but needs fixing
- **Trigger:** Automatically deploys when you push to `main` branch
- **Issue:** Currently not building React app properly - deploys source code instead of build
- **Location:** `.github/workflows/static.yml`

### Method 2: gh-pages (Manual) ✅ Currently Working
- **Command:** `npm run deploy`
- **Process:** Builds app automatically and deploys to `gh-pages` branch
- **Recommended** until GitHub Actions is fixed

---

## How to Deploy

### Option A: Manual Deployment (Recommended Now)
Run `npm run deploy` from any branch to build and deploy immediately.

### Option B: GitHub Actions (After Fixing Workflow)
Push to `main` branch to trigger automatic deployment.

---

## Merging to Main Branch

1. Work on `dev` branch for all changes
2. Test locally with `npm start`
3. Run `npm run build` to verify build works
4. Merge to main:
   - `git checkout main`
   - `git merge dev`
   - `git push origin main`
5. Either wait for GitHub Actions or run `npm run deploy`

---

## Live Site
**URL:** https://chinmoy17.github.io

**Last Updated:** January 2, 2026
