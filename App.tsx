
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ColumnConfig, DataRecord } from './types';
import { createMockDataset } from './mockData';
import DataColumn from './components/DataColumn';
import { ChevronRight, LayoutGrid, Database, Activity, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [columns] = useState<ColumnConfig[]>(() => createMockDataset());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  // Relational Logic: Find all connected nodes
  const highlightedIds = useMemo(() => {
    if (!activeId) return new Set<string>();
    
    const ids = new Set<string>([activeId]);
    const queue = [activeId];
    const visited = new Set<string>([activeId]);

    // Simple 2-hop search for relational context
    let depth = 0;
    while (queue.length > 0 && depth < 2) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const currentId = queue.shift()!;
        // Find the record in any column
        for (const col of columns) {
          const rec = col.records.find(r => r.id === currentId);
          if (rec) {
            rec.connections.forEach(connId => {
              if (!visited.has(connId)) {
                visited.add(connId);
                ids.add(connId);
                queue.push(connId);
              }
            });
          }
        }
      }
      depth++;
    }
    return ids;
  }, [activeId, columns]);

  const toggleCollapse = useCallback((colId: string) => {
    setCollapsedIds(prev => {
      const next = new Set(prev);
      if (next.has(colId)) next.delete(colId);
      else next.add(colId);
      return next;
    });
  }, []);

  const handleItemClick = useCallback((id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-900/20">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-100">Industrial Graph Matrix</h1>
            <p className="text-xs text-slate-500 font-medium">Relational Data Engine v2.4.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-500" /> System: Nominal</div>
            <div className="flex items-center gap-1.5"><LayoutGrid className="w-4 h-4 text-blue-500" /> Active Nodes: {highlightedIds.size}</div>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </header>

      {/* Grid Container */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden flex relative scroll-smooth bg-[radial-gradient(circle_at_50%_50%,#0f172a,0,#020617_100%)]">
        {/* Connection visualization overlay could be here */}
        
        {columns.map((col) => (
          <DataColumn
            key={col.id}
            config={col}
            isCollapsed={collapsedIds.has(col.id)}
            onToggleCollapse={() => toggleCollapse(col.id)}
            activeId={activeId}
            highlightedIds={highlightedIds}
            onItemClick={handleItemClick}
          />
        ))}
      </main>

      {/* Footer Info */}
      <footer className="h-8 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-slate-500">
        <div className="flex gap-4">
          <span>Schema: Rail_Manufacturing_V4</span>
          <span>Region: EMEA-North</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>Streaming Data Sync Active</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
