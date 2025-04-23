import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Item } from '../types';

interface Props {
  items: Item[];
  hasMore: boolean;
  loadMore(): void;
  onSelect(id: number, selected: boolean): void;
  onDragEnd(result: DropResult): void;
}

export const ItemList: React.FC<Props> = ({ items, hasMore, loadMore, onSelect, onDragEnd }) => (
  <InfiniteScroll
    dataLength={items.length}
    next={loadMore}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    height={600}
  >
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {prov => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    style={{ display: 'flex', alignItems: 'center', padding: '8px', borderBottom: '1px solid #ccc', ...prov.draggableProps.style }}
                  >
                    <input type="checkbox" checked={item.selected} onChange={e => onSelect(item.id, e.target.checked)} />
                    <span style={{ marginLeft: '8px' }}>{item.id}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </InfiniteScroll>
);