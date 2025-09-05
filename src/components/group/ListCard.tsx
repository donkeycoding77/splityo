import { useState, useEffect } from 'react';

export interface ListItem {
  id: string;
  text: string;
  status: 'unchecked' | 'checked' | 'crossed';
}

export interface ListSection {
  subtitle: string;
  items: ListItem[];
}

export interface List {
  id: string;
  title: string;
  sections: ListSection[];
  created_at: string;
}

interface ListCardProps {
  list: List;
  onUpdateList: (updatedList: List) => void;
  onEditList: (list: List) => void;
}

export default function ListCard({ list, onUpdateList, onEditList }: ListCardProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [draggedItem, setDraggedItem] = useState<{sectionIndex: number, itemIndex: number} | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

  // Prevent body scroll during drag operations
  useEffect(() => {
    if (draggedItem) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [draggedItem]);

  const addItem = (sectionIndex: number) => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      text: '',
      status: 'unchecked',
    };

    const updatedList = { ...list };
    updatedList.sections[sectionIndex].items.push(newItem);
    onUpdateList(updatedList);
    setEditingItem(newItem.id);
    setEditingText('');
  };

  const updateItem = (sectionIndex: number, itemIndex: number, text: string) => {
    const updatedList = { ...list };
    updatedList.sections[sectionIndex].items[itemIndex].text = text;
    onUpdateList(updatedList);
    setEditingItem(null);
  };

  const deleteItem = (sectionIndex: number, itemIndex: number) => {
    const updatedList = { ...list };
    updatedList.sections[sectionIndex].items.splice(itemIndex, 1);
    onUpdateList(updatedList);
  };

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const updatedList = { ...list };
    const currentStatus = updatedList.sections[sectionIndex].items[itemIndex].status;
    
    // Cycle through: unchecked -> checked -> crossed -> unchecked
    const nextStatus = currentStatus === 'unchecked' ? 'checked' : 
                      currentStatus === 'checked' ? 'crossed' : 'unchecked';
    
    updatedList.sections[sectionIndex].items[itemIndex].status = nextStatus;
    onUpdateList(updatedList);
  };

  const moveItem = (fromSection: number, fromIndex: number, toSection: number, toIndex: number) => {
    const updatedList = { ...list };
    const [movedItem] = updatedList.sections[fromSection].items.splice(fromIndex, 1);
    updatedList.sections[toSection].items.splice(toIndex, 0, movedItem);
    onUpdateList(updatedList);
  };

  const handleDragStart = (e: React.DragEvent, sectionIndex: number, itemIndex: number) => {
    setDraggedItem({ sectionIndex, itemIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSectionIndex: number, targetItemIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { sectionIndex: fromSection, itemIndex: fromIndex } = draggedItem;
    
    // Don't move if it's the same position
    if (fromSection === targetSectionIndex && fromIndex === targetItemIndex) {
      setDraggedItem(null);
      return;
    }
    
    // Adjust target index if dropping after the dragged item
    let adjustedTargetIndex = targetItemIndex;
    if (fromSection === targetSectionIndex && fromIndex < targetItemIndex) {
      adjustedTargetIndex = targetItemIndex - 1;
    }
    
    moveItem(fromSection, fromIndex, targetSectionIndex, adjustedTargetIndex);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Touch event handlers for mobile drag and drop
  const handleTouchStart = (e: React.TouchEvent, sectionIndex: number, itemIndex: number) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setDraggedItem({ sectionIndex, itemIndex });
    setDragOffset(0);
    
    // Don't prevent default here - let normal touch work until we detect drag intent
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartY || !draggedItem) return;
    
    // Always prevent default to stop page scrolling
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartY;
    setDragOffset(deltaY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggedItem || !touchStartY) {
      setDraggedItem(null);
      setTouchStartY(null);
      setDragOffset(0);
      return;
    }

    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - touchStartY;
    
    // Only reorder if moved significantly (more than 20px)
    if (Math.abs(deltaY) > 20) {
      const { sectionIndex: fromSection, itemIndex: fromIndex } = draggedItem;
      
      // Calculate target index based on movement direction
      let targetIndex = fromIndex;
      if (deltaY > 0) {
        // Moving down
        targetIndex = Math.min(fromIndex + 1, list.sections[fromSection].items.length - 1);
      } else {
        // Moving up
        targetIndex = Math.max(fromIndex - 1, 0);
      }
      
      if (targetIndex !== fromIndex) {
        moveItem(fromSection, fromIndex, fromSection, targetIndex);
      }
    }
    
    setDraggedItem(null);
    setTouchStartY(null);
    setDragOffset(0);
  };

  return (
    <div className="w-full max-w-md card shadow-2xl mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-blue-500">{list.title}</h2>
        <button
          onClick={() => onEditList(list)}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          title="Edit list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      {list.sections.length === 0 ? (
        <p className="text-gray-400 text-center py-4 text-lg font-semibold">No sections yet</p>
      ) : (
        <div className="space-y-4">
          {list.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-800">{section.subtitle}</h3>
                <button
                  onClick={() => addItem(sectionIndex)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Add item"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {section.items.length === 0 ? (
                <p className="text-gray-400 text-sm ml-4">No items yet</p>
              ) : (
                <ul className="space-y-1 ml-4 touch-none">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={item.id} 
                      className={`px-2 py-1 cursor-move hover:bg-gray-50 rounded transition-colors select-none ${
                        draggedItem?.sectionIndex === sectionIndex && draggedItem?.itemIndex === itemIndex 
                          ? 'opacity-50 bg-blue-50 transform scale-105 shadow-lg' 
                          : ''
                      }`}
                      style={{
                        transform: draggedItem?.sectionIndex === sectionIndex && draggedItem?.itemIndex === itemIndex 
                          ? `translateY(${dragOffset}px)` 
                          : 'none'
                      }}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', '');
                        handleDragStart(e, sectionIndex, itemIndex);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('bg-blue-50');
                        handleDragOver(e);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('bg-blue-50');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('bg-blue-50');
                        handleDrop(e, sectionIndex, itemIndex);
                      }}
                      onDragEnd={(e) => {
                        e.currentTarget.classList.remove('bg-blue-50');
                        handleDragEnd();
                      }}
                      onTouchStart={(e) => handleTouchStart(e, sectionIndex, itemIndex)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="flex items-center gap-2 group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(sectionIndex, itemIndex);
                          }}
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            item.status === 'checked'
                              ? 'bg-green-500 border-green-500 text-white'
                              : item.status === 'crossed'
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {item.status === 'checked' && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {item.status === 'crossed' && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>

                        {editingItem === item.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  updateItem(sectionIndex, itemIndex, editingText);
                                } else if (e.key === 'Escape') {
                                  setEditingItem(null);
                                }
                              }}
                              onBlur={() => {
                                if (editingText.trim()) {
                                  updateItem(sectionIndex, itemIndex, editingText);
                                } else {
                                  setEditingItem(null);
                                }
                              }}
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              autoFocus
                            />
                            <button
                              onClick={() => updateItem(sectionIndex, itemIndex, editingText)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-1">
                            <span
                              className={`flex-1 text-sm cursor-pointer ${
                                item.status === 'checked' 
                                  ? 'font-bold text-gray-800' 
                                  : item.status === 'crossed'
                                  ? 'line-through text-gray-500'
                                  : 'text-gray-800'
                              }`}
                              onClick={() => {
                                setEditingItem(item.id);
                                setEditingText(item.text);
                              }}
                            >
                              {item.text || 'Click to add text'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteItem(sectionIndex, itemIndex);
                              }}
                              className="text-red-400 hover:text-red-600 transition-colors"
                              title="Delete item"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
