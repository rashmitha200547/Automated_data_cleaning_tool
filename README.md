# 🧹 Automated Data Cleaning Tool — Backend

Agentic AI-powered data cleaning system. The LLM (Gemini 1.5 Pro / Grok fallback) acts as a supervisor that plans and orchestrates cleaning steps, while predefined Python tools perform all actual data transformations.

---

## Project Structure

```
auto-data-cleaner/
├── docker-compose.yml
│
├── backend/                        # Node.js + Express (API layer)
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── index.js                # App entry point
│       ├── config/
│       │   ├── redis.js            # Redis client + session helpers
│       │   └── session.js          # Express-session with Redis store
│       ├── routes/
│       │   ├── upload.js           # POST /api/upload — Gate 0 + profiling
│       │   ├── cleaning.js         # POST /api/cleaning/start|resume|undo|redo|chat
│       │   ├── export.js           # GET  /api/export/dataset|pipeline|report
│       │   ├── session.js          # GET/DELETE /api/session/:id
│       │   ├── pipeline.js         # CRUD for saved pipeline library
│       │   └── auth.js             # Google OAuth 2.0
│       ├── services/
│       │   ├── pythonEngine.js     # All HTTP calls to FastAPI engine
│       │   └── websocket.js        # WebSocket server — live UI updates
│       ├── middleware/
│       │   └── errorHandler.js     # Centralised error handling
│       └── utils/
│           └── fileUtils.js
│
└── python-engine/                  # Python + FastAPI (data + AI layer)
    ├── Dockerfile
    ├── requirements.txt
    ├── .env.example
    ├── main.py                     # FastAPI app — all endpoints
    ├── state.py                    # LangGraph TypedDict state schema
    ├── graph.py                    # StateGraph: nodes, edges, compilation
    ├── llm.py                      # Gemini + Grok init, fallback logic
    ├── checkpointer.py             # SQLite checkpointer for LangGraph
    ├── session_store.py            # Dataset versioning + undo/redo on disk
    ├── tools/
    │   ├── profiling.py            # 11 Phase 1 profiling tools (@tool)
    │   └── cleaning.py             # 14 Phase 2 cleaning tools (@tool)
    └── nodes/
        ├── supervisor.py           # LLM node — decides next action
        ├── human_review.py         # Human-in-the-loop interrupt node
        └── executor.py             # Tool executor node with retry
```

---

## Quick Start

### 1. Configure environment variables

```bash
cp backend/.env.example backend/.env
cp python-engine/.env.example python-engine/.env
# Fill in GEMINI_API_KEY, GROQ_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
```

### 2. Start with Docker Compose

```bash
docker-compose up --build
```

Services:
- `redis` → port 6379
- `python-engine` → http://localhost:8000
- `backend` → http://localhost:4000

### 3. Manual (development)

```bash
# Terminal 1 — Redis (Docker)
docker run -d --name redis-cleaner -p 6379:6379 redis:7-alpine

# (Optional: If you have Redis installed locally, you can use `redis-server` instead)

# Terminal 2 — Python engine
cd python-engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 3 — Node.js backend
cd backend
npm install
npm run dev
```

---

## API Reference

### Node.js Backend (port 4000)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/upload` | Upload file — Gate 0 validation + Phase 1 profiling |
| `POST` | `/api/cleaning/start` | Start LangGraph cleaning run |
| `POST` | `/api/cleaning/resume` | Resume after human review (approve/skip/override) |
| `GET`  | `/api/cleaning/status/:sessionId` | Poll graph status |
| `POST` | `/api/cleaning/undo` | Undo last cleaning step |
| `POST` | `/api/cleaning/redo` | Redo undone step |
| `POST` | `/api/cleaning/chat` | Chat with the agent |
| `GET`  | `/api/cleaning/preview/:sessionId` | Paginated dataset preview |
| `GET`  | `/api/export/dataset/:sessionId?format=csv` | Download cleaned dataset |
| `GET`  | `/api/export/pipeline/:sessionId` | Download pipeline JSON |
| `GET`  | `/api/export/report/:sessionId` | Download PDF report |
| `GET`  | `/api/session/:sessionId` | Get session metadata |
| `DELETE` | `/api/session/:sessionId` | Delete session |
| `POST` | `/api/pipeline` | Save a named pipeline |
| `GET`  | `/api/pipeline` | List saved pipelines |
| `GET`  | `/api/pipeline/:pipelineId` | Get a pipeline |
| `DELETE` | `/api/pipeline/:pipelineId` | Delete a pipeline |
| `GET`  | `/auth/google` | Google OAuth login |
| `GET`  | `/auth/me` | Get current user |

### WebSocket (ws://localhost:4000/ws)

Connect then send: `{ "type": "register", "sessionId": "..." }`

Events pushed to frontend:
- `{ type: "graph_status", status: "profiling" | "running" | "waiting_for_human" | "complete" | "error" }`
- `{ type: "step_pending", step: { tool_name, parameters, reason, confidence } }`
- `{ type: "step_complete", step, result }`
- `{ type: "llm_switch", llm: "grok" | "gemini" }`
- `{ type: "error", message }`

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| LLM never touches data | All transformations go through typed Python tool functions — auditable and reversible |
| LangGraph for orchestration | Native human-in-the-loop (`interrupt_before`), state checkpointing, conditional branching |
| SQLite checkpointer | Enables crash recovery and Supervised Mode pause/resume without an external database |
| Dataset versioning as Parquet files | Instant undo (just delete the latest file) — no need to re-run prior steps |
| Node.js as middle layer | Decouples React frontend from Python graph engine; handles WebSocket, Redis caching, session management |
| Gemini primary / Grok fallback | Resilience — 3 failures within 30 seconds triggers automatic switch; auto-switches back after 5 minutes |

---

## LangGraph Flow

```
intake_node
    ↓
profiling_node
    ↓
supervisor_node ←──────────────────────────────┐
    │                                           │
    ├──[High/Med confidence + Automated]──→ tool_executor_node ──→ (back to supervisor)
    │                                           │
    ├──[Low confidence OR Supervised]──→ human_review_node
    │                                       │
    │                                       ├──[approve/override]──→ tool_executor_node
    │                                       ├──[skip]─────────────→ supervisor_node ──┘
    │                                       └──[finish_now]────────→ validation_node
    │
    └──[CLEANING_COMPLETE signal]──→ validation_node → output_node → END
```

---

## Data Quality Score Formula

```
Score = (Completeness + Uniqueness + Validity + Consistency) / 4

Completeness  = 100 - (missing_cells / total_cells * 100)
Uniqueness    = 100 - (duplicate_rows / total_rows * 100)
Validity      = % of values passing domain rules
Consistency   = % of columns with correct inferred type
```
