import React, { useState, useEffect } from 'react';
const Add = (props) => {
    const [buyQuantity, setBuyQuantity] = useState(1);
    const increaseBuyQuantity = () => {
    setBuyQuantity(buyQuantity + 1)
    }

    const decreaseBuyQuantity = () => {
    if (buyQuantity > 1) {
        setBuyQuantity(buyQuantity - 1)
    }
    }
    return (
        
    )
}
export default Add
