# Heroku Deployment Guide for WhatsApp Bot

Complete guide to deploy your WhatsApp bot on Heroku with best practices and important considerations.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Deployment Steps](#deployment-steps)
3. [Environment Variables](#environment-variables)
4. [Heroku Do's](#heroku-dos)
5. [Heroku Don'ts](#heroku-donts)
6. [Persistent Authentication Files](#persistent-authentication-files)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Heroku account (create at https://www.heroku.com)
- Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
- Git installed and initialized
- GitHub account (recommended)

## Deployment Steps

### Step 1: Login to Heroku
```bash
heroku login
```
This will open a browser window to authenticate.

### Step 2: Create Heroku App
```bash
heroku create your-unique-app-name
```
Replace `your-unique-app-name` with your desired app name (must be unique).

### Step 3: Set Environment Variables
```bash
heroku config:set PREFIX=!
heroku config:set NODE_ENV=production
```

### Step 4: Deploy Code
```bash
git push heroku main
```

### Step 5: View Logs
```bash
heroku logs --tail
```

---

## Environment Variables

Configure these variables in Heroku:

```bash
# Essential Variables
heroku config:set PREFIX=!
heroku config:set NODE_ENV=production

# Optional: For cloud storage integration
heroku config:set AWS_ACCESS_KEY_ID=your_key
heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
heroku config:set S3_BUCKET_NAME=your_bucket
```

View all config vars:
```bash
heroku config
```

---

## Heroku Do's ✅

### 1. **Use Procfile**
- ✅ Always include a Procfile in root directory
- ✅ Specifies how Heroku should run your app
- ✅ Current Procfile: `web: node index.js`

### 2. **Specify Node Version**
- ✅ Add `engines` to package.json:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

### 3. **Use Environment Variables**
- ✅ Store all sensitive data in Heroku config vars
- ✅ Never commit secrets to GitHub
- ✅ Use `process.env.VARIABLE_NAME` in code

### 4. **Read PORT from Environment**
- ✅ Use `process.env.PORT || 3000` for HTTP servers
- ✅ Heroku dynamically assigns ports

### 5. **Use Buildpacks**
- ✅ Standard Node.js buildpack is automatic
- ✅ Check with: `heroku buildpacks`

### 6. **Monitor Logs**
- ✅ Check logs regularly: `heroku logs --tail`
- ✅ Monitor for errors and performance issues

### 7. **Use Heroku Scheduler**
- ✅ Schedule periodic tasks if needed
- ✅ Install: `heroku addons:create scheduler:standard`

### 8. **Scale Dynos Properly**
- ✅ Start with 1 free dyno for testing
- ✅ Scale up for production: `heroku ps:scale web=1`

---

## Heroku Don'ts ❌

### 1. **Don't Commit Secrets**
- ❌ Never commit `.env` files
- ❌ Never hardcode API keys or tokens
- ❌ Add `.env` to `.gitignore`

### 2. **Don't Hardcode Port**
- ❌ ❌ `const PORT = 3000;`
- ✅ `const PORT = process.env.PORT || 3000;`

### 3. **Don't Expect Persistent Filesystem**
- ❌ Don't store important files locally
- ❌ Files are deleted on dyno restart
- ✅ Use cloud storage (S3, Firebase, etc.)

### 4. **Don't Ignore Dyno Timeouts**
- ❌ Avoid processes longer than 30 seconds
- ❌ Don't ignore error handling
- ✅ Implement proper error handling

### 5. **Don't Commit node_modules**
- ❌ Never commit `node_modules/`
- ✅ Heroku runs `npm install` automatically
- ✅ Ensure `.gitignore` includes `node_modules`

### 6. **Don't Use Synchronous Operations**
- ❌ Avoid blocking operations
- ✅ Use async/await for all I/O operations
- ✅ Your bot uses async properly

### 7. **Don't Ignore Memory Limits**
- ❌ Free dynos have 512 MB RAM limit
- ❌ Don't load huge files into memory
- ✅ Use streaming for large operations

### 8. **Don't Deploy Without Testing**
- ❌ Don't push untested code to production
- ✅ Test locally first: `npm start`
- ✅ Use git branches for development

---

## Persistent Authentication Files

### The Problem
WhatsApp authentication files stored in `auth_info_baileys/` are **deleted when the dyno restarts** (which happens at least daily on free dyno).

### Solutions

#### Option 1: AWS S3 (Recommended)
```bash
npm install aws-sdk

heroku config:set AWS_ACCESS_KEY_ID=your_key
heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
heroku config:set S3_BUCKET_NAME=your_bucket
```

#### Option 2: Firebase Realtime Database
```bash
npm install firebase

heroku config:set FIREBASE_CONFIG=your_config_json
```

#### Option 3: MongoDB with Mongoose
```bash
npm install mongoose

heroku addons:create mongolab:sandbox
```

#### Option 4: Paid Dyno
- Upgrade to paid dyno for persistent filesystem
- Command: `heroku ps:type web=standard-1x`

---

## Monitoring & Logs

### View Logs
```bash
# Real-time logs
heroku logs --tail

# Last 100 lines
heroku logs -n 100

# Specific time range
heroku logs --tail --since 10m

# Follow specific process
heroku logs --dyno=web --tail
```

### Check App Status
```bash
# View running processes
heroku ps

# Check resource usage
heroku metrics

# View config variables
heroku config
```

### Restart Dyno
```bash
heroku restart
```

---

## Troubleshooting

### App Won't Start

1. **Check Logs First**
```bash
heroku logs --tail
```

2. **Verify Procfile**
```bash
# Check Procfile exists and is correct
cat Procfile
# Should output: web: node index.js
```

3. **Check package.json**
- Ensure all dependencies are listed
- Node version matches `engines.node`

4. **Verify Environment Variables**
```bash
heroku config
```

### Port Binding Error
- ❌ Error: "Port already in use"
- ✅ Solution: Use `process.env.PORT || 3000`

### WhatsApp QR Code Issue
- ❌ Can't scan QR code on Heroku
- ✅ This is expected - auth is handled on terminal
- ✅ Use auth files from local machine first

### Bot Not Responding
1. Check logs: `heroku logs --tail`
2. Verify PREFIX in config: `heroku config`
3. Check internet connection status
4. Restart dyno: `heroku restart`

### Build Fails
1. Check build logs: `heroku logs --tail`
2. Clear build cache: `heroku builds:cancel && git push heroku main`
3. Verify all dependencies are in package.json

### App Sleeping (Free Dyno)
- Free dynos sleep after 30 mins of inactivity
- Upgrade to paid dyno to keep running 24/7
- Or use Uptimerobot service to keep it awake

---

## Deployment Checklist

- [ ] `.env` added to `.gitignore`
- [ ] `Procfile` created in root directory
- [ ] `engines.node` specified in package.json
- [ ] All dependencies listed in package.json
- [ ] Environment variables set on Heroku
- [ ] Code tested locally with `npm start`
- [ ] Git initialized and committed
- [ ] Heroku app created with `heroku create`
- [ ] Deployed with `git push heroku main`
- [ ] Logs checked with `heroku logs --tail`

---

## Useful Heroku Commands

```bash
# Account
heroku login              # Login to Heroku
heroku logout             # Logout
heroku whoami             # Check logged in user

# App Management
heroku create app-name    # Create new app
heroku apps               # List all apps
heroku apps:rename old new # Rename app
heroku destroy app-name   # Delete app

# Deployment
git push heroku main      # Deploy from main branch
heroku releases           # View deployment history

# Configuration
heroku config             # View all config vars
heroku config:set KEY=VAL # Set config variable
heroku config:unset KEY   # Remove config variable

# Logs & Monitoring
heroku logs --tail        # Real-time logs
heroku metrics            # Resource usage
heroku ps                 # Running processes
heroku restart            # Restart app

# Addons
heroku addons:create      # Add service (scheduler, DB, etc.)
heroku addons:list        # View installed addons
```

---

## Additional Resources

- [Heroku Dev Center](https://devcenter.heroku.com)
- [Node.js on Heroku](https://devcenter.heroku.com/articles/nodejs-support)
- [Procfile Reference](https://devcenter.heroku.com/articles/procfile)
- [Config Variables](https://devcenter.heroku.com/articles/config-vars)

---

## Support

For issues:
1. Check [Heroku Status](https://status.heroku.com)
2. Review logs: `heroku logs --tail`
3. Read [Heroku Documentation](https://devcenter.heroku.com)
4. Open an issue on GitHub

---

**Last Updated**: May 19, 2026
**Status**: ✅ Production Ready
