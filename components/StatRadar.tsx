
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { CharacterStats } from '../types';

interface StatRadarProps {
  stats: CharacterStats;
  color: string;
}

const StatRadar: React.FC<StatRadarProps> = ({ stats, color }) => {
  const data = [
    { subject: '친절함', A: stats.kindness, fullMark: 100 },
    { subject: '지성', A: stats.intelligence, fullMark: 100 },
    { subject: '운동능력', A: stats.athleticism, fullMark: 100 },
    { subject: '신비로움', A: stats.mysteriousness, fullMark: 100 },
    { subject: '매력', A: stats.charm, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 mt-4 bg-slate-900/50 rounded-xl p-2 backdrop-blur-sm border border-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar
            name="Stats"
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatRadar;
