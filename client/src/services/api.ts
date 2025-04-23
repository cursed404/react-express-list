import axios from 'axios';
import { Item, State } from '../types';

const API_BASE = '';

const api = axios.create({
  baseURL: API_BASE + '/api'
});

export const fetchItems = (page: number, filter: string, sort: boolean) =>
  api.get<{ data: Item[] }>('/items', { params: { page, pageSize: 20, filter, sort } });

export const postSelect = (id: number, selected: boolean) =>
  api.post('/items/select', { id, selected });

export const postOrder = (order: number[]) =>
  api.post('/items/order', { order });

export const fetchState = () =>
  api.get<State>('/items/state');
