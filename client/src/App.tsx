import React from 'react';
import { useItems } from './hooks/useItems';
import { SearchBar } from './components/SearchBar';
import { ItemList } from './components/ItemList';

const App: React.FC = () => {
  const { items, hasMore, loadMore, onSearch, onSelect, onDragEnd } = useItems();

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar onSearch={onSearch} />
      <ItemList
        items={items}
        hasMore={hasMore}
        loadMore={loadMore}
        onSelect={onSelect}
        onDragEnd={onDragEnd}
      />
    </div>
  );
};

export default App;