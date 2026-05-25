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
