# Address Book – Next.js Architecture Demo

A frontend-focused architectural demo built with **Next.js (App Router)** and **TypeScript (strict mode)**.

This project is intentionally designed as a clean, scalable reference for internal company use.
It is not a production backend application, it demonstrates frontend architecture, state discipline, and UI system organization.

---

## Purpose

This repository exists to demonstrate:

* Clear separation of concerns
* Predictable state management
* Deterministic data pipelines
* Schema-driven validation
* Middleware-based route protection
* Minimal but structured UI system
* Optimistic UI updates
* Stable sorting, search, and pagination
* Clean layering for scalable growth

The goal is architectural clarity, not feature complexity.

---

## Tech Stack

* **Next.js (App Router)**
* **React 19**
* **TypeScript (strict mode)**
* **Tailwind CSS**
* **Zod (schema validation)**
* **localStorage (client persistence demo)**
* **Middleware-based auth (cookie presence check)**

No external state management libraries.
No backend API layer.
No artificial abstractions.

---

## Architectural Overview

The project follows strict layering:

```
app/                → Routing (App Router)
components/ui/      → Reusable UI primitives
components/contacts → Feature-level UI
hooks/              → State logic
lib/validation/     → Zod schemas + types
lib/                → Persistence utilities
providers/          → Application infrastructure
```

### Layer Responsibilities

**UI Layer (`components/ui`)**

* Pure visual primitives
* No business logic
* No feature awareness

**Feature Layer (`components/contacts`)**

* Composes UI primitives
* Feature-specific UI behavior
* No persistence logic

**Hook Layer (`useContacts`)**

* Owns contact-related state
* Handles validation
* Controls search, sort, pagination
* Manages optimistic updates
* Persists to localStorage

**Routing Layer (`app/`)**

* Orchestrates features
* No heavy logic
* Delegates to hooks and components

This separation ensures predictable scaling and maintainability.

---

## State Management Strategy

All contact-related logic is centralized inside `useContacts`.

Data flow is deterministic:

```
raw contacts
→ filter (search)
→ sort
→ paginate
→ render
```

The hook owns:

* Contact list
* Editing state
* Search state
* Sorting state
* Pagination state
* Validation
* Persistence

Pages do not implement business logic.

---

## Validation Strategy

Zod schemas live in:

```
lib/validation/contact.schema.ts
```

Types are inferred directly from schemas to ensure:

* No duplicate types
* Single source of truth
* Strict type safety

---

## Authentication Model

Authentication is intentionally minimal:

* Cookie presence check via middleware
* AuthProvider synchronizes client state with cookie
* Protected routes redirect at middleware level

This demonstrates route protection without backend complexity.

---

## Design System Philosophy

The UI layer includes minimal primitives:

* Button
* Input
* Card
* Modal

All interactive elements use shared UI primitives to ensure visual consistency.

Spacing, borders, and typography follow consistent rules.

The system is intentionally small but scalable.

---

## Tradeoffs (Intentional Decisions)

* Uses localStorage instead of API → keeps focus on frontend architecture
* No global state library → avoids unnecessary complexity
* No server components for data → demo focuses on client-side state discipline
* No animation libraries → visual polish kept minimal and intentional

This is a clarity-first demo, not a production SaaS template.

---

## What This Project Demonstrates

* Clean architectural thinking
* Predictable React state flow
* Strict TypeScript discipline
* Thoughtful UI layering
* Avoidance of overengineering
* Controlled complexity

---

## Running the Project

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```