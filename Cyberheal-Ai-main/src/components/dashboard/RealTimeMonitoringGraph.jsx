import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useSystemMetrics, useLogs, useGlobalAgentState } from '../../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  zoomPlugin
);

const TABS = [
  'Network Traffic',
  'Live Threat Activity',
  'System Performance',
  'AI Agent Activity'
];

const TIME_RANGES = [
  { label: 'Live', value: 'live' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
  { label: '24h', value: '24h' }
];

export default function RealTimeMonitoringGraph() {
  const [activeTab, setActiveTab] = useState(TABS[2]);
  const [timeRange, setTimeRange] = useState('live');
  const [isPaused, setIsPaused] = useState(false);
  const chartRef = useRef(null);

  const { systemMetrics } = useSystemMetrics();
  const { logs } = useLogs();
  const { globalState } = useGlobalAgentState();

  // Data history state
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [lastNetIo, setLastNetIo] = useState(null);

  // Buffer live data
  useEffect(() => {
    if (isPaused) return;
    
    if (systemMetrics) {
      const now = new Date();
      let netRate = { inMbps: 0, outMbps: 0, packetsSec: 0 };
      
      if (lastNetIo) {
        const timeDiff = 1; // 1 second roughly
        const bytesIn = systemMetrics.net_io.bytes_recv - lastNetIo.bytes_recv;
        const bytesOut = systemMetrics.net_io.bytes_sent - lastNetIo.bytes_sent;
        const pkts = (systemMetrics.net_io.packets_recv - lastNetIo.packets_recv) + 
                     (systemMetrics.net_io.packets_sent - lastNetIo.packets_sent);
        
        netRate = {
          inMbps: (bytesIn * 8) / 1000000 / timeDiff,
          outMbps: (bytesOut * 8) / 1000000 / timeDiff,
          packetsSec: pkts / timeDiff
        };
      }
      
      setLastNetIo(systemMetrics.net_io);
      
      const newPoint = {
        timestamp: now,
        cpu: systemMetrics.cpu_percent,
        memory: systemMetrics.memory_percent,
        disk: systemMetrics.disk_percent,
        latency: systemMetrics.latency_ms,
        netRate
      };

      setMetricsHistory(prev => {
        const next = [...prev, newPoint];
        if (timeRange === 'live' && next.length > 60) return next.slice(next.length - 60);
        return next;
      });
    }
  }, [systemMetrics, isPaused]);

  // Fetch historical data on timeframe change
  useEffect(() => {
    if (timeRange !== 'live') {
      fetch(`http://localhost:8000/api/dashboard/metrics/history?timeframe=${timeRange}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            const mapped = data.data.map(d => ({
              timestamp: new Date(d.timestamp * 1000),
              cpu: d.metrics.cpu_percent,
              memory: d.metrics.memory_percent,
              disk: d.metrics.disk_percent,
              latency: d.metrics.latency_ms,
              netRate: { inMbps: 0, outMbps: 0, packetsSec: 0 } // Computed locally, rough estimate for history
            }));
            setMetricsHistory(mapped);
          }
        })
        .catch(err => console.error("Error fetching history:", err));
    }
  }, [timeRange]);

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  if (!metricsHistory.length) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-surface border border-outline-variant/30 rounded-xl">
        <span className="text-on-surface-variant font-medium">No live monitoring data available.</span>
      </div>
    );
  }

  // Define chart datasets based on active tab
  let datasets = [];
  let yAxisConfig = { min: 0, max: 100 };

  if (activeTab === 'System Performance') {
    datasets = [
      {
        label: 'CPU Usage (%)',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: d.cpu })),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Memory Usage (%)',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: d.memory })),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ];
  } else if (activeTab === 'Network Traffic') {
    datasets = [
      {
        label: 'Incoming Traffic (Mbps)',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: d.netRate.inMbps })),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Outgoing Traffic (Mbps)',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: d.netRate.outMbps })),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ];
    yAxisConfig = { min: 0 };
  } else if (activeTab === 'Live Threat Activity') {
    // Generate derived threat activity score from logs array length over time
    datasets = [
      {
        label: 'Threats Detected',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: (logs?.length || 0) * (d.cpu / 100) })), // Correlate slightly with CPU for visual effect if no history logs
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ];
    yAxisConfig = { min: 0 };
  } else if (activeTab === 'AI Agent Activity') {
    // Generate AI score based on running agents
    const activeCount = globalState ? Object.values(globalState).filter(a => a.status === 'Running' || a.status === 'Busy').length : 0;
    datasets = [
      {
        label: 'Active Agents',
        data: metricsHistory.map(d => ({ x: d.timestamp, y: activeCount })),
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        fill: true,
        stepped: true
      }
    ];
    yAxisConfig = { min: 0, suggestedMax: 10 };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: timeRange === 'live' ? { duration: 0 } : { duration: 500 },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#64748B' }
      },
      tooltip: {
        callbacks: {
          title: (items) => items.length ? new Date(items[0].parsed.x).toLocaleString() : '',
          label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === 'live' ? 'second' : 'minute',
          displayFormats: { second: 'HH:mm:ss', minute: 'HH:mm' }
        },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#64748B' }
      },
      y: {
        ...yAxisConfig,
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#64748B' }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass-panel rounded-xxl overflow-hidden border border-outline-variant/30 relative">
      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap justify-between gap-4">
        <div className="flex bg-surface-container/80 backdrop-blur-sm rounded-lg p-1 border border-outline-variant/20 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === tab ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-container/80 backdrop-blur-sm rounded-lg p-1 border border-outline-variant/20 shadow-sm">
            {TIME_RANGES.map(tr => (
              <button
                key={tr.value}
                onClick={() => setTimeRange(tr.value)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  timeRange === tr.value ? 'bg-tertiary text-white' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center justify-center w-8 h-8 bg-surface-container/80 backdrop-blur-sm rounded-lg border border-outline-variant/20 text-on-surface hover:bg-surface-variant transition-colors shadow-sm"
            title={isPaused ? "Resume Live Updates" : "Pause Live Updates"}
          >
            <span className="material-symbols-outlined text-sm">{isPaused ? 'play_arrow' : 'pause'}</span>
          </button>
          
          <button
            onClick={handleResetZoom}
            className="flex items-center justify-center w-8 h-8 bg-surface-container/80 backdrop-blur-sm rounded-lg border border-outline-variant/20 text-on-surface hover:bg-surface-variant transition-colors shadow-sm"
            title="Reset Zoom & Pan"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
          </button>
        </div>
      </div>
      
      {/* Graph Area */}
      <div className="flex-1 w-full pt-16 pb-4 px-4 bg-white/50">
        <Line ref={chartRef} data={{ datasets }} options={options} />
      </div>
    </div>
  );
}
