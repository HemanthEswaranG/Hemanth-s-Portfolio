import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { SKILLS } from '../constants';

const SkillsChart: React.FC = () => {
  // Sort skills by level
  const data = [...SKILLS].sort((a, b) => b.level - a.level);

  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white text-center">Technical Proficiency</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 14 }}
            width={100}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ 
              backgroundColor: 'var(--tooltip-bg, #1e293b)', 
              borderColor: 'var(--tooltip-border, #334155)', 
              color: 'var(--tooltip-text, #f8fafc)',
              borderRadius: '8px'
            }}
            wrapperClassName="dark-mode-tooltip"
          />
          <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} // Alternating Indigo and Purple
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Dynamic style hack for Recharts tooltip since it doesn't easily support class based switching without state passing */}
      <style>{`
        html.dark .dark-mode-tooltip .recharts-default-tooltip {
          background-color: #1e293b !important;
          border-color: #334155 !important;
          color: #f8fafc !important;
        }
        html:not(.dark) .dark-mode-tooltip .recharts-default-tooltip {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
          color: #0f172a !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
};

export default SkillsChart;