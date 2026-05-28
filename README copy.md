# 🎨 Frontend — Data Cleaner UI

A **futuristic, cyberpunk-themed** React application with advanced data visualization and AI-powered interaction.

## Features

### 🚀 Core Functionality
- **Drag-and-drop file upload** with real-time validation
- **Interactive profiling dashboard** with quality metrics
- **Live cleaning pipeline** with step-by-step execution
- **Supervised mode** with approve/skip/override controls
- **Real-time WebSocket updates** from the backend
- **AI chat assistant** for asking questions about your data
- **Multi-format export** (CSV, Excel, JSON, Parquet, PDF reports)
- **Pipeline library** for saving and reusing cleaning recipes

### 🎭 Design & UX
- **Cyberpunk aesthetic** with neon cyan, hot pink, and neon green
- **Smooth animations** with Framer Motion
- **Responsive design** for mobile, tablet, and desktop
- **Toast notifications** for user feedback
- **Statistics dashboard** with charts and metrics
- **Data preview panel** with live table updates
- **Settings modal** for user preferences
- **Persistent state** with Zustand

### 📊 Visualizations
- **Quality score circles** with animated progress
- **Bar charts** for data quality metrics
- **Line charts** for processing timeline
- **Live data preview** table with scrolling
- **Progress bars** for cleaning operations

## Installation

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Configure environment
The app proxies requests to the backend:
- API: `http://localhost:4000`
- WebSocket: `ws://localhost:4000/ws`

(Configured in `vite.config.js`)

### 3. Development server
```bash
npm run dev
```

Opens on **http://localhost:5173**

### 4. Production build
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                    # Main app orchestrator
├── index.css                  # Global styles + animations
├── main.jsx                   # React entry point
├── store.js                   # Zustand global state
├── api.js                     # All API calls
│
├── hooks/
│   └── useWebSocket.js        # WebSocket connection hook
│
├── components/
│   ├── Card.jsx               # Reusable card component
│   ├── Navbar.jsx             # Sticky navbar with status
│   ├── ChatPanel.jsx          # AI assistant chat
│   ├── SettingsModal.jsx      # User settings
│   ├── DataPreview.jsx        # Live data table
│   ├── StatsOverview.jsx      # Charts & metrics
│   ├── PipelineManager.jsx    # Pipeline CRUD
│   ├── Loaders.jsx            # Loading animations
│   └── Toast.jsx              # Toast notification system
│
└── screens/
    ├── UploadScreen.jsx       # File upload
    ├── ProfilingScreen.jsx    # Analysis results
    ├── CleaningScreenEnhanced.jsx  # Cleaning pipeline
    └── CompletionScreen.jsx   # Results & export
```

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool (fast dev server) |
| **Tailwind CSS** | Styling with custom cyber theme |
| **Framer Motion** | Smooth animations & transitions |
| **Zustand** | Global state management |
| **Recharts** | Charts & visualizations |
| **Axios** | HTTP client |
| **Lucide React** | Beautiful icons |

## Design System

### Colors (Cyberpunk Theme)
```css
--accent: #00d4ff      /* Neon cyan */
--accent2: #ff006e     /* Hot pink */
--accent3: #00f5a0     /* Neon green */
--bg: #0a0e27          /* Deep navy */
--card: #141829        /* Dark card */
--border: #1a1f3a      /* Subtle border */
--text: #e0e7ff        /* Light text */
```

### Typography
- **Display font**: Space Grotesk (distinctive, bold)
- **Body font**: Inter (refined, readable)

### Components
All components use `Card` wrapper with hover effects and `motion.div` for animations.

```jsx
<Card className="p-6" hover>
  <motion.button whileHover={{ scale: 1.05 }}>
    Click me
  </motion.button>
</Card>
```

## State Management

Using **Zustand** for simple, scalable state:

```javascript
const { sessionId, fileMeta, cleaningStatus } = useStore();
const setCleaningStatus = useStore((s) => s.setCleaningStatus);
```

Key state:
- `sessionId` — current cleaning session
- `fileMeta` — uploaded file metadata
- `cleaningStatus` — 'profiling' | 'running' | 'complete' | 'error'
- `stepsCompleted` — list of executed steps
- `currentStep` — pending step awaiting approval (supervised mode)
- `chatMessages` — conversation history

## API Integration

All API calls in `src/api.js`:

```javascript
// Upload
const result = await uploadFile(file);
const { sessionId, fileMeta, profilingReport } = result;

// Cleaning
await startCleaning(sessionId, 'supervised'); // or 'automated'
await resumeCleaning(sessionId, 'approve', overrides);

// Export
const csvBlob = await exportDataset(sessionId, 'csv');
const pipeline = await exportPipeline(sessionId);
```

## WebSocket Events

Listen for real-time updates:

```javascript
// From server:
{ type: 'graph_status', status: 'running' }
{ type: 'step_pending', step: { tool_name, parameters, ... } }
{ type: 'step_complete', step, result }
{ type: 'llm_switch', llm: 'grok' }
{ type: 'error', message: '...' }
```

Handled in `useWebSocket` hook — updates store automatically.

## Animations & Effects

### Entrance animations
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### Hover effects
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Loading spinners
```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
  className="border-2 border-cyber-accent border-t-transparent rounded-full"
/>
```

### Staggered children
```javascript
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Toast Notifications

```javascript
import { useToast } from './components/Toast';

const { addToast } = useToast();
addToast('Success!', 'success');    // green
addToast('Error occurred', 'error'); // red
addToast('Info', 'info');            // cyan
```

## Responsive Breakpoints

Uses Tailwind responsive prefixes:
- `sm:` — 640px and up
- `md:` — 768px and up
- `lg:` — 1024px and up

Grid layout auto-stacks on mobile:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
```

## Performance Optimizations

- **Code splitting** by route (Vite)
- **Lazy component imports** (React.lazy)
- **Memoized components** (React.memo)
- **WebSocket for real-time** (no polling)
- **Zustand for lightweight state** (no Redux overhead)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### WebSocket connection fails
Check that backend is running on `localhost:4000` and has CORS enabled.

### Styles not loading
Clear node_modules and rebuild:
```bash
rm -rf node_modules && npm install && npm run dev
```

### API calls 404
Verify Vite proxy in `vite.config.js` and backend routes in Node.js.

---

Built with ✨ for the future of data cleaning.
