'use client'

import React, { createContext, useContext, useState, useEffect, ChangeEvent } from 'react';
import CouponPay from './CouponPay';
import OnTopPay from './OnTopPay';
import SeasonalPay from './SeasonalPay';
import { DataContext } from '../assemble/SalePage';

interface PriceItems {
    price: number;
}

export const PaymentContext = createContext<any>(null);

const Payment: React.FC = () => {
    const { cart } = useContext(DataContext);
    const prices = cart.map((item: PriceItems) => item.price);

    let pricesTotal: number = 0;
    prices.forEach((price: number) => {
        pricesTotal += price;
    });

    const [discountCampaign, setDiscountCampaign] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDiscountCampaign(event.target.value);
        setDiscount(0);
        setTotal(pricesTotal);
    };

    useEffect(() => {
        if (discount !== 0) {
            setTotal(pricesTotal - discount);
        } else {
            setTotal(pricesTotal);
        }
    }, [pricesTotal, discount, cart]);

    return (
        <div className='p-4'>
            <div className='h-44 flex flex-col justify-between'>
                <div>
                    <select
                        className="block w-44 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleSelectChange}
                    >
                        <option value="">Discount Campaigns</option>
                        <option value="Coupon">Coupon</option>
                        <option value="Ontop">On Top</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    <PaymentContext.Provider value={{ discount, setDiscount, total, setTotal, pricesTotal }}>
                        {discountCampaign === 'Coupon' && <CouponPay />}
                        {discountCampaign === 'Ontop' && <OnTopPay />}
                        {discountCampaign === 'Seasonal' && <SeasonalPay />}
                    </PaymentContext.Provider>
                </div>
                <div className='flex items-baseline justify-between'>
                    <div className='flex items-baseline gap-4'>
                        <p className='text-sm text-gray-500'>Discount : </p>
                        <h1 className='text-xl font-medium text-gray-500'>{discount} THB</h1>
                    </div>
                    <div className='flex items-baseline gap-4'>
                        <p className='text-sm text-gray-500'>Initial : </p>
                        <h1 className='text-xl font-medium text-gray-500'>{pricesTotal} THB</h1>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className='flex gap-5 items-baseline justify-end'>
                <p className='text-xl'>Total : </p>
                <h1 className='text-2xl font-medium'>{total} THB</h1>
            </div>

        </div>
    );
};

export default Payment;