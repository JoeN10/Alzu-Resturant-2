import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { INITIAL_MENU_ITEMS } from '../data/initialMenu';
import { CourseId, MenuItem } from '../types/menu';

interface MenuContextValue {
  items: MenuItem[];
  addMenuItem: (input: Omit<MenuItem, 'id' | 'createdAt'>) => void;
  removeMenuItem: (id: string) => void;
  clearMenu: () => void;
  getItemsByCourse: (course: CourseId | 'all') => MenuItem[];
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  const addMenuItem = (input: Omit<MenuItem, 'id' | 'createdAt'>) => {
    const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    setItems((prevItems) => [
      ...prevItems,
      {
        ...input,
        id: generateId(),
        createdAt: Date.now(),
      },
    ]);
  };

  const removeMenuItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearMenu = () => {
    setItems([]);
  };

  const getItemsByCourse = (course: CourseId | 'all') => {
    if (course === 'all') {
      return items;
    }

    return items.filter((item) => item.course === course);
  };

  const value = useMemo<MenuContextValue>(
    () => ({
      items,
      addMenuItem,
      removeMenuItem,
      clearMenu,
      getItemsByCourse,
    }),
    [items],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = (): MenuContextValue => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};

