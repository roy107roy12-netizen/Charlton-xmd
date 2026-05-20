# Heroku Deployment Guide

## Login

```bash
heroku login
```

---

## Create App

```bash
heroku create your-bot-name
```

---

## Set Config Vars

```bash
heroku config:set PREFIX=.
heroku config:set OWNER_NUMBER=254727411435
heroku config:set NODE_ENV=production
```

---

## Deploy

```bash
git push heroku main
```

---

## View Logs

```bash
heroku logs --tail
```

---

# .env

```env
SESSION_ID=
PREFIX=.
OWNER_NUMBER=254727411435
```

---

# Procfile

```bash
web: node index.js
```

---

# .gitignore

```bash
node_modules
.env
auth_info_baileys
```

---

# package.json

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

# Important

✅ Use `process.env.PREFIX || '.'`  
✅ Don't commit `.env`  
✅ Add SESSION_ID later  

---

# Restart Bot

```bash
heroku restart
```
