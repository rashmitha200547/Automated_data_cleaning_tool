import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      authLoading: true,

      // Session & Dataset
      sessionId: null,
      currentFile: null,
      fileMeta: null,
      profilingReport: null,
      summary: null,
      overallConfidence: null,
      recommendedPipeline: [],
      qualityScoreBefore: 0,
      qualityScoreAfter: null,

      // Cleaning state
      mode: null,
      cleaningStatus: null,
      stepsCompleted: [],
      stepsRemaining: [],
      currentStep: null,
      datasetVersion: 0,
      stepLog: [],
      graphStatus: null,

      // WebSocket
      wsConnected: false,

      // UI
      showChat: false,
      chatMessages: [],

      // ── Auth Actions ──
      setUser: (user) => set({ user, isAuthenticated: !!user, authLoading: false }),
      setAuthLoading: (loading) => set({ authLoading: loading }),
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          sessionId: null,
          currentFile: null,
          fileMeta: null,
          profilingReport: null,
          summary: null,
          overallConfidence: null,
          recommendedPipeline: [],
          qualityScoreBefore: 0,
          qualityScoreAfter: null,
          mode: null,
          cleaningStatus: null,
          stepsCompleted: [],
          stepsRemaining: [],
          currentStep: null,
          datasetVersion: 0,
          stepLog: [],
          graphStatus: null,
          chatMessages: [],
          showChat: false,
        });
        localStorage.removeItem('dataforge-session');
      },

      // ── Session Actions ──
      setSessionId: (id) => set({ sessionId: id }),
      setCurrentFile: (file) => set({ currentFile: file }),
      setFileMeta: (meta) => set({ fileMeta: meta }),
      setProfilingReport: (report) => set({ profilingReport: report }),
      setSummary: (summary) => set({ summary }),
      setOverallConfidence: (c) => set({ overallConfidence: c }),
      setRecommendedPipeline: (pipeline) => set({ recommendedPipeline: pipeline }),
      setQualityScores: (before, after) => set({ qualityScoreBefore: before, qualityScoreAfter: after }),
      setQualityScoreAfter: (score) => set({ qualityScoreAfter: score }),
      setMode: (mode) => set({ mode }),
      setCleaningStatus: (status) => set({ cleaningStatus: status }),
      setStepsCompleted: (steps) => set({ stepsCompleted: steps }),
      setStepsRemaining: (steps) => set({ stepsRemaining: steps }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setDatasetVersion: (version) => set({ datasetVersion: version }),
      setStepLog: (log) => set({ stepLog: log }),
      setGraphStatus: (status) => set({ graphStatus: status }),
      setWsConnected: (connected) => set({ wsConnected: connected }),
      setShowChat: (show) => set({ showChat: show }),
      addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      clearChat: () => set({ chatMessages: [] }),

      // ── Reset (keeps user logged in) ──
      reset: () => set({
        sessionId: null,
        currentFile: null,
        fileMeta: null,
        profilingReport: null,
        summary: null,
        overallConfidence: null,
        recommendedPipeline: [],
        qualityScoreBefore: 0,
        qualityScoreAfter: null,
        mode: null,
        cleaningStatus: null,
        stepsCompleted: [],
        stepsRemaining: [],
        currentStep: null,
        datasetVersion: 0,
        stepLog: [],
        graphStatus: null,
        chatMessages: [],
        showChat: false,
      }),
    }),
    {
      name: 'dataforge-session',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionId: state.sessionId,
        currentFile: state.currentFile,
        fileMeta: state.fileMeta,
        profilingReport: state.profilingReport,
        summary: state.summary,
        overallConfidence: state.overallConfidence,
        recommendedPipeline: state.recommendedPipeline,
        qualityScoreBefore: state.qualityScoreBefore,
        mode: state.mode,
        cleaningStatus: state.cleaningStatus,
        stepsCompleted: state.stepsCompleted,
        stepsRemaining: state.stepsRemaining,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, stop the loading spinner
        if (state) {
          state.authLoading = false;
        }
      },
    }
  )
);
