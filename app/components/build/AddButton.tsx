'use client'

import React, { useContext } from 'react'
import { DataContext } from '../assemble/SalePage'

interface ButtonProps {
    name: string;
    price: number;
    category: string;
    image: string;
}

const AddButton: React.FC<ButtonProps> = ({name, price, category, image}) => {

    const {setCart} = useContext(DataContext);

    const addToCart = () => {
        const newItem = { name, price, category, image};
        setCart((prevCart: ButtonProps[]) => [...prevCart, newItem])
    }

    return (
        <button className='bg-blue-500 hover:bg-blue-300 transition-colors duration-300 text-white rounded-b-xl w-full h-20 text-xs cursor-pointer'
        onClick={addToCart}
        >ADD TO CART</button>
    )
}

export default AddButton
