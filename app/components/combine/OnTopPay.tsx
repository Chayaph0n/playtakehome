'use client'

import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import { PaymentContext } from './Payment';
import { DataContext } from '../assemble/SalePage';

interface Item {
    name: string
    price: number
    category: string
    image: string
}

const OnTopPay = () => {

    const { setDiscount, setTotal, pricesTotal } = useContext(PaymentContext);
    const { cart } = useContext(DataContext);

    const [discountRule, setDiscountRule] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [percentage, setPercentage] = useState<number>(0);
    const [point, setPoint] = useState<number>(0);
    const [activeInput, setActiveInput] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(false);

    const handleRuleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDiscountRule(event.target.value);
        setDiscount(0);
        setPercentage(0);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const changePercentage = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPercentage = event.target.value;
        const percentageValue = inputPercentage ? parseFloat(inputPercentage) : 0;
        setPercentage(percentageValue);
        setActiveInput('percentage');
    }

    const changePoint = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPoint = event.target.value;
        const amountValue = inputPoint ? parseFloat(inputPoint) : 0;
        setPoint(amountValue);
        setActiveInput('point');
    }

    const discountCategory = () => {
        if (activeInput === 'percentage') {
            const itemsInCategory = cart.filter((item:Item) => item.category === category);
            const categoryTotal = itemsInCategory.reduce((total:number, item:Item) => total + item.price, 0);
            const discount = categoryTotal * (percentage / 100);
            setDiscount(discount);
            // setTotal(pricesTotal - discount);
            setLimit((pricesTotal - discount) < 0);
        } else if (activeInput === 'point') {
            const discountLimit = pricesTotal * 0.2;
            const discount = Math.min(point, discountLimit);
            setDiscount(discount);
            setTotal(pricesTotal - discount);
            setLimit(point > discountLimit);
        }
    }

    useEffect(() => {
        discountCategory();
    },[category, percentage, point, discountRule, cart, setDiscount])

    return (
        <div>
            <div className='flex gap-4'>
                <select
                    className="block w-44 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleRuleChange}
                >
                    <option value="">Discount Rules</option>
                    <option value="Amount">Amount</option>
                    <option value="Point">Customer Point</option>
                </select>
                {discountRule === 'Amount' && (
                    <div className='flex gap-4'>
                        <select
                            className="block w-44 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            onChange={handleCategoryChange}
                        >
                            <option value="">Category</option>
                            <option value="clothing">Clothing</option>
                            <option value="accessories">Accessories</option>
                            <option value="electronics">Electronics</option>
                        </select>
                        <div className='flex items-center gap-3'>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-2.5"
                                placeholder="Percentage"
                                required
                                onChange={changePercentage}
                            />
                            <p className='text-xl'>%</p>
                        </div>
                    </div>
                )}
                {discountRule === 'Point' && (
                    <div className='flex gap-4 items-end'>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-2.5"
                            placeholder="Point"
                            required
                            onChange={changePoint}
                        />
                    </div>
                )}
            </div>
            {limit && <p className="text-orange-500 text-sm mt-4">Exceeds discount limit</p>}
        </div>
    )
}

export default OnTopPay
