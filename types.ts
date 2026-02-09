
export interface DataRecord {
  id: string;
  label: string;
  subtext?: string;
  connections: string[]; // IDs of related records in other columns
  metadata?: Record<string, any>;
}

export interface ColumnConfig {
  id: string;
  title: string;
  isAnchor?: boolean;
  color?: string;
  records: DataRecord[];
}

export interface AppState {
  activeId: string | null;
  highlightedIds: Set<string>;
  collapsedColumnIds: Set<string>;
}
