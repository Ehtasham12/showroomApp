# Technology Stack

## Architecture Overview
**Model**: Single-Tenant SaaS (separate deployment per showroom)
**Pattern**: Cross-platform mobile-first with React ecosystem
**Strategy**: 
- One codebase, deployed independently for each showroom
- Each instance has own database, API, and frontend
- Shared deployment scripts & configuration templates
- Easy to update all instances with one code push

---

## Frontend Stack

### Mobile (Primary)
- **Framework**: React Native / Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit or Zustand
- **Navigation**: React Navigation
- **UI Library**: React Native Paper or Native Base
- **Forms**: React Hook Form + Yup/Zod validation
- **HTTP Client**: Axios

### Web (Responsive)
- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **State Management**: Redux Toolkit or Zustand (shared with mobile)
- **UI Library**: Tailwind CSS + Shadcn/ui or Material-UI
- **Forms**: React Hook Form + Yup/Zod validation
- **HTTP Client**: Axios

### Shared Packages
- TypeScript configuration
- API client/hooks
- Redux store and slices
- Validation schemas
- Utility functions

---

## Backend Stack

### Runtime & Framework
- **Language**: TypeScript
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js or NestJS
  - *Recommendation: NestJS for better scalability and type safety in Phase 2*

### Database
- **Primary Database**: PostgreSQL
- **Why**: 
  - Strong ACID compliance for financial data (commissions, profit/loss)
  - JSON support for flexible car specifications
  - Excellent for relational multi-owner data
- **ORM**: Prisma or TypeORM
- **Migrations**: Prisma migrations or TypeORM migrations

### Caching & Session
- **Redis**: Session storage and caching
- **Session**: Express-session or JWT tokens

### File Storage
- **Cloud Storage**: AWS S3 / Firebase Storage / Cloudinary
- **Use Case**: Car photos and documents
- **CDN**: CloudFront or CDN provider for image optimization

### Authentication
- **JWT tokens** for API authentication
- **OAuth 2.0** for third-party integrations (future)

---

## DevOps & Deployment

### Version Control
- **Git**: GitHub / GitLab / Bitbucket
- **Branching Strategy**: Git Flow (main, develop, feature/*)

### CI/CD
- **Pipeline Tool**: GitHub Actions / GitLab CI / Jenkins
- **Key Stages**:
  - Lint & Type Check (ESLint, TypeScript)
  - Unit Tests (Jest)
  - Integration Tests
  - Build
  - Deploy to staging
  - Deploy to production

### Hosting
- **Backend**: AWS EC2 / Heroku / Railway / Render
- **Frontend (Web)**: Vercel / Netlify / AWS S3 + CloudFront
- **Mobile**: App Store (iOS) / Google Play Store (Android)
- **Database**: AWS RDS PostgreSQL or managed PostgreSQL service
- **Container**: Docker for consistent environments

---

## Testing Stack

### Unit Testing
- **Framework**: Jest
- **Coverage**: Aim for 80%+ coverage on critical paths

### Integration Testing
- **Framework**: Jest with supertest (backend)
- **Scope**: API endpoints, database operations

### E2E Testing
- **Framework**: Cypress or Detox (mobile)
- **Scope**: Critical user journeys (browse cars, upload car, inventory management)

### Performance Testing
- **Tool**: Lighthouse (web), React Native Performance Monitor
- **Metrics**: Load time < 2s, API response < 200ms

---

## SaaS Deployment Strategy

### For Each Showroom Instance
1. **Backend Deployment**
   - Unique environment variables per showroom (SHOWROOM_ID, DB_URL, JWT_SECRET)
   - Isolated PostgreSQL database
   - Separate API domain (api.showroom-name.com or subdomain routing)

2. **Frontend Deployment**
   - Showroom-specific branding (logo, colors, name)
   - Web app: Vercel / Netlify with environment-specific builds
   - Mobile app: Internal TestFlight/Play Store builds per showroom

3. **Deployment Automation**
   - Infrastructure as Code (Terraform / Pulumi) for quick instance creation
   - CI/CD pipeline to deploy to all active showrooms simultaneously
   - Database migration scripts that work across instances
   - Rollback capability for each instance independently

### Showroom Configuration
```env
# Each showroom gets unique config
SHOWROOM_ID=showroom_abc123
SHOWROOM_NAME="Premium Auto Showroom"
SHOWROOM_EMAIL=owner@showroom.com
DATABASE_URL=postgresql://user:pass@host/db_showroom_abc123
JWT_SECRET=unique-secret-per-showroom
API_DOMAIN=api.premiumer-auto.com
WEB_DOMAIN=premiumer-auto-app.com
```

### Multi-Instance Management
- Central dashboard (future) to manage all deployed showrooms
- Automated billing & license tracking
- One-click deployments for new customers
- Unified analytics across showrooms

---

## Monitoring & Logging

### Application Monitoring
- **Tool**: Sentry (error tracking - shared account, showroom_id in context)
- **Logs**: Winston or Pino (structured logging with showroom context)
- **Per-Showroom Logs**: Stored separately for debugging

### Analytics
- **Tool**: Segment / Mixpanel / Google Analytics
- **Track**: User behavior, conversion funnels

### Observability
- **Metrics**: Prometheus + Grafana (optional for Phase 2)
- **Traces**: Jaeger or DataDog (optional for Phase 2)

---

## Development Tools

### Code Quality
- **Linter**: ESLint
- **Formatter**: Prettier
- **Pre-commit Hooks**: Husky + lint-staged

### Package Management
- **Tool**: npm / pnpm
- **Lock File**: package-lock.json or pnpm-lock.yaml

### API Documentation
- **Tool**: Swagger/OpenAPI
- **UI**: Swagger UI

### Environment Management
- **Configuration**: .env files with Dotenv
- **Secrets**: GitHub Secrets / Vault (production)

---

## Directory Structure (Monorepo)
```
showroom-app/
├── apps/
│   ├── backend/          # Node.js API server
│   ├── web/              # React web app
│   └── mobile/           # React Native app
├── packages/
│   ├── api-client/       # Shared API client
│   ├── types/            # Shared TypeScript types
│   └── ui/               # Shared UI components
├── spec/                 # Documentation
└── docker-compose.yml    # Local development setup
```

---

## Why This Stack?

| Choice | Rationale |
|--------|-----------|
| **React Ecosystem** | Unified codebase, large community, React Native for mobile |
| **TypeScript** | Type safety across full stack, catches bugs early |
| **PostgreSQL** | Relational data model needed for multi-owner cars and commissions |
| **Express/NestJS** | Lightweight & fast (Express) or enterprise-grade structure (NestJS) |
| **Prisma** | Modern DX, type-safe ORM, great migrations |
| **Mobile-First** | Market trend, better UX on small screens |

---

## Phase-Wise Technology Introduction

### Phase 1 (MVP)
- Backend: Express + Prisma + PostgreSQL
- Frontend: React Native (Expo) + React Web
- Hosting: Heroku backend, Vercel web, TestFlight/internal Android build for mobile

### Phase 2 (Investor Dashboard)
- Upgrade to NestJS (if complexity grows)
- Add Redis for caching investor dashboard
- Enhanced analytics

### Phase 3 (Scaling)
- Microservices consideration
- Message queues (Bull/RabbitMQ) for async jobs
- Advanced observability (Prometheus, Grafana)
