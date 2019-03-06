import React from 'react';


const Winner = ({ mostIsolatedCountry }) => {
    return (
        <div className={'winner'}>Most isolated country is { mostIsolatedCountry }</div>
    )
}

export default Winner;