import React from 'react'
import DeleteButton from './DeleteButton'
import { useContext } from 'react';
import { DataContext } from '../assemble/SalePage';

interface CartItems {
    name: string
    price: number
    category: string
    image: string
}

const TableItems: React.FC = () => {

    const { cart }  = useContext(DataContext);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-2 py-3">
                            
                        </th>                    
                    </tr>
                </thead>
                <tbody>
                {cart && cart.map((item: CartItems, index:number) => (
                        <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50' : 'odd:bg-white'}>
                            <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-4">
                                <img className='w-12 h-12' src={item.image} alt={item.name} />
                                {item.name}
                            </td>
                            <td className="px-6 py-3">{item.category}</td>
                            <td className="px-6 py-3">${item.price}</td>
                            <td className="px-2 py-3">
                                <DeleteButton index={index}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableItems
