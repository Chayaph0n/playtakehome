'use client'

import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { PaymentContext } from './Payment';

const SeasonalPay = () => {

    const { setDiscount, setTotal, pricesTotal } = useContext(PaymentContext);

    const [every, setEvery] = useState<number>(0);
    const [dis, setDis] = useState<number>(0);
    const [limit, setLimit] = useState<boolean>(false);

    const changeEvery = (event: ChangeEvent<HTMLInputElement>) => {
        const inputEvery = event.target.value;
        const amountValue = inputEvery ? parseFloat(inputEvery) : 0;
        setEvery(amountValue);
    }

    const changeDis = (event: ChangeEvent<HTMLInputElement>) => {
        const inputDis = event.target.value;
        const amountValue = inputDis ? parseFloat(inputDis) : 0;
        setDis(amountValue);
    }

    const calculateDiscount = () => {
        if (every !== 0 || dis !== 0) {
            const discount = Math.floor(pricesTotal / every) * dis;
            setDiscount(discount);
            setTotal(pricesTotal - discount);
            setLimit((pricesTotal - discount) < 0)
        }
    }

    useEffect(() => {
        calculateDiscount();
    },[every, dis, pricesTotal])

    return (
        <div className='flex items-end gap-4'>
            <div>
                <p>Every</p>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-2.5"
                    placeholder="Every X THB"
                    required
                    onChange={changeEvery}
                />
            </div>
            <div>
                <p>Discount</p>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-2.5"
                    placeholder="Discount Y THB"
                    required
                    onChange={changeDis}
                />
            </div>
            {limit && <p className="text-orange-500 text-md">Exceeds discount limit</p>}
        </div>
    )
}

export default SeasonalPay
