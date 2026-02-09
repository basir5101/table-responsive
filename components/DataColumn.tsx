
import React, { useMemo } from 'react';
import { ColumnConfig } from '../types';
import DataItem from './DataItem';
import { Maximize2, Minimize2, ChevronDown, Filter } from 'lucide-react';

interface DataColumnProps {
  config: ColumnConfig;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeId: string | null;
  highlightedIds: Set<string>;
  onItemClick: (id: string) => void;
}

const DataColumn: React.FC<DataColumnProps> = ({
  config,
  isCollapsed,
  onToggleCollapse,
  activeId,
  highlightedIds,
  onItemClick
}) => {
  // Simple "Virtualization" Mock: In a real app we'd use react-window or intersection observer.
  // For this prototype, we'll just render them but mention the logic.
  const records = config.records;

  return (
    <div 
      className={`
        relative h-full border-r border-slate-800 transition-all duration-500 ease-in-out flex flex-col
        ${config.isAnchor ? 'sticky left-0 z-20 shadow-2xl shadow-black/50 bg-slate-900/95' : 'bg-slate-950/40'}
        ${isCollapsed ? 'w-16 min-w-[4rem]' : 'w-[280px] min-w-[280px]'}
      `}
    >
      {/* Column Header */}
      <div className={`
        flex items-center justify-between px-4 py-3 border-b-2 bg-slate-900/80 backdrop-blur sticky top-0 z-10
        ${config.color || 'border-slate-700'}
      `}>
        {!isCollapsed ? (
          <>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider truncate">{config.title}</h3>
              <p className="text-[10px] text-slate-500 font-mono">{records.length} RECORDS</p>
            </div>
            <div className="flex gap-1">
               <button className="p-1.5 hover:bg-slate-800 rounded text-slate-500 transition-colors">
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={onToggleCollapse}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-500 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full pt-2">
            <button 
              onClick={onToggleCollapse}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="h-48 flex items-center justify-center">
               <span className="rotate-90 text-[10px] font-bold text-slate-500 whitespace-nowrap uppercase tracking-widest origin-center">
                {config.title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {!isCollapsed ? (
          <div className="py-2 flex flex-col gap-0.5">
            {records.map((record) => (
              <DataItem
                key={record.id}
                record={record}
                isActive={activeId === record.id}
                isHighlighted={highlightedIds.has(record.id)}
                onClick={() => onItemClick(record.id)}
                anchorColor={config.isAnchor ? 'bg-red-500' : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center py-4 gap-1 opacity-40">
            {records.slice(0, 30).map((r) => (
               <div 
                key={r.id} 
                className={`w-1 h-6 rounded-full transition-all duration-300 ${highlightedIds.has(r.id) ? 'bg-emerald-400 scale-x-150 opacity-100' : 'bg-slate-700'}`} 
               />
            ))}
          </div>
        )}
      </div>
      
      {/* Sticky Column Indicator */}
      {config.isAnchor && (
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-red-500/30"></div>
      )}
    </div>
  );
};

export default DataColumn;
