import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const WS_BASE_URL = 'ws://localhost:8000';

// Global shared state for the websocket
let ws = null;
const subscribers = new Set();
let latestState = {
  LOG_UPDATE: [],
  GLOBAL_AGENT_STATUS: null,
  WORKFLOW_UPDATE: null,
  SYSTEM_HEALTH: null,
  NOTIFICATIONS: null,
  SCRIBE_UPDATE: null,
  isConnected: false
};

const notifySubscribers = () => {
  subscribers.forEach(sub => sub(latestState));
};

const connectWebSocket = () => {
  if (ws) return;
  ws = new WebSocket(`${WS_BASE_URL}/ws`);

  ws.onopen = () => {
    latestState.isConnected = true;
    notifySubscribers();
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'LOG_UPDATE' && message.data) {
          const combined = [...message.data, ...(latestState.LOG_UPDATE || [])];
          // unique by Id and TimeCreated
          const unique = combined.filter((v,i,a)=>a.findIndex(t=>(t.Id === v.Id && JSON.stringify(t.TimeCreated) === JSON.stringify(v.TimeCreated)))===i);
          latestState.LOG_UPDATE = unique.slice(0, 100);
      } else if (message.type) {
          latestState[message.type] = message.data;
      }
      notifySubscribers();
    } catch (err) {
      console.error("WebSocket message error:", err);
    }
  };

  ws.onclose = () => {
    latestState.isConnected = false;
    notifySubscribers();
    ws = null;
    setTimeout(connectWebSocket, 5000); // Reconnect
  };
};

export function useSharedWebSocket() {
  const [state, setState] = useState(latestState);
  
  useEffect(() => {
    connectWebSocket();
    const subscriber = (newState) => {
      setState({ ...newState });
    };
    subscribers.add(subscriber);
    
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);
  
  return state;
}

// --- Rewritten Hooks for WebSockets ---

export function useLogs() {
  const state = useSharedWebSocket();
  return { logs: state.LOG_UPDATE, isConnected: state.isConnected };
}

export function useCommanderState() {
  const state = useSharedWebSocket();
  return { commanderState: state.WORKFLOW_UPDATE };
}

export function useScribeState() {
  const state = useSharedWebSocket();
  return { scribeState: state.SCRIBE_UPDATE ? state.SCRIBE_UPDATE.logs : null };
}

export function useGlobalAgentState() {
  const state = useSharedWebSocket();
  return { globalState: state.GLOBAL_AGENT_STATUS };
}

export function useMonitorState() {
  const state = useSharedWebSocket();
  return { monitorState: state.SYSTEM_HEALTH };
}

export function useNotificationState() {
  const state = useSharedWebSocket();
  return { notificationState: state.NOTIFICATIONS };
}

export function useExecutiveDashboard() {
  const [executiveData, setExecutiveData] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      // Pass a dummy token if MOCK_AUTH is expected by backend, or just rely on backend config
      axios.get(`${API_BASE_URL}/api/dashboard/executive`, { headers: { Authorization: "Bearer MOCK" } })
        .then(res => {
          if (res.data && res.data.data) setExecutiveData(res.data.data);
        })
        .catch(err => console.error("Error fetching executive dashboard:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 10000); // Fetch every 10s
    return () => clearInterval(interval);
  }, []);

  return { executiveData };
}

export function useOperationalDashboard() {
  const [operationalData, setOperationalData] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/dashboard/operational`, { headers: { Authorization: "Bearer MOCK" } })
        .then(res => {
          if (res.data && res.data.data) setOperationalData(res.data.data);
        })
        .catch(err => console.error("Error fetching operational dashboard:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 10000);
    return () => clearInterval(interval);
  }, []);

  return { operationalData };
}

// --- Remaining Hooks (REST) ---

export function useReflectiveLearningState() {
  const [rlmState, setRlmState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/reflective_learning/status`)
        .then(res => {
          if (res.data) setRlmState(res.data);
        })
        .catch(err => console.error("Error fetching RLM state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { rlmState };
}

export function useMemoryState() {
  const [memoryState, setMemoryState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/memory/status`)
        .then(res => {
          if (res.data) setMemoryState(res.data);
        })
        .catch(err => console.error("Error fetching memory state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { memoryState };
}

export const searchMemory = async (query) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/agents/memory/search`, { params: { query } });
    if (res.data && res.data.data) {
      return res.data.data;
    }
  } catch (err) {
    console.error("Error searching memory:", err);
  }
  return [];
};

export function useAnalyticsData() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/analytics/dashboard`)
        .then(res => {
          if (res.data && res.data.data) setAnalyticsData(res.data.data);
        })
        .catch(err => console.error("Error fetching analytics data:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 10000); // Fetch every 10s
    return () => clearInterval(interval);
  }, []);

  return { analyticsData };
}

export function useReportState() {
  const [reportState, setReportState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/report/status`)
        .then(res => {
          if (res.data) setReportState(res.data);
        })
        .catch(err => console.error("Error fetching report state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { reportState };
}

export function useIdentityState() {
  const [identityState, setIdentityState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/identity/status`)
        .then(res => {
          if (res.data) setIdentityState(res.data);
        })
        .catch(err => console.error("Error fetching identity state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { identityState };
}

export const generateReport = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/agents/report/generate`, payload);
    return res.data;
  } catch (err) {
    console.error("Error generating report:", err);
    throw err;
  }
};
