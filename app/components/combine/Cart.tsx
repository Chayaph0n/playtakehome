import React from 'react'
import TableItems from '../build/TableItems'
import Payment from './Payment'


const Cart = () => {

    return (
        <div className='w-full h-full pt-1 pr-4'>
            <h1 className='text-2xl font-extrabold'>CART</h1>
            <div className='mt-1 w-full h-[400px] border rounded-xl shadow-md'>
                <TableItems />
            </div>
            <div className='mt-4 w-full h-[300px] border rounded-xl shadow-md'>
                <Payment />
            </div>
        </div>
    )
}

export default Cart
