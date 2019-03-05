import React from 'react';


const CounterRow = ({ missionsNumber }) => {
    return (
        <div className={'counter-row'}>{missionsNumber} missions</div>
    )
}

export default CounterRow;