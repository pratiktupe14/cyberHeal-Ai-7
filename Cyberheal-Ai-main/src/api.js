import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const WS_BASE_URL = 'ws://localhost:8000';

export function useLogs() {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initial fetch
    axios.get(`${API_BASE_URL}/api/logs`)
      .then(res => {
        if (res.data && res.data.data) {
          setLogs(res.data.data);
        }
      })
      .catch(err => console.error("Error fetching logs:", err));

    // WebSocket connection
    const ws = new WebSocket(`${WS_BASE_URL}/ws`);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'LOG_UPDATE' && message.data) {
          setLogs(prev => {
            const combined = [...message.data, ...prev];
            // unique by Id and TimeCreated
            const unique = combined.filter((v,i,a)=>a.findIndex(t=>(t.Id === v.Id && JSON.stringify(t.TimeCreated) === JSON.stringify(v.TimeCreated)))===i);
            return unique.slice(0, 100);
          });
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { logs, isConnected };
}

export function useCommanderState() {
  const [commanderState, setCommanderState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/commander/state`)
        .then(res => {
          if (res.data && res.data.data) {
            setCommanderState(res.data.data);
          }
        })
        .catch(err => console.error("Error fetching commander state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { commanderState };
}

export function useScribeState() {
  const [scribeState, setScribeState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/scribe/status`)
        .then(res => {
          if (res.data && res.data.logs) {
            setScribeState(res.data.logs);
          }
        })
        .catch(err => console.error("Error fetching scribe state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { scribeState };
}

export function useReflectiveLearningState() {
  const [rlmState, setRlmState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/reflective_learning/status`)
        .then(res => {
          if (res.data) {
            setRlmState(res.data);
          }
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
          if (res.data) {
            setMemoryState(res.data);
          }
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
          if (res.data && res.data.data) {
            setAnalyticsData(res.data.data);
          }
        })
        .catch(err => console.error("Error fetching analytics data:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 10000); // Fetch every 10s
    return () => clearInterval(interval);
  }, []);

  return { analyticsData };
}

export function useNotificationState() {
  const [notificationState, setNotificationState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/notification/status`)
        .then(res => {
          if (res.data) {
            setNotificationState(res.data);
          }
        })
        .catch(err => console.error("Error fetching notification state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000); // Fetch every 5s
    return () => clearInterval(interval);
  }, []);

  return { notificationState };
}

export function useReportState() {
  const [reportState, setReportState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/report/status`)
        .then(res => {
          if (res.data) {
            setReportState(res.data);
          }
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
          if (res.data) {
            setIdentityState(res.data);
          }
        })
        .catch(err => console.error("Error fetching identity state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { identityState };
}

export function useMonitorState() {
  const [monitorState, setMonitorState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/monitor/status`)
        .then(res => {
          if (res.data) {
            setMonitorState(res.data);
          }
        })
        .catch(err => console.error("Error fetching monitor state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  return { monitorState };
}

export function useGlobalAgentState() {
  const [globalState, setGlobalState] = useState(null);

  useEffect(() => {
    const fetchState = () => {
      axios.get(`${API_BASE_URL}/api/agents/global_status`)
        .then(res => {
          if (res.data) {
            setGlobalState(res.data);
          }
        })
        .catch(err => console.error("Error fetching global agent state:", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, []);

  return { globalState };
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
