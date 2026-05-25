# Katha

A storytelling platform for Indian mythological, historical, and diaspora fiction, with an AI-powered mythological context engine that helps readers explore the cultural and historical depth of every story.

> Status: **In active development.** Building publicly as a portfolio project.

## What this is

Katha is a Wattpad-style reading platform with a focused niche: Indian mythology, history, and diaspora fiction. Mahabharata retellings, Ramayana excerpts, Mughal-era historical fiction, Panchatantra and Jataka tales, modern stories from the global Indian diaspora.

The flagship feature is a **Mythological Context Engine** — a retrieval-augmented generation (RAG) system that lets readers tap any unfamiliar term in a story (a name, a concept, a place, a ritual) and get a grounded, cited explanation drawn from canonical public-domain sources.

## Why I'm building this

1. **The product gap is real.** Wattpad and Pratilipi serve Indian mythological and historical fiction poorly. Second-generation diaspora readers grew up with grandparents' stories but feel disconnected from contemporary Indian narratives. Massive public-domain source material (Ganguli's Mahabharata, Griffith's Ramayana, Panchatantra, Kathasaritsagara) gives a content moat to start.

2. **I want to ship a real production AI system end-to-end.** I'm a CS student at Carleton (AI/ML stream, Class of 2028), targeting AI engineering internships. Katha is my flagship portfolio project: a real RAG system with a real eval methodology, deployed and demoable.

## Architecture (planned)

\\\
+-------------+         +--------------+         +-------------+
¦  Next.js    ¦  HTTPS  ¦   FastAPI    ¦         ¦  Postgres   ¦
¦  frontend   ¦ ------? ¦   backend    ¦ ------? ¦  + pgvector ¦
+-------------+         +--------------+         +-------------+
                               ¦
                               ?
                        +--------------+
                        ¦   LLM API    ¦
                        ¦ (Anthropic)  ¦
                        +--------------+
\\\

A more detailed architecture diagram, design decisions, and tradeoff notes will live here as the project evolves.

## Tech stack (and why)

- **Frontend: Next.js (React)** — server-side rendering for the reading experience, mature ecosystem, easy deploy story.
- **Backend: Python + FastAPI** — Python is the native language of the AI/ML ecosystem; FastAPI is the modern async-first Python framework.
- **Database: Postgres + pgvector** — relational data and vector embeddings in one system, instead of running a separate vector database.
- **LLM: Claude (via Anthropic API)** — managed API rather than self-hosting; the project is about RAG quality, not GPU plumbing.
- **Embeddings: TBD** — OpenAI \	ext-embedding-3-small\ vs. open-source BGE, to be decided based on eval results.
- **Eval: Ragas + custom eval set** — 50–100 questions with known correct answers, measuring groundedness, accuracy, and hallucination rate.

## Project structure

\\\
katha/
+-- frontend/    # Next.js app
+-- backend/     # FastAPI app + RAG pipeline
\\\

## Build phases

1. ? Repo and dev environment setup
2. ? Frontend skeleton: browse stories, read, bookmark
3. ? Backend skeleton: stories API, basic CRUD
4. ? Content: 15–20 stories at MVP
5. ? RAG corpus curation and embedding pipeline
6. ? Retrieval and generation, with eval set
7. ? Tap-for-context UI integration
8. ? Polish, deploy, blog post

## Running locally

(Will fill in once there is something to run.)

## License

MIT — see [LICENSE](./LICENSE).

## Acknowledgements

Built on the labors of public-domain translators and editors — Kisari Mohan Ganguli for the Mahabharata, Ralph T. H. Griffith for the Ramayana, the contributors of the Wikipedia mythology corpus, and many more. Source attributions appear in-line throughout the application.

## Architecture decisions

Short rationale for the significant choices made. Tradeoffs explicitly noted.

### 1. Monorepo over polyrepo

\rontend/\ and \ackend/\ live in the same repository. As a solo developer this trades cleaner per-service separation for simpler cross-cutting changes (one commit can touch both layers when an API contract changes), one README, and a single coherent project page for recruiters. Risk: easy to accidentally couple layers — disciplined by keeping all cross-layer communication through the documented HTTP API, never by reaching across folders.

### 2. REST over GraphQL or RPC for the API

Resources map cleanly to nouns (stories, chapters, bookmarks). REST gives universal tooling, browser-debuggable endpoints, FastAPI's first-class support, and zero learning curve for collaborators. GraphQL would over-engineer the v1 surface; tRPC would couple the API tightly to a single TypeScript client. Complexity budget is reserved for the RAG system, not the API layer.

## v1 API contract

The frontend and backend communicate over HTTP/JSON. All paths are relative to \NEXT_PUBLIC_API_URL\ (default \http://localhost:8000\).

### Stories

| Method | Path | Purpose |
|--------|------|---------|
| \GET\ | \/stories\ | List all stories (with optional category filter) |
| \GET\ | \/stories/{id}\ | Get a single story's metadata |
| \GET\ | \/stories/{id}/chapters\ | List chapters belonging to a story |
| \GET\ | \/chapters/{id}\ | Get full content of a chapter |

### Bookmarks (anonymous, client-token-identified)

| Method | Path | Purpose |
|--------|------|---------|
| \GET\ | \/bookmarks\ | List the current client's bookmarks |
| \POST\ | \/bookmarks\ | Add a bookmark |
| \DELETE\ | \/bookmarks/{id}\ | Remove a bookmark |

### Reading progress

| Method | Path | Purpose |
|--------|------|---------|
| \GET\ | \/progress/{storyId}\ | Get reading progress for a story |
| \PUT\ | \/progress/{storyId}\ | Update reading progress (idempotent) |

### RAG (planned for v2)

| Method | Path | Purpose |
|--------|------|---------|
| \GET\ | \/context\ | Context card for a term within a story |
| \POST\ | \/ask\ | Free-form question grounded in story + corpus |

### Health

| Method | Path | Purpose |
|--------|------|---------|
| \GET\ | \/health\ | Liveness check; used by deploy platforms |

### Conventions

- Resources are plural nouns. IDs go in the path.
- HTTP methods carry the verb \(no \/getStory\, \/deleteBookmark\, etc.\).
- Standard status codes: \200\ OK, \201\ Created, \204\ No Content, \400\ Bad Request, \404\ Not Found, \500\ Internal Server Error.
- Errors return JSON: \{"detail": "human-readable message"}\ (FastAPI default shape).
- v1 has no authentication; bookmarks and progress are scoped by a client-generated anonymous token sent in an \X-Client-Id\ header.
