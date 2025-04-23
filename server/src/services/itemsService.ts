import { PageParams, State, Item } from '../types';

// Данные в памяти: исходный массив только с полем `id`
const rawItems: { id: number }[] = Array.from(
  { length: 1_000_000 },
  (_, i) => ({ id: i + 1 })
);

// Текущий порядок id и множество выбранных
let order: number[] = rawItems.map(i => i.id);
const selectedSet = new Set<number>();

/**
 * Возвращает страницу элементов с полем `selected`
 */
export function getPage({
  page,
  pageSize,
  filter,
  sort
}: PageParams): Item[] {
  // Фильтрация по строке
  let filtered = filter
    ? rawItems.filter(i => i.id.toString().includes(filter))
    : rawItems;

  // Сортировка по сохранённому order
  if (sort) {
    const rank = Object.fromEntries(order.map((id, idx) => [id, idx]));
    filtered.sort((a, b) => rank[a.id] - rank[b.id]);
  }

  // Пагинация
  const from = page * pageSize;
  const pageItems = filtered.slice(from, from + pageSize);

  // Преобразуем в тип Item (id + selected)
  return pageItems.map(i => ({
    id: i.id,
    selected: selectedSet.has(i.id)
  }));
}

/**
 * Помечает элемент с given id как выбранный/снятый выбор
 */
export function updateSelection(id: number, selected: boolean): void {
  if (selected) {
    selectedSet.add(id);
  } else {
    selectedSet.delete(id);
  }
}

/**
 * Обновляет порядок элементов (массив id)
 */
export function updateOrder(newOrder: number[]): void {
  order = [...newOrder];
}

/**
 * Возвращает текущее состояние порядка и выбранных
 */
export function getState(): State {
  return {
    order,
    selected: Array.from(selectedSet)
  };
}
