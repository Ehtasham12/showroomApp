# Deployment Guide - Single-Tenant SaaS

This guide explains how to deploy the ShowRoom App to different showroom owners.

---

## Deployment Model

**Single-Tenant**: Each showroom gets their own instance with:
- ✅ Separate PostgreSQL database
- ✅ Separate API backend (own domain/subdomain)
- ✅ Separate web app (own domain)
- ✅ Separate mobile app (showroom-branded)
- ✅ Independent configuration & data isolation

**Benefits**:
- Easy to customize per showroom
- Simple data isolation & security
- Scale independently per customer
- Update all at once with one code release

---

## Local Development (Phase 1)

For building the MVP, you only need **one local instance**:

```bash
# Already set up in docker-compose.yml
docker-compose up -d postgres

# Configure backend/.env for your test showroom
DATABASE_URL="postgresql://postgres:password@localhost:5432/showroom_dev"

# Start development
npm run dev
```

This is your **demo instance** to test all features.

---

## Deploying to First Customer (Phase 2)

### Step 1: Provision New Database
```bash
# Create new PostgreSQL database for this showroom
createdb showroom_acme_auto

# Or via cloud provider (AWS RDS, Heroku, Railway, etc.)
```

### Step 2: Create Environment Configuration
```bash
# apps/backend/.env.acme-auto (or in your deployment tool)
DATABASE_URL="postgresql://user:pass@host/showroom_acme_auto"
NODE_ENV=production
PORT=3000
JWT_SECRET=unique-secret-for-acme
SHOWROOM_ID=acme_auto
SHOWROOM_NAME="Acme Auto Showroom"
ALLOWED_ORIGINS=https://acme-auto-app.com,https://api.acme-auto.com

# apps/web/.env.production (for React frontend)
VITE_API_URL=https://api.acme-auto.com
VITE_SHOWROOM_NAME="Acme Auto Showroom"
VITE_SHOWROOM_LOGO=https://acme-auto.com/logo.png
```

### Step 3: Deploy Backend
Choose one of these platforms:

**Option A: Heroku (Easiest)**
```bash
cd apps/backend

# Install Heroku CLI, login
heroku login
heroku create showroom-acme-auto

# Set environment variables
heroku config:set \
  DATABASE_URL="postgresql://..." \
  JWT_SECRET="..." \
  --app showroom-acme-auto

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma migrate deploy --app showroom-acme-auto
```

**Option B: Railway.app (Recommended)**
- Simple deployment dashboard
- PostgreSQL included
- Easy environment variables
- $5-20/month depending on usage

**Option C: AWS (More Complex)**
```bash
# Use ECR for container image, RDS for database, ECS for deployment
# (requires more setup but most scalable)
```

### Step 4: Deploy Frontend (Web)

**Vercel** (Recommended for React)
```bash
cd apps/web

# Install Vercel CLI
npm install -g vercel

# Deploy with environment variables
vercel --env VITE_API_URL=https://api.acme-auto.com \
           --env VITE_SHOWROOM_NAME="Acme Auto"
```

Or use **Netlify**:
```bash
cd apps/web
npm run build
# Drag & drop `dist/` folder to Netlify
# Set environment variables in Netlify dashboard
```

### Step 5: Deploy Mobile App

For testing per showroom:
```bash
cd apps/mobile

# Build APK for Android
eas build --platform android

# Build IPA for iOS
eas build --platform ios
```

Distribute via:
- **Internal TestFlight** (iOS) - give to showroom staff for testing
- **Google Play Internal Testing** (Android)
- **EAS Update** - push OTA updates without app store approval

---

## Scaling to Multiple Customers (Phase 3)

### Deployment Automation

Create a script to deploy to any showroom:

```bash
#!/bin/bash
# deploy.sh - deploys to a specific showroom

SHOWROOM_ID=$1
SHOWROOM_NAME=$2
API_DOMAIN=$3
WEB_DOMAIN=$4
DATABASE_URL=$5

echo "🚀 Deploying to $SHOWROOM_NAME..."

# 1. Create database
createdb showroom_${SHOWROOM_ID}

# 2. Deploy backend to Heroku/Railway/AWS
heroku create showroom-${SHOWROOM_ID}
heroku config:set DATABASE_URL="${DATABASE_URL}" \
                    JWT_SECRET=$(openssl rand -hex 32) \
                    SHOWROOM_ID="${SHOWROOM_ID}" \
                    --app showroom-${SHOWROOM_ID}
git push heroku main --app showroom-${SHOWROOM_ID}
heroku run npx prisma migrate deploy --app showroom-${SHOWROOM_ID}

# 3. Deploy web frontend
vercel --env VITE_API_URL=https://${API_DOMAIN} \
           --env VITE_SHOWROOM_NAME="${SHOWROOM_NAME}"

# 4. Deploy mobile
# (Could use EAS for automated builds)

echo "✅ Deployed $SHOWROOM_NAME to:"
echo "   API: https://${API_DOMAIN}"
echo "   Web: https://${WEB_DOMAIN}"
```

Usage:
```bash
./deploy.sh acme_auto "Acme Auto" "api.acme-auto.com" "app.acme-auto.com" "postgresql://..."
```

### Monitoring All Instances

Set up a dashboard to monitor all deployed showrooms:

```bash
# Future: Create monitoring service
# - API health checks for all instances
- Database disk usage per showroom
- Error rate tracking (Sentry with showroom_id filter)
- Uptime monitoring
- Performance metrics
```

---

## Updating All Instances (Rolling Out Features)

When you fix a bug or add a feature:

```bash
# 1. Test locally
npm run dev
npm run test

# 2. Commit to main
git add .
git commit -m "feature: add X"
git push origin main

# 3. Deploy to all active showrooms
# Option A: Manual (for now)
for showroom in acme-auto premium-auto luxury-motors; do
  heroku config:set CODE_VERSION="v1.2.3" --app showroom-${showroom}
  git push heroku main --app showroom-${showroom}
done

# Option B: Automated CI/CD (Phase 3)
# Push to main → GitHub Actions → deploys to all instances automatically
```

---

## Onboarding a New Customer

### Checklist
- [ ] Collect showroom details (name, email, location)
- [ ] Provision database
- [ ] Deploy backend, web, mobile
- [ ] Create admin user for showroom owner
- [ ] Send login credentials & setup guide
- [ ] Walkthrough of dashboard & features
- [ ] Test end-to-end (create car listing, inquiry, etc.)
- [ ] Set up invoice/billing
- [ ] Ongoing support

### Minimal Setup Docs for Customer
```markdown
# Welcome to ShowRoom App!

Your showroom instance is live:
- **API**: https://api.your-showroom.com
- **Web App**: https://app.your-showroom.com
- **Admin User**: owner@your-showroom.com / [password]

## Next Steps:
1. Log in with your admin account
2. Add 5-10 test cars to inventory
3. Invite your showroom staff (add users with SHOWROOM_STAFF role)
4. Set up investors (Phase 2)
5. Go live with real data

## Support
Email: support@showroomapp.com
```

---

## Troubleshooting Deployments

### Database connection error
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1;"
```

### API not responding
```bash
# Check backend logs
heroku logs --app showroom-acme-auto

# Verify environment variables
heroku config --app showroom-acme-auto

# Restart app
heroku restart --app showroom-acme-auto
```

### Frontend can't reach API
```bash
# Verify VITE_API_URL is set correctly
# Check browser console for CORS errors
# Ensure backend ALLOWED_ORIGINS includes frontend domain
```

---

## Cost Estimate (Phase 2 - per showroom instance)

| Service | Cost/Month | Notes |
|---------|-----------|-------|
| Backend (Heroku/Railway) | $7-25 | Scales with usage |
| Database (PostgreSQL) | $15-50 | Managed hosting cheaper |
| Web Frontend (Vercel) | Free | Generous free tier |
| Mobile Hosting (EAS) | Free | For basic builds |
| **Total per Showroom** | **$25-75** | Add markup for profit |

**Suggested Pricing**: $500-2000/month per showroom (high margins)

---

## Next Steps

**Phase 1 (Now)**: Build MVP locally  
**Phase 2 (Weeks 13-14)**: Deploy to first paid customer  
**Phase 3 (Weeks 15+)**: Automate multi-instance management  

Once Phase 1 is complete, revisit this guide and set up Phase 2 automation.
