# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **frontend-only** repository for **Hellio HR** — an intelligent, agent-assisted hiring operations system for a professional services company that interviews and hires technical talent (developers, DevOps, SREs, data engineers).

The full product specification is in [product-specification.md](product-specification.md).

## Product Context

**Core capabilities to build:**
- Candidate profile & CV management (structured views, side-by-side diff of CV versions, original document access)
- Centralized candidate database (structured data, notes, evaluations, legacy import)
- Search, reporting, and shortlist generation
- Candidate–role matching with explainable AI rankings
- Human-in-the-loop automated intake and communication drafting (no external comms without human approval)

**Design principles:**
- Assistive, not autonomous: the system proposes, humans decide
- Every AI recommendation must be traceable and grounded in stored data
- Candidate data is sensitive — secure by design
- Cost-aware use of AI/LLM calls

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | Vue Router |
| State Management | Pinia |
| UI Components | PrimeVue (Aura theme) |
| Testing | Vitest |
| Linting | ESLint + Prettier |

## Commands

```bash
npm run dev        # Start dev server (hot reload)
npm run build      # Production build
npm run preview    # Preview production build
npm run test:unit  # Run unit tests with Vitest
npm run lint       # Lint with ESLint
npm run format     # Format with Prettier
```

## Project Structure

```
src/
├── assets/            # Global styles
├── components/        # Reusable UI components
│   ├── candidates/    # Candidate-specific components
│   └── positions/     # Position-specific components
├── composables/       # Shared Vue composables
├── data/              # Hardcoded JSON mock data
├── router/            # Vue Router configuration
├── stores/            # Pinia stores (candidates, positions)
├── types/             # TypeScript type definitions
└── views/             # Route-level page components
```

## Routes

- `/candidates` — List active candidates with search & filter
- `/candidates/:id` — Candidate profile detail
- `/candidates/compare?ids=id1,id2` — Side-by-side comparison
- `/positions` — List open positions
- `/positions/:id` — Position detail with linked candidates

## Key Decisions

- **Data model first**: Candidate and Position types are in `src/types/` — all UI derives from these
- **JSON data**: Mock data lives in `src/data/` as JSON files (no backend yet)
- **PrimeVue components**: Use DataTable, Card, Panel, Tag, etc. from PrimeVue — don't rebuild these
