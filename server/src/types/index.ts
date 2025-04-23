export interface Item { id: number; }
export interface PageParams { page: number; pageSize: number; filter: string; sort: boolean; }
export interface State { order: number[]; selected: number[]; }