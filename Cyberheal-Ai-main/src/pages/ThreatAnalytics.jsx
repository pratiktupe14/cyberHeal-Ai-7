import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useAnalyticsData, executeAutomatedResponse, exportReport } from '../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ThreatAnalytics() {
  const [showToast, setShowToast] = useState(false);
  const [timeframe, setTimeframe] = useState('30d');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const { analyticsData } = useAnalyticsData(timeframe);

  useEffect(() => {
    if (analyticsData) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [analyticsData, timeframe]);

  const colors = {
    primary: '#004ac6',
    secondary: '#00687a',
    tertiary: '#006242',
    error: '#ba1a1a',
    surface: '#f7f9fb',
    outline: '#c3c6d7'
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await executeAutomatedResponse();
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => setIsExecuting(false), 2000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportReport('pdf');
    } catch(err) {
      console.error(err);
    }
    setIsExporting(false);
  };

  const handleTimeframeChange = (val) => {
    setTimeframe(val);
    setShowFilterDropdown(false);
  };

  const getTimeframeLabel = () => {
    switch(timeframe) {
      case 'today': return 'Today';
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      default: return 'Last 30 Days';
    }
  };

  const isEmpty = !analyticsData || analyticsData.threat_analytics.total_historical_incidents === 0;

  const lineData = {
    labels: analyticsData?.threat_analytics?.threats_over_time?.labels || [],
    datasets: (analyticsData?.threat_analytics?.threats_over_time?.datasets || []).map((ds, idx) => ({
        ...ds,
        borderColor: idx === 0 ? colors.primary : (idx === 1 ? colors.secondary : colors.tertiary),
        backgroundColor: idx === 0 ? 'rgba(0, 74, 198, 0.1)' : 'rgba(0, 104, 122, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
    }))
  };

  const pieData = {
    labels: ['Critical', 'High', 'Medium', 'Low', 'Informational'],
    datasets: [{
        data: analyticsData?.threat_analytics?.severity_distribution || [0,0,0,0,0],
        backgroundColor: [colors.error, colors.primary, colors.secondary, colors.outline, '#e2e8f0'],
        borderWidth: 0,
        hoverOffset: 10
    }]
  };

  const barData = {
    labels: analyticsData?.threat_analytics?.threats_over_time?.datasets?.map(d => d.label) || [],
    datasets: [{
        label: 'Incidents',
        data: analyticsData?.threat_analytics?.threats_over_time?.datasets?.map(d => d.data.reduce((a,b)=>a+b,0)) || [],
        backgroundColor: [
            '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#2563eb'
        ],
        borderRadius: 6,
        barThickness: 32
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const xyOptions = {
    ...commonOptions,
    scales: {
        y: { grid: { borderDash: [5, 5] }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
    }
  };

  const pieOptions = {
    ...commonOptions,
    cutout: '70%'
  };

  const renderEmptyState = (height = "h-[300px]") => (
    <div className={`${height} flex flex-col items-center justify-center text-on-surface-variant`}>
      <span className="material-symbols-outlined text-[48px] mb-2 opacity-50" data-icon="query_stats">query_stats</span>
      <p className="text-body-lg font-medium">No analytics data available.</p>
    </div>
  );

  return (
    <EnterpriseLayout>
      <main className="p-margin-mobile md:p-margin-desktop space-y-stack-lg max-w-[1440px]">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Threat Analytics</h2>
            <p className="text-body-lg text-on-surface-variant mt-2">Real-time vector analysis and predictive anomaly detection across enterprise nodes.</p>
          </div>
          <div className="flex items-center gap-stack-sm relative">
            <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg flex items-center gap-2 text-body-md font-medium hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="calendar_today">calendar_today</span>
              {getTimeframeLabel()}
              <span className="material-symbols-outlined text-[20px]" data-icon="arrow_drop_down">arrow_drop_down</span>
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-12 left-0 w-full bg-surface border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden">
                <button onClick={() => handleTimeframeChange('today')} className="w-full text-left px-4 py-2 hover:bg-surface-container text-body-md">Today</button>
                <button onClick={() => handleTimeframeChange('24h')} className="w-full text-left px-4 py-2 hover:bg-surface-container text-body-md">Last 24 Hours</button>
                <button onClick={() => handleTimeframeChange('7d')} className="w-full text-left px-4 py-2 hover:bg-surface-container text-body-md">Last 7 Days</button>
                <button onClick={() => handleTimeframeChange('30d')} className="w-full text-left px-4 py-2 hover:bg-surface-container text-body-md">Last 30 Days</button>
              </div>
            )}

            <button 
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg flex items-center gap-2 text-body-md font-medium shadow-sm hover:translate-y-[-1px] transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="file_download">{isExporting ? 'hourglass_empty' : 'file_download'}</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Accuracy Cards (Hero Stats) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Detection Accuracy */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">Detection Accuracy</p>
                <h3 className="text-display-lg font-display-lg text-primary mt-2">
                    {!analyticsData ? '--' : `${analyticsData.ai_performance.detection_accuracy}%`}
                </h3>
              </div>
              <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg" data-icon="target">target</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="update">update</span>
              <span>Based on true positive rate</span>
            </div>
          </div>

          {/* Mean Time to Respond */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">Mean Response Time</p>
                <h3 className="text-display-lg font-display-lg text-secondary mt-2">
                    {!analyticsData ? '--' : analyticsData.ai_performance.mean_response_time_min}
                    <span className="text-headline-sm font-medium">min</span>
                </h3>
              </div>
              <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg" data-icon="timer">timer</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="update">update</span>
              <span>Average incident resolution time</span>
            </div>
          </div>

          {/* False Positive Rate */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">False Positive Rate</p>
                <h3 className="text-display-lg font-display-lg text-error mt-2">
                    {!analyticsData ? '--' : `${analyticsData.ai_performance.false_positive_rate}%`}
                </h3>
              </div>
              <span className="material-symbols-outlined text-error bg-error/10 p-2 rounded-lg" data-icon="error_outline">error_outline</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]" data-icon="horizontal_rule">horizontal_rule</span>
              <span>Within acceptable limits</span>
            </div>
          </div>

          {/* Agents Active */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">AI Agents Active</p>
                <h3 className="text-display-lg font-display-lg text-tertiary mt-2">
                    {!analyticsData ? '--' : analyticsData.threat_analytics.active_incidents}
                </h3>
              </div>
              <span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg" data-icon="smart_toy">smart_toy</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
              <span>Live active workflows</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Charts */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Main Line Chart: Threats Over Time */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-[#F1F5F9]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Threats Over Time</h4>
                <p className="text-body-md text-on-surface-variant">Aggregated incident frequency across all channels.</p>
              </div>
              <div className="flex gap-2">
                {analyticsData?.threat_analytics?.threats_over_time?.datasets?.map((ds, idx) => (
                    <span key={ds.label} className="inline-flex items-center gap-2 text-label-md text-on-surface-variant">
                      <span className={`w-3 h-3 rounded-full`} style={{backgroundColor: idx === 0 ? colors.primary : (idx === 1 ? colors.secondary : colors.tertiary)}}></span> {ds.label}
                    </span>
                ))}
              </div>
            </div>
            {isEmpty ? renderEmptyState("h-[300px]") : (
                <div className="h-[300px]">
                  <Line data={lineData} options={xyOptions} />
                </div>
            )}
          </div>

          {/* AI Insight Panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] border-t-2 border-t-secondary-container flex-grow">
              <div className="flex items-center gap-2 text-secondary mb-4">
                <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                <span className="font-headline-sm text-headline-sm">AI Pulse Insights</span>
              </div>
              
              {isEmpty ? (
                <p className="text-body-md text-on-surface-variant leading-relaxed">No AI insights available.</p>
              ) : (
                <>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      {analyticsData.threat_analytics.insights}
                    </p>
                    {analyticsData.threat_analytics.most_common_threat && (
                        <div className="mt-4 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
                          <p className="text-label-md font-bold text-secondary">PRIMARY VECTOR</p>
                          <p className="text-body-md mt-1 italic">"{analyticsData.threat_analytics.most_common_threat}"</p>
                        </div>
                    )}
                </>
              )}
              
              <button 
                onClick={handleExecute}
                disabled={isExecuting}
                className="mt-6 w-full py-2 bg-secondary text-on-secondary rounded-lg font-medium text-body-md hover:bg-on-secondary-container transition-all disabled:opacity-50"
              >
                {isExecuting ? 'Executing Workflow...' : 'Execute Automated Response'}
              </button>
            </div>

            {/* Small Severity Pie Chart */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9]">
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-4">Severity Distribution</h4>
              {isEmpty ? renderEmptyState("h-[180px]") : (
                  <>
                      <div className="h-[180px] flex items-center justify-center">
                        <Doughnut data={pieData} options={pieOptions} />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {['Critical', 'High', 'Medium', 'Low', 'Informational'].map((lbl, idx) => {
                            const val = pieData.datasets[0].data[idx];
                            const total = pieData.datasets[0].data.reduce((a,b)=>a+b,0);
                            const perc = total > 0 ? Math.round((val/total)*100) : 0;
                            const bg = [colors.error, colors.primary, colors.secondary, colors.outline, '#e2e8f0'][idx];
                            if(val === 0) return null;
                            return (
                                <div key={lbl} className="flex items-center gap-2 text-label-md">
                                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: bg}}></span> {lbl} ({perc}%)
                                </div>
                            );
                        })}
                      </div>
                  </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Threats by Attack Type (Bar) */}
          <div className="col-span-12 bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-[#F1F5F9]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Common Attack Vectors</h4>
            </div>
            {isEmpty ? renderEmptyState("h-[240px]") : (
                <div className="h-[240px]">
                  <Bar data={barData} options={xyOptions} />
                </div>
            )}
          </div>
        </div>
      </main>

      {/* Micro-interaction Toasts */}
      <div 
        className={`fixed bottom-8 right-8 bg-surface-container-lowest border-l-4 border-primary shadow-xl rounded-lg p-4 flex items-center gap-4 transition-all duration-300 z-[60] ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <span className="material-symbols-outlined text-primary" data-icon="info">info</span>
        </div>
        <div>
          <p className="font-bold text-body-md">Dashboard Synchronized</p>
          <p className="text-label-md text-on-surface-variant">Analytics fetched successfully.</p>
        </div>
        <button className="ml-4 text-on-surface-variant hover:text-primary" onClick={() => setShowToast(false)}>
          <span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
        </button>
      </div>
    </EnterpriseLayout>
  );
}
