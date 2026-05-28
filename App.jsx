import { Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import { LandingPage } from './screens/LandingPage';
import { AuthScreen } from './screens/AuthScreen';
import { UploadScreen } from './screens/UploadScreen';
import { ProfilingScreen } from './screens/ProfilingScreen';
import { CleaningScreenEnhanced } from './screens/CleaningScreenEnhanced';
import { CompletionScreen } from './screens/CompletionScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ChatPanel } from './components/ChatPanel';
import { ToastContainer } from './components/Toast';
import './index.css';

function App() {
  const showChat = useStore((s) => s.showChat);
  const setShowChat = useStore((s) => s.setShowChat);
  const sessionId = useStore((s) => s.sessionId);

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthScreen />} />

        {/* Protected routes */}
        <Route path="/upload" element={
          <ProtectedRoute><UploadScreen /></ProtectedRoute>
        } />
        <Route path="/profiling" element={
          <ProtectedRoute><ProfilingScreen /></ProtectedRoute>
        } />
        <Route path="/cleaning" element={
          <ProtectedRoute><CleaningScreenEnhanced /></ProtectedRoute>
        } />
        <Route path="/completion" element={
          <ProtectedRoute><CompletionScreen /></ProtectedRoute>
        } />
      </Routes>

      {/* Global overlays */}
      {sessionId && <ChatPanel isOpen={showChat} onClose={() => setShowChat(false)} />}
      <ToastContainer />
    </div>
  );
}

export default App;
