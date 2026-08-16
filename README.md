# 🚗 ShowRoom App

**SaaS product for independent car showroom owners.**

Each showroom gets their own app instance with customer marketplace, inventory management, and investor dashboards.

---

## ✅ Specifications (APPROVED)

**Phase 0: UX Design** - ✅ COMPLETE (2026-07-25)

All specifications are finalized and ready for implementation:

1. **[spec/mission.md](spec/mission.md)** - SaaS business model
2. **[spec/ux-design.md](spec/ux-design.md)** - ✅ Approved wireframes, design system, performance targets
3. **[spec/roadmap.md](spec/roadmap.md)** - 12-week timeline
4. **[spec/tech-stack.md](spec/tech-stack.md)** - NestJS + React + PostgreSQL

**Quick Reference**: [PHASE-0-COMPLETE.md](PHASE-0-COMPLETE.md)

🚀 **Ready to start Phase 1A: Backend Development**

---

## 🏗️ Architecture

- **Backend**: NestJS + PostgreSQL + JWT Auth
- **Frontend**: React (web) + React Native (mobile)
- **Model**: Single-tenant SaaS (separate deployment per showroom)
- **Status**: Phase 1 MVP (12 weeks)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+, npm/pnpm
- PostgreSQL (or Docker)

### Setup
```bash
npm install
docker-compose up -d postgres
cd apps/backend && npx prisma migrate deploy
npm run dev
```

Backend runs on `http://localhost:3000`

---

## 📁 Structure

```
spec/                  # All specifications
├── mission.md        # Business model
├── ux-design.md      # Wireframes, design
├── roadmap.md        # Timeline
└── tech-stack.md     # Technology

apps/
├── backend/          # NestJS API
├── web/              # React web
└── mobile/           # React Native

CLAUDE.md             # Developer guide
DEPLOYMENT.md         # Phase 2 deployment
```

---

## 📚 Guides

- **Specs**: Read `spec/` folder (mandatory before coding)
- **Dev**: [CLAUDE.md](CLAUDE.md)
- **Deploy**: [DEPLOYMENT.md](DEPLOYMENT.md) (Phase 2)

---

**For car showroom owners 🚗**
