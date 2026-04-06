# Novella

Novella is a full-stack story-sharing platform designed to explore reliability, offline-first systems, and personalized content delivery.

## Why I Built This

Most reading platforms assume constant internet access and treat caching as a performance optimization. I wanted to test whether that assumption actually holds under real-world conditions.

## Key Systems

### Offline-First Caching (IndexedDB)

Initially, I implemented caching using localStorage. Under real usage, this failed:
- Payload size limits caused storage errors
- API failures led to missing content
- Users lost access to previously loaded data

I replaced this with IndexedDB using a hybrid fetch strategy:
- When online: fetch from backend, then persist to cache
- When offline: serve from IndexedDB

**Result:** Previously viewed content reliably loads without internet, and request failures no longer break the UI.

---

### Hybrid Fetch System

I built a reusable `fetchWithCache` utility that:
- Detects online/offline state
- Decides whether to fetch or read from cache
- Syncs backend data into IndexedDB

This removed duplicated logic across:
- Top Picks
- Trending by Genre
- Homepage data

---

### Recommendation Engine

I implemented a scoring-based recommendation system combining:
- User interactions (likes, reads)
- System-generated tags from content
- Audience filtering (based on age)
- Engagement timing

Each signal contributes independently to a final score, allowing recommendations even with sparse data.

---

## What I Learned

- Caching is not an optimization—it is core infrastructure for reliability
- Storage limitations (like localStorage size) directly affect system correctness
- Offline support changes how you design data flow, not just how you store it
- Real-world failures (not assumptions) should drive system design decisions

---

## Stack

- React (frontend)
- Node.js + Express (backend)
- Prisma + PostgreSQL (database)
- IndexedDB (offline caching)

---

## Focus

This project is less about features and more about:
- System reliability under failure conditions
- Designing around real-world constraints
- Understanding how users actually experience systems, not how they are expected to
