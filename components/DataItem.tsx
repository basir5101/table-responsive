
import React from 'react';
import { DataRecord } from '../types';
import { ChevronRight, Circle, Layers } from 'lucide-react';

interface DataItemProps {
  record: DataRecord;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  anchorColor?: string;
}

const DataItem: React.FC<DataItemProps> = ({
  record,
  isActive,
  isHighlighted,
  onClick,
  anchorColor
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative px-4 py-2 cursor-pointer transition-all duration-200 border-l-2
        ${isActive 
          ? 'bg-slate-800 border-l-sky-500 shadow-inner z-10' 
          : isHighlighted 
            ? 'bg-emerald-500/10 border-l-emerald-500/50' 
            : 'hover:bg-slate-900 border-l-transparent'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            w-1.5 h-1.5 rounded-full transition-all
            ${isActive ? 'bg-sky-400 scale-125 shadow-[0_0_8px_#38bdf8]' : isHighlighted ? 'bg-emerald-400' : 'bg-slate-700 group-hover:bg-slate-500'}
          `} />
          <div className="flex flex-col">
            <span className={`text-xs font-semibold transition-colors ${isActive ? 'text-sky-400' : isHighlighted ? 'text-emerald-300' : 'text-slate-300'}`}>
              {record.label}
            </span>
            <span className="text-[9px] text-slate-500 mono tracking-tighter">
              {record.subtext}
            </span>
          </div>
        </div>
        
        {isActive && (
          <div className="flex items-center gap-1.5">
             <div className="px-1.5 py-0.5 rounded bg-slate-700 text-[8px] font-bold text-slate-300 border border-slate-600">
               MAP
             </div>
             <ChevronRight className="w-3 h-3 text-sky-400" />
          </div>
        )}
      </div>

      {/* Relational Pulse for Highlighted items */}
      {isHighlighted && !isActive && (
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
      )}

      {/* Connection Indicator Pins */}
      {isHighlighted && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none">
          <div className="w-2 h-2 rounded-full border border-emerald-500/50 bg-slate-950 scale-75" />
        </div>
      )}
    </div>
  );
};

export default DataItem;
