'use client'

import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { PaymentContext } from './Payment';

const CouponPay: React.FC = () => {

    const { setDiscount, setTotal, pricesTotal } = useContext(PaymentContext)

    const [discountRule, setDiscountRule] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [activeInput, setActiveInput] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(false);

    const handleRuleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDiscountRule(event.target.value);
        setDiscount(0);
    };

    const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const inputAmount = event.target.value;
        const amountValue = inputAmount ? parseFloat(inputAmount) : 0;
        setAmount(amountValue);
        setActiveInput('amount');
    }

    const changePercentage = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPercentage = event.target.value;
        const percentageValue = inputPercentage ? parseFloat(inputPercentage) : 0;
        setPercentage(percentageValue);
        setActiveInput('percentage');
    }

    const calTotal = (amount: number, percentage: number, pricesTotal: number) => {
        let total: number = pricesTotal;
        let discount: number = 0;
    
        if (activeInput === 'amount') {
            total = pricesTotal - amount;
            discount = amount;
        } else if (activeInput === 'percentage') {
            discount = pricesTotal * percentage / 100;
            total = pricesTotal - discount;
        }
    
        setDiscount(discount);
        setTotal(total);
        setLimit(total < 0);
    }    

    useEffect(() => {
        calTotal(amount, percentage, pricesTotal);
    }, [activeInput, amount, percentage, pricesTotal]);

    return (
        <div>
            <div className='flex gap-4'>
                <select
                    className="block w-44 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleRuleChange}
                >
                    <option value="">Discount Rules</option>
                    <option value="Amount">Amount</option>
                    <option value="Percentage">Percentage</option>
                </select>
                {discountRule === 'Amount' && (
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-2.5"
                        placeholder="Amount"
                        required
                        onChange={changeAmount}
                    />
                )}
                {discountRule === 'Percentage' && (
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
                )}
            </div>
            {limit && <p className="text-orange-500 text-md mt-3">Exceeds discount limit</p>}
        </div>
    );
};

export default CouponPay;
