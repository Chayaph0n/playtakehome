import React from 'react'
import AddButton from '../build/AddButton';

interface CardProps {
  name: string;
  price: number;
  category: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, price, category, image}) => {

  return (
    <div className='w-full h-[350px] border rounded-xl shadow-md flex flex-col'>
        <img className='rounded-t-xl h-4/6 border' src={image} alt={name} />
        <div className='h-3/6 py-2 px-3'>
          <p className='text-center font-semibold text-xl pb-2 pt-1'>{name}</p>
          <p className='text-base text-center'>${price}</p>
        </div>
        <AddButton 
          name={name} 
          price={price} 
          category={category}
          image={image}
        />
    </div>
  )
}

export default Card
