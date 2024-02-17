import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../assemble/SalePage';

interface IndexProps {
    index: number
}

interface CartItem {
    name: string
    price: number
    category: string
    image: string
}

const DeleteButton: React.FC<IndexProps> = ({index}) => {

    const {cart, setCart} = useContext(DataContext);

    const handleDeleteItem = (index: number) => {
        const updatedCart = cart.filter((item: CartItem, i: number) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div className='w-5 h-5 bg-red-500 hover:bg-red-300 transition-colors duration-300 rounded-full text-white text-center cursor-pointer'
        onClick={() => handleDeleteItem(index)}>
            -
        </div>
    )
}

export default DeleteButton

