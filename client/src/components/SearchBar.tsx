import React from 'react';

interface Props { onSearch(term: string): void; }

export const SearchBar: React.FC<Props> = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Поиск..."
    onChange={e => onSearch(e.target.value)}
    style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
  />
);