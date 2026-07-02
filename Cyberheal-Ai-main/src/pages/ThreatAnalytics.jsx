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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    primary: '#004ac6',
    secondary: '#00687a',
    tertiary: '#006242',
    error: '#ba1a1a',
    surface: '#f7f9fb',
    outline: '#c3c6d7'
  };

  const lineData = {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [{
        label: 'Ransomware',
        data: [12, 19, 15, 25, 22, 30, 24, 28],
        borderColor: colors.primary,
        backgroundColor: 'rgba(0, 74, 198, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
    }, {
        label: 'Phishing',
        data: [45, 52, 38, 48, 60, 55, 42, 50],
        borderColor: colors.secondary,
        backgroundColor: 'rgba(0, 104, 122, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
    }]
  };

  const pieData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
        data: [12, 28, 45, 15],
        backgroundColor: [colors.error, colors.primary, colors.secondary, colors.outline],
        borderWidth: 0,
        hoverOffset: 10
    }]
  };

  const barData = {
    labels: ['DDoS', 'Malware', 'Social Eng.', 'MITM', 'Zero Day', 'Credential Stuffing'],
    datasets: [{
        label: 'Incidents',
        data: [120, 190, 85, 45, 15, 110],
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

  return (
    <EnterpriseLayout>
      <main className="p-margin-mobile md:p-margin-desktop space-y-stack-lg max-w-[1440px]">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Threat Analytics</h2>
            <p className="text-body-lg text-on-surface-variant mt-2">Real-time vector analysis and predictive anomaly detection across enterprise nodes.</p>
          </div>
          <div className="flex items-center gap-stack-sm">
            <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg flex items-center gap-2 text-body-md font-medium hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined text-[20px]" data-icon="calendar_today">calendar_today</span>
              Last 30 Days
            </button>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-lg flex items-center gap-2 text-body-md font-medium shadow-sm hover:translate-y-[-1px] transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]" data-icon="file_download">file_download</span>
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
                <h3 className="text-display-lg font-display-lg text-primary mt-2">99.8%</h3>
              </div>
              <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg" data-icon="target">target</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
              <span>+0.2% vs last week</span>
            </div>
          </div>

          {/* Mean Time to Respond */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">Mean Response Time</p>
                <h3 className="text-display-lg font-display-lg text-secondary mt-2">12.4<span className="text-headline-sm font-medium">min</span></h3>
              </div>
              <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg" data-icon="timer">timer</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="trending_down">trending_down</span>
              <span>-4min faster than baseline</span>
            </div>
          </div>

          {/* False Positive Rate */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-on-surface-variant font-medium">False Positive Rate</p>
                <h3 className="text-display-lg font-display-lg text-error mt-2">1.02%</h3>
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
                <h3 className="text-display-lg font-display-lg text-tertiary mt-2">4,821</h3>
              </div>
              <span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg" data-icon="smart_toy">smart_toy</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-label-md text-tertiary">
              <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
              <span>+12 new nodes added</span>
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
                <span className="inline-flex items-center gap-2 text-label-md text-on-surface-variant">
                  <span className="w-3 h-3 rounded-full bg-primary"></span> Ransomware
                </span>
                <span className="inline-flex items-center gap-2 text-label-md text-on-surface-variant">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span> Phishing
                </span>
              </div>
            </div>
            <div className="h-[300px]">
              <Line data={lineData} options={xyOptions} />
            </div>
          </div>

          {/* AI Insight Panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9] border-t-2 border-t-secondary-container flex-grow">
              <div className="flex items-center gap-2 text-secondary mb-4">
                <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                <span className="font-headline-sm text-headline-sm">AI Pulse Insights</span>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Anomalous traffic detected in <span className="font-bold text-on-surface">Cluster 7-Beta</span>. Pattern correlates with historical Zero-Day attempts in the Q3 window. 
              </p>
              <div className="mt-4 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
                <p className="text-label-md font-bold text-secondary">RECOMMENDATION</p>
                <p className="text-body-md mt-1 italic">"Initiate sandbox isolation for all incoming API calls from Regional Node AX-4."</p>
              </div>
              <button className="mt-6 w-full py-2 bg-secondary text-on-secondary rounded-lg font-medium text-body-md hover:bg-on-secondary-container transition-all">
                Execute Automated Response
              </button>
            </div>

            {/* Small Severity Pie Chart */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-[#F1F5F9]">
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-4">Severity Distribution</h4>
              <div className="h-[180px] flex items-center justify-center">
                <Doughnut data={pieData} options={pieOptions} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-label-md">
                  <span className="w-2 h-2 rounded-full bg-error"></span> Critical (12%)
                </div>
                <div className="flex items-center gap-2 text-label-md">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> High (28%)
                </div>
                <div className="flex items-center gap-2 text-label-md">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Medium (45%)
                </div>
                <div className="flex items-center gap-2 text-label-md">
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span> Low (15%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Threats by Attack Type (Bar) */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-[#F1F5F9]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Common Attack Vectors</h4>
              <button className="text-primary text-label-md font-bold hover:underline">View All vectors</button>
            </div>
            <div className="h-[240px]">
              <Bar data={barData} options={xyOptions} />
            </div>
          </div>

          {/* Recent Alerts List */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-[#F1F5F9]">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-6">Live Threat Feed</h4>
            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
              <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                <div className="flex-grow">
                  <p className="text-body-md font-bold">Brute-force SSH Attempt</p>
                  <p className="text-label-md text-on-surface-variant">IP: 192.168.1.104 • Just now</p>
                </div>
                <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-grow">
                  <p className="text-body-md font-bold">SQL Injection Blocked</p>
                  <p className="text-label-md text-on-surface-variant">Main Database Cluster • 4m ago</p>
                </div>
                <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <div className="flex-grow">
                  <p className="text-body-md font-bold">Unusual Geo-login</p>
                  <p className="text-label-md text-on-surface-variant">User: j_smith_dev • 12m ago</p>
                </div>
                <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                <div className="flex-grow">
                  <p className="text-body-md font-bold">API Rate Limit Warning</p>
                  <p className="text-label-md text-on-surface-variant">External API Gateway • 28m ago</p>
                </div>
                <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
              </div>
            </div>
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
          <p className="text-label-md text-on-surface-variant">All threat vectors are up to date.</p>
        </div>
        <button className="ml-4 text-on-surface-variant hover:text-primary" onClick={() => setShowToast(false)}>
          <span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
        </button>
      </div>
    </EnterpriseLayout>
  );
}
