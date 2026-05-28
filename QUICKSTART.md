# ⚡ Quick Start Guide (5 minutes)

## What You Have
A complete **full-stack AI-powered data cleaning application** ready to run immediately.

---

## 🚀 Start in 2 Commands

### Prerequisites
- Docker & Docker Compose installed
- 4GB free RAM
- Port 5173, 4000, 8000 available

### Run It
```bash
cd auto-data-cleaner
docker-compose up --build
```

**That's it!** Grab a ☕ while it builds...

### Access
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:4000/health
- **Python Engine**: http://localhost:8000/docs

---

## 🎯 First Steps (After Launch)

### 1. Create Test Data
```csv
name,age,salary,email,department,start_date
John Doe,30,50000,john@example.com,Engineering,2022-01-15
Jane Smith,28,55000,jane@example.com,Marketing,2022-03-20
Bob Johnson,,60000,bob@invalid.em,Sales,2021-11-10
Alice Brown,29,52000,alice@example.com,Engineering,2023-02-28
Alice Brown,29,52000,alice@example.com,Engineering,2023-02-28
```

Save as `test.csv`

### 2. Upload & Profile
1. Open http://localhost:5173
2. Drag & drop `test.csv`
3. Wait ~5 seconds for profiling
4. See the analysis report

### 3. Choose Mode
- **Supervised**: Review each step → Click approve
- **Automated**: Sit back, watch the magic ✨

### 4. Export
After cleaning:
- Download CSV, Excel, or PDF
- Save pipeline for reuse on similar files

---

## 📋 What's Included

```
✅ 11 Data Profiling Tools
   - Missing values, duplicates, outliers, types, distributions

✅ 14 Cleaning Tools  
   - Standardization, type conversion, imputation, validation

✅ AI Supervisor Agent
   - Gemini 1.5 Pro (primary)
   - Grok fallback
   - Natural language chat

✅ Human-in-the-Loop
   - Supervised mode with step-by-step approval
   - Undo/redo with full version history

✅ Beautiful UI
   - Cyberpunk aesthetic
   - Real-time live updates
   - Smooth animations

✅ Full Stack
   - React frontend
   - Node.js/Express backend
   - Python/FastAPI engine
   - Redis sessions
```

---

## 🔧 Customization (Optional)

### Add Your API Keys
Edit `python-engine/.env`:
```env
GEMINI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

(Optional for v1 — uses demo mode if not provided)

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
'cyber': {
  'accent': '#your-color',  // Change neon cyan
  'accent2': '#your-color', // Change hot pink
  'accent3': '#your-color', // Change neon green
}
```

### Add Google OAuth
Edit `backend/.env`:
```env
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```

---

## 🧪 Try These Test Scenarios

### Test 1: Basic Upload (2 min)
✅ Create a small CSV with missing values
✅ Upload and see profiling results
✅ Check quality score

### Test 2: Supervised Mode (5 min)
✅ Select "Supervised" mode
✅ Approve first 3 steps
✅ Skip one step
✅ See data change in real-time

### Test 3: Chat with AI (2 min)
✅ During cleaning, click "Ask the Agent"
✅ Type: "Why did you remove duplicates?"
✅ See AI explain its reasoning

### Test 4: Export (1 min)
✅ After cleaning, download CSV
✅ Download PDF report
✅ Open in Excel/PDF viewer

### Test 5: Save Pipeline (2 min)
✅ Save cleaning steps as named pipeline
✅ Upload new similar file
✅ Load saved pipeline
✅ Watch it apply steps automatically

---

## 📊 File Limits

| Feature | Limit |
|---------|-------|
| File size | 100MB |
| Formats | CSV, Excel, TSV, JSON |
| Rows | Up to 1M (tested) |
| Columns | Unlimited |
| Concurrent files | 1 per session |
| Session TTL | 24 hours |

---

## 🎨 UI Tour (2 min)

### Screen 1: Upload
- Drag & drop zone
- Real-time validation
- Shows file info

### Screen 2: Profiling
- Quality score (0-100)
- Issues found
- Recommended steps
- Mode selector

### Screen 3: Pipeline
- Step-by-step tracker
- Live data preview
- Approve/Skip buttons
- AI chat panel
- Undo/Redo

### Screen 4: Completion
- Before/After quality scores
- Export buttons
- Pipeline save option
- Stats dashboard

---

## 🐛 Troubleshooting

### "Port already in use"
```bash
docker-compose down
# Or change ports in docker-compose.yml
```

### "WebSocket connection failed"
```bash
# Verify backend is running
docker-compose logs backend
# Check for errors
```

### "File upload hangs"
```bash
# Python engine might be processing
docker-compose logs python-engine
# Watch for profiling progress
```

### "Styles look broken"
```bash
# Rebuild frontend
docker-compose rebuild frontend
docker-compose up frontend
```

---

## 📚 Learn More

- **Architecture**: See `README.md`
- **API Docs**: See `backend/` and `python-engine/`
- **Testing**: See `TESTING.md` (10 detailed scenarios)
- **Deployment**: See `DEPLOYMENT.md` (production setup)
- **Components**: See `frontend/src/components/`

---

## ⚙️ Manual Setup (If Not Using Docker)

```bash
# Terminal 1: Redis
redis-server

# Terminal 2: Python
cd python-engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 3: Node.js
cd backend
npm install
npm run dev

# Terminal 4: React
cd frontend
npm install
npm run dev
```

---

## 🎯 Next Steps

**Today**:
- ✅ Run the app
- ✅ Upload test file
- ✅ Try supervised mode
- ✅ Export results

**Tomorrow**:
- ✅ Add API keys (Gemini, Groq)
- ✅ Try all 10 test scenarios
- ✅ Customize colors
- ✅ Deploy to staging

**Next Week**:
- ✅ Deploy to production
- ✅ Setup SSL/HTTPS
- ✅ Monitor performance
- ✅ Plan enhancements

---

## 💡 Pro Tips

1. **Supervised mode is safer** — Good for important data
2. **Automated mode is faster** — Use for routine cleaning
3. **Save pipelines** — Reuse for similar datasets
4. **Chat with AI** — Ask about confusing decisions
5. **Undo is your friend** — Experiment freely

---

## ✨ Features At a Glance

| Feature | Example |
|---------|---------|
| **Profiling** | Find 30% missing values in salary column |
| **Type fixing** | Auto-detect "1,234.56" as number |
| **Standardization** | Unify "M", "Male", "MALE" → "male" |
| **Imputation** | Fill missing age with median |
| **Deduplication** | Remove exact duplicate rows |
| **Outlier handling** | Flag/remove impossible values |
| **Date parsing** | Recognize "01-02-2023" as date |
| **Quality scoring** | Show 65 → 92 improvement |
| **Export** | Download CSV, Excel, PDF, JSON |
| **Undo/Redo** | Full version history |

---

## 🚀 You're Ready!

```bash
docker-compose up --build
# Open http://localhost:5173
# Drag & drop a CSV
# Watch the magic happen ✨
```

**Questions?** Check the docs:
- `README.md` — Overview
- `TESTING.md` — Detailed test scenarios
- `DEPLOYMENT.md` — Production setup
- `PROJECT_SUMMARY.md` — Everything explained

---

**Enjoy your futuristic data cleaning experience!** 🎉
