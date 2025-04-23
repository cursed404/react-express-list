import { useState, useEffect } from 'react';
import { fetchItems, postSelect, postOrder, fetchState } from '../services/api';
import { Item } from '../types';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortEnabled, setSortEnabled] = useState<boolean | null>(null); // null = не инициализировано

  // Загружаем состояние сортировки один раз при монтировании
  useEffect(() => {
    fetchState().then(() => {
      setSortEnabled(true);
    }).catch(() => {
      setSortEnabled(false); // на случай ошибки
    });
  }, []);

  // Загружаем первую страницу после определения sortEnabled
  useEffect(() => {
    if (sortEnabled === null) return;
    loadMore(0, true);
  }, [sortEnabled]);

  const loadMore = (customPage = page, isFirstLoad = false) => {
    fetchItems(customPage, filter, sortEnabled || false).then(res => {
      const data = res.data.data;
      setItems(prev => isFirstLoad ? data : [...prev, ...data]);
      setPage(prev => customPage + 1);
      if (data.length < 20) setHasMore(false);
    }).catch(() => {
      setHasMore(false); // на случай ошибки запроса
    });
  };

  const onSearch = (term: string) => {
    setFilter(term);
    setItems([]);
    setPage(0);
    setHasMore(true);
    if (sortEnabled !== null) {
      loadMore(0, true);
    }
  };

  const onSelect = (id: number, selected: boolean) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, selected } : i));
    postSelect(id, selected);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    postOrder(reordered.map(i => i.id));
  };

  return {
    items,
    hasMore,
    loadMore: () => loadMore(), 
    onSearch,
    onSelect,
    onDragEnd,
  };
}
