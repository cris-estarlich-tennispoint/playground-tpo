---
name: ddd-entity-scaffold
description: Use this skill whenever the user wants to create a new domain entity, feature, or resource in the API. Triggers on phrases like "create entity", "add new entity", "scaffold a new feature", "create a new domain", "I need a new [thing] endpoint", "add [resource] to the API". Always use this skill when generating backend code that involves any of the DDD layers (domain, application, infrastructure, presenter).
---

# DDD Entity Scaffold

Generates all DDD layers for a new domain entity in `apps/api`, following the project's layered architecture:

```
Domain → Application → Infrastructure → Presenter
```

---

## Step 1 — Gather info

Before generating anything, ask (or infer from context):

1. **Entity name** — e.g. `Product`, `Order`, `Review` (PascalCase singular)
2. **Fields** — name, type, required/optional. Ask if not provided.
3. **Relations** — does it belong to another entity? Has many of something?
4. **Operations needed** — which use cases? Default: Create, GetById, List, Update, Delete

If the user gave enough context, proceed directly. Don't over-ask.

---

## Step 2 — Plan the files

Announce the files you're about to create:

```
apps/api/src/
  domain/<entity>/
    <entity>.entity.ts
    <entity>.repository.ts
    <entity>.errors.ts
  application/<entity>/
    <entity>.service.ts
    dto/
      create-<entity>.dto.ts
      update-<entity>.dto.ts
      <entity>.response.dto.ts
  infrastructure/database/repositories/
    <entity>.repository.impl.ts
  presenters/
    <entity>.controller.ts
    <entity>.routes.ts
```

---

## Step 3 — Generate files

Generate in this order (respects dependency direction):

1. Domain entity + repository interface + errors
2. DTOs
3. Application service
4. Repository implementation (infrastructure)
5. Controller + routes

Use the naming conventions and templates below.

---

## Naming Conventions

| Concept | Pattern | Example |
|---|---|---|
| Entity class | `PascalCase` | `Product` |
| Entity file | `<entity>.entity.ts` | `product.entity.ts` |
| Repository interface | `I<Entity>Repository` | `IProductRepository` |
| Repository impl class | `<Entity>Repository` | `ProductRepository` |
| Application service | `<Entity>Service` | `ProductService` |
| Controller factory | `create<Entity>Controller` | `createProductController` |
| Routes registration | `register<Entity>Routes` | `registerProductRoutes` |
| DTO — create | `Create<Entity>Dto` | `CreateProductDto` |
| DTO — update | `Update<Entity>Dto` | `UpdateProductDto` |
| DTO — response | `<Entity>ResponseDto` | `ProductResponseDto` |
| Folders | `kebab-case` | `product-reviews/` |

**TypeScript rules:**
- `id` is always `string` (UUID), never `number`
- Dates are `Date` type internally, ISO strings in response DTOs
- Use `interface` for ports and DTOs, `class` for domain entities
- No `any` — use `unknown` and narrow
- Import across layers using tsconfig path aliases: `@domain/*`, `@application/*`, `@infrastructure/*`, `@presenters/*`

---

## Templates

### Domain Entity — `<entity>.entity.ts`

```typescript
export interface {{Entity}}Props {
  id: string;
  // {{fields}}
  createdAt: Date;
  updatedAt: Date;
}

export class {{Entity}} {
  readonly id: string;
  // {{fields}}
  readonly createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: {{Entity}}Props) {
    this.id = props.id;
    // assign fields
    this.createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  /** Factory — use instead of `new {{Entity}}()` */
  static create(props: {{Entity}}Props): {{Entity}} {
    return new {{Entity}}(props);
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Domain logic methods go here
}
```

---

### Domain Errors — `<entity>.errors.ts`

```typescript
export class {{Entity}}NotFoundError extends Error {
  constructor(id: string) {
    super(`{{Entity}} with id "${id}" was not found`);
    this.name = '{{Entity}}NotFoundError';
  }
}

export class {{Entity}}AlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`{{Entity}} "${identifier}" already exists`);
    this.name = '{{Entity}}AlreadyExistsError';
  }
}
```

---

### Repository Port — `<entity>.repository.ts`

```typescript
import { {{Entity}} } from './<entity>.entity';

export interface I{{Entity}}Repository {
  create(entity: {{Entity}}): Promise<{{Entity}}>;
  findById(id: string): Promise<{{Entity}} | null>;
  findAll(): Promise<{{Entity}}[]>;
  update(entity: {{Entity}}): Promise<{{Entity}}>;
  delete(id: string): Promise<void>;
}

export const {{ENTITY}}_REPOSITORY = Symbol('I{{Entity}}Repository');
```

---

### DTOs — `dto/`

```typescript
// create-<entity>.dto.ts
export interface Create{{Entity}}Dto {
  // {{fields}} — required fields, no id or timestamps
}

// update-<entity>.dto.ts
export interface Update{{Entity}}Dto {
  // {{fields}} — all optional
}

// <entity>.response.dto.ts
export interface {{Entity}}ResponseDto {
  id: string;
  // {{fields}}
  createdAt: string;
  updatedAt: string;
}

export function to{{Entity}}ResponseDto(
  entity: import('../../../domain/<entity>/<entity>.entity').{{Entity}}
): {{Entity}}ResponseDto {
  return {
    id: entity.id,
    // map fields
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}
```

---

### Application Service — `<entity>.service.ts`

```typescript
import { randomUUID } from 'crypto';
import { {{Entity}} } from '@domain/<entity>/<entity>.entity';
import { I{{Entity}}Repository } from '@domain/<entity>/<entity>.repository';
import { {{Entity}}NotFoundError } from '@domain/<entity>/<entity>.errors';
import {
  Create{{Entity}}Dto,
  Update{{Entity}}Dto,
  {{Entity}}ResponseDto,
  to{{Entity}}ResponseDto,
} from './dto';

export class {{Entity}}Service {
  constructor(private readonly repository: I{{Entity}}Repository) {}

  async create(dto: Create{{Entity}}Dto): Promise<{{Entity}}ResponseDto> {
    const entity = {{Entity}}.create({
      id: randomUUID(),
      // map dto fields
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const saved = await this.repository.create(entity);
    return to{{Entity}}ResponseDto(saved);
  }

  async getById(id: string): Promise<{{Entity}}ResponseDto> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new {{Entity}}NotFoundError(id);
    return to{{Entity}}ResponseDto(entity);
  }

  async list(): Promise<{{Entity}}ResponseDto[]> {
    const entities = await this.repository.findAll();
    return entities.map(to{{Entity}}ResponseDto);
  }

  async update(id: string, dto: Update{{Entity}}Dto): Promise<{{Entity}}ResponseDto> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new {{Entity}}NotFoundError(id);
    // existing.update(dto); ← call domain method here
    const saved = await this.repository.update(existing);
    return to{{Entity}}ResponseDto(saved);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new {{Entity}}NotFoundError(id);
    await this.repository.delete(id);
  }
}
```

---

### Repository Implementation — `<entity>.repository.impl.ts`

This is a stub in-memory implementation. Replace the internals with your actual persistence mechanism (SQLite, PostgreSQL via a query builder, etc.) when ready.

```typescript
import { {{Entity}} } from '@domain/<entity>/<entity>.entity';
import { I{{Entity}}Repository } from '@domain/<entity>/<entity>.repository';

export class {{Entity}}Repository implements I{{Entity}}Repository {
  // Swap this Map for your real DB client when ready
  private store = new Map<string, {{Entity}}>();

  async create(entity: {{Entity}}): Promise<{{Entity}}> {
    this.store.set(entity.id, entity);
    return entity;
  }

  async findById(id: string): Promise<{{Entity}} | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(): Promise<{{Entity}}[]> {
    return Array.from(this.store.values());
  }

  async update(entity: {{Entity}}): Promise<{{Entity}}> {
    this.store.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
```

---

### Hono Controller — `<entity>.controller.ts`

```typescript
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { {{Entity}}Service } from '@application/<entity>/<entity>.service';
import { {{Entity}}NotFoundError } from '@domain/<entity>/<entity>.errors';
import type { Create{{Entity}}Dto, Update{{Entity}}Dto } from '@application/<entity>/dto';

export function create{{Entity}}Controller(service: {{Entity}}Service): Hono {
  const app = new Hono();

  app.get('/', async (c) => {
    const items = await service.list();
    return c.json(items);
  });

  app.get('/:id', async (c) => {
    try {
      const item = await service.getById(c.req.param('id'));
      return c.json(item);
    } catch (err) {
      if (err instanceof {{Entity}}NotFoundError)
        throw new HTTPException(404, { message: err.message });
      throw err;
    }
  });

  app.post('/', async (c) => {
    const body = await c.req.json<Create{{Entity}}Dto>();
    const created = await service.create(body);
    return c.json(created, 201);
  });

  app.patch('/:id', async (c) => {
    try {
      const body = await c.req.json<Update{{Entity}}Dto>();
      const updated = await service.update(c.req.param('id'), body);
      return c.json(updated);
    } catch (err) {
      if (err instanceof {{Entity}}NotFoundError)
        throw new HTTPException(404, { message: err.message });
      throw err;
    }
  });

  app.delete('/:id', async (c) => {
    try {
      await service.delete(c.req.param('id'));
      return c.body(null, 204);
    } catch (err) {
      if (err instanceof {{Entity}}NotFoundError)
        throw new HTTPException(404, { message: err.message });
      throw err;
    }
  });

  return app;
}
```

---

### Route Registration — `<entity>.routes.ts`

```typescript
import { {{Entity}}Repository } from '@infrastructure/database/repositories/<entity>.repository.impl';
import { {{Entity}}Service } from '@application/<entity>/<entity>.service';
import { create{{Entity}}Controller } from './<entity>.controller';

export function register{{Entity}}Routes() {
  const repository = new {{Entity}}Repository();
  const service = new {{Entity}}Service(repository);
  return create{{Entity}}Controller(service);
}

// In your main app entry point:
// import { register{{Entity}}Routes } from '@presenters/<entity>.routes';
// app.route('/{{entities}}', register{{Entity}}Routes());
```

---

### Prisma Schema — `prisma/schema.prisma`

```prisma
model {{Entity}} {
  id        String   @id @default(uuid())
  // {{fields}}
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("{{entities}}")
}
```

---

## Step 4 — After generation

**Register routes** in the main Hono app entry point (e.g. `src/infrastructure/http/app.ts`):

```typescript
import { register{{Entity}}Routes } from '@presenters/<entity>.routes';
app.route('/{{entities}}', register{{Entity}}Routes());
```

**When you add a real database later**, replace the in-memory `Map` in `<entity>.repository.impl.ts` with your actual client calls. The domain and application layers stay untouched — that's the point of the port/adapter split.
