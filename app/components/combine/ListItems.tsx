'use client'

import CardItem from './CardItem';
import { useContext } from 'react';
import { DataContext } from '../assemble/SalePage'

const ListItems = () => {
  const { data } = useContext(DataContext);

  return (
    <div className='w-full h-full px-4'>
      <h1 className='text-2xl font-extrabold mt-1'>PRODUCTS</h1>
      <div className='grid grid-cols-3 py-1 gap-4'>
        {data && data.category &&
          Object.entries(data.category).map(([categoryName, categoryItems]: [string, any]) =>
            Object.entries(categoryItems).map(([itemName, item]: [string, any]) => (
              <CardItem
                key={itemName}
                name={itemName}
                category={categoryName}
                price={item.price}
                image={item.image}
              />
            ))
          )}
      </div>
    </div>
    
  );
};

export default ListItems;
