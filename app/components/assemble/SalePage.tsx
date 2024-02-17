'use client'

import React, { createContext, useState, useEffect } from 'react';
import ListItems from '../combine/ListItems'
import Cart from '../combine/Cart'

export const DataContext = createContext<any>(null);

const SalePage = () => {

  const [data, setData] = useState<any | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{data, cart, setCart}}>
      <div className="grid grid-cols-2">
        <ListItems />
        <Cart />
      </div> 
    </DataContext.Provider>
    
  )
}

export default SalePage
