# CLAUDE.md - ShowRoom App Development Guide

## Project Overview

**ShowRoom App** is a **SaaS product for independent car showroom owners**.

### Business Model
- Each showroom owner gets their **own dedicated app instance**
- One codebase, deployed independently per showroom
- You sell & deploy the same codebase to multiple showroom owners
- Each showroom operates independently (separate database, API, frontend)

### Stakeholders Per Showroom
- **Showroom Owner**: Manages business, sets pricing, controls investors
- **Customers**: Browse & sell cars through that showroom's app
- **Showroom Staff**: Track inventory, manage inquiries
- **Investors**: View portfolio & profit/loss within that showroom

**Status**: Phase 1 MVP (12 weeks)  
**Team Size**: 1 developer (you're building the product to sell)  
**Tech**: React/TypeScript (frontend) + NestJS + PostgreSQL  
**Deployment**: Single-tenant (separate instance per customer)

---

## SaaS Architecture (Important!)

### Single-Tenant Deployment Model
```
showroom-owner-1/
├── backend (NestJS + PostgreSQL)
├── web (React)
└── mobile (React Native)

showroom-owner-2/
├── backend (same codebase, different DB)
├── web (same codebase, different domain)
└── mobile (same codebase)

showroom-owner-N/
├── backend
├── web
└── mobile
```

**Key Point**: Same codebase, deployed independently per showroom with:
- Separate database per showroom
- Separate API domain/subdomain
- Separate web/mobile builds with showroom branding
- Independent configuration (showroom name, logo, investors, commission rules)

### Monorepo Structure
```
apps/
├── backend/          # NestJS API (port 3000, JWT auth)
├── web/              # React web (port 3001, Vite)
└── mobile/           # React Native (Expo, local dev)

packages/
├── types/            # Shared TypeScript types
└── api-client/       # Shared API client

deploy/               # (Coming soon) Deployment scripts
├── docker/           # Dockerfile for backend
└── scripts/          # Automation for new showroom instances
```

### Database
- **MVP**: SQLite (local file-based, no setup needed)
- **Production**: PostgreSQL (separate instance per showroom)
- **ORM**: Prisma for type-safe queries (database-agnostic)
- **Schema**: Cars, Inquiries (Users for Phase 2 staff) - identical across all showrooms
- **Key**: Database layer is fully decoupled. Switch SQLite → PostgreSQL by changing `schema.prisma` only

### Authentication
- **JWT tokens** issued on login/register
- Protected routes use `JwtAuthGuard`
- Tokens expire in 24h (configurable)

---

## Development Workflow

### 1. First Time Setup
```bash
# Install dependencies
npm install

# Start PostgreSQL
docker-compose up -d postgres

# Run migrations
cd apps/backend
npx prisma migrate deploy

# Copy and edit .env
cp .env.example .env
```

### 2. Daily Development
```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start web
npm run dev:web

# Or both at once
npm run dev
```

### 3. Database Changes
```bash
# After editing prisma/schema.prisma
npx prisma migrate dev --name "description"

# Review changes with Prisma Studio
npx prisma studio
```

### 4. Adding a Feature
1. Design database schema in `schema.prisma`
2. Run migration
3. Create module with `nest generate`
4. Implement service + controller
5. Add DTOs for validation
6. Write tests
7. Connect frontend

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema (source of truth) |
| `apps/backend/src/app.module.ts` | Backend DI container |
| `apps/backend/.env.example` | Backend config template |
| `spec/roadmap.md` | Development timeline |
| `spec/mission.md` | Product requirements |
| `spec/tech-stack.md` | Technical decisions |

---

## Module Organization

Each module should follow this structure:
```
modules/feature/
├── feature.module.ts       # Module definition (DI container)
├── feature.service.ts      # Business logic (calls repository)
├── feature.controller.ts   # HTTP routes (calls service)
├── dto/                    # Data transfer objects
│   └── index.ts
└── guards/                 # (if needed)
```

### Architecture Rule: Database Decoupling
**Controllers → Services → Prisma (Data Access)**

```typescript
// ✅ CORRECT: Service layer abstracts database
@Controller('cars')
export class CarsController {
  constructor(private carService: CarService) {}
  
  @Get()
  getCars() {
    return this.carService.getAll(); // Service, not database
  }
}

@Injectable()
export class CarService {
  constructor(private prisma: PrismaClient) {}
  
  getAll() {
    return this.prisma.car.findMany(); // Only here
  }
}

// ❌ WRONG: Direct database calls from controller
@Get()
getCars() {
  return this.prisma.car.findMany(); // Never do this
}
```

**Why**: This ensures you can switch SQLite → PostgreSQL without touching any service/controller code.

### Key Decorators
- `@UseGuards(JwtAuthGuard)` - Protect endpoints (Phase 2)
- `@Body()` - Parse request body with validation
- `@Injectable()` - Mark class as injectable service

---

## Common Tasks

### Add a new API endpoint
1. Add method to service
2. Add route to controller with `@Get/@Post/@Put/@Delete`
3. Use `JwtAuthGuard` if protected
4. Test with `curl` or Postman

### Seed database with test data
Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Add test data
}

main().catch(console.error);
```

Then run:
```bash
npx prisma db seed
```

### Handle file uploads (Phase 1C)
- Store in `apps/backend/uploads/` directory locally
- Return file path in API response
- Serve via static middleware (to implement)

---

## Testing Strategy

- **Unit Tests**: Jest for services
- **Integration Tests**: With real database (SQLite or Postgres)
- **E2E Tests**: Cypress (coming Phase 2)
- **Coverage Target**: 80%+ on critical paths

Run tests:
```bash
npm run test              # All tests
npm run test:watch       # Watch mode
npm run test:cov         # Coverage report
```

---

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection
- `NODE_ENV` - development/production
- `PORT` - Server port (default 3000)
- `JWT_SECRET` - Token signing key
- `ALLOWED_ORIGINS` - CORS whitelist
- `MAX_FILE_SIZE` - Upload limit

### Web (.env.local)
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Display name

### Mobile (.env)
- `EXPO_API_URL` - Backend API URL

---

## Phase 1 Breakdown (12 weeks)

**1A (Weeks 1-2)**: Infrastructure & Auth ✓ (mostly done)
- User model, JWT strategy, basic endpoints

**1B (Weeks 3-5)**: Customer Marketplace
- Car listing, browsing, filters
- Car detail pages with images

**1C (Weeks 6-7)**: Customer Car Upload
- Form validation, image upload
- Listing management

**1D (Weeks 8-10)**: Inventory Management
- Showroom staff dashboard
- Inventory tracking
- Reporting

**1E (Weeks 11-12)**: Testing & Launch
- Full QA, performance, security
- Deploy to staging/production

See `spec/roadmap.md` for detailed checklist.

---

## Debugging Tips

### Database Issues
```bash
# View database
npx prisma studio

# Check last migration
git log --oneline apps/backend/prisma/migrations/

# Reset (dev only!)
npx prisma migrate reset
```

### Backend Issues
```bash
# Check logs
npm run dev:backend 2>&1 | grep -i error

# Test endpoint
curl -X GET http://localhost:3000/health

# Check JWT
curl -H "Authorization: Bearer <token>" http://localhost:3000/users
```

### Frontend Issues
- Check browser console (F12)
- Check network tab for API responses
- Verify `.env.local` is set correctly

---

## Performance Checklist

- [ ] Database indexes on foreign keys
- [ ] Pagination on list endpoints
- [ ] Lazy load car images
- [ ] Cache showroom data (Phase 2: Redis)
- [ ] Optimize images (Phase 2)

---

## Security Checklist

- [ ] Validate all inputs with DTOs
- [ ] Use `JwtAuthGuard` on sensitive endpoints
- [ ] Hash passwords with bcryptjs
- [ ] CORS configured properly
- [ ] Rate limiting (Phase 2)
- [ ] SQL injection prevention (Prisma handles)
- [ ] XSS prevention (React handles)

---

## Next Steps (When You're Ready)

1. **Verify Setup**: Run `npm run dev` and check health endpoint
2. **Create Test User**: Via `/auth/register`
3. **Start Phase 1B**: Implement car listing endpoints
4. **Add Frontend**: Connect React web to API

---

## Selling to Showroom Owners (SaaS Operations)

### Phase 1: MVP (Build Product)
- Develop & test with one "demo" showroom locally
- Ensure all features work end-to-end
- Document onboarding process

### Phase 2: Single-Tenant Deployment (Sell to 1st Customer)
- Set up deployment scripts for quick instance creation
- Deploy to first paying customer (separate DB, API, domain)
- Gather feedback, iterate

### Phase 3: Scale (Multiple Customers)
- Automate deployment (one command to launch new showroom)
- Set up customer management dashboard
- Monitor all instances from central location
- Push updates to all showrooms simultaneously

### Key Considerations for Multi-Tenant Operations
1. **Unique Identifiers**: Each instance needs unique ENV vars (SHOWROOM_ID, API_DOMAIN)
2. **Branding**: Showroom logo, name, colors in frontend config
3. **Pricing Rules**: Commission %, payment terms per showroom
4. **Updates**: Code fixes should roll out to all instances
5. **Data Backups**: Separate backups for each showroom DB
6. **Support**: Track issues per showroom customer

---

## Quick Reference

```bash
# Development
npm run dev              # Backend + Web
npm run dev:backend     # Backend only
npm run lint            # ESLint
npm run format          # Prettier

# Database
npx prisma migrate dev  # Create migration
npx prisma studio      # View data
npx prisma db seed     # Seed data

# Testing
npm run test            # Run tests
npm run test:cov        # Coverage

# Deployment (Phase 2 - to be created)
npm run build           # Build all
npm run build:backend   # Backend only
npm run deploy --showroom=acme-auto  # Deploy to specific showroom (coming)
```

---

## Deployment Checklist (Phase 2)

- [ ] Create deployment scripts for new showroom instances
- [ ] Set up environment variable templating
- [ ] Create database provisioning script
- [ ] Test deploying to 2+ instances simultaneously
- [ ] Document onboarding process for new customers
- [ ] Set up monitoring across all instances

---

**Questions?** Check `spec/tech-stack.md` for tech decisions, `spec/mission.md` for business model, or `README.md` for API docs.
