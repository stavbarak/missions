import React, { Component } from 'react';
import CounterRow from './CounterRow';

class ResultsTable extends Component {

    renderTableTitles() {
        const { listOfResults } = this.props;
        const titles = Object.keys(listOfResults[0]);
        return (
            titles.map((title, i) => {
                return (
                    <th key={(i)} className={'table-col-name'}>{`${title}`}</th>
                )
            })
        )
    }

    renderTableItems() {
        const { listOfResults } = this.props;
        const itemsByDate = this.getItemsByDate(listOfResults);
        const titles = Object.keys(listOfResults[0]);
        return itemsByDate.map((item, i) => {
            return (
                <tr key={(i)}>
                    {
                        titles.map((title, index) => {
                            return (
                                <td key={(index)} className="table-cell">{item[title]}</td>
                            )
                        })
                     }
                </tr>
            )
        })
    }


    getItemsByDate = (items) => {
        let itemsByDate = [];

        if(items) {
            for(let item of items) {
                itemsByDate.push(item);
                itemsByDate.sort(function(a, b){
                    if (new Date(a.date) > new Date(b.date)) {
                        return 1;
                    }
                        return -1;
                    })
            }
        }   
        return itemsByDate;
    }


    render() {
        const { listOfResults } = this.props;
        return (
            <div className={'table-container'}>
                <table className={'results-table'}>
                    <thead>
                        <tr id={'table-head-row'}> 
                            { this.renderTableTitles() }
                        </tr>                  
                    </thead>
                    <tbody>                  
                            { this.renderTableItems() }                   
                    </tbody>
                    
                </table>  
                <CounterRow missionsNumber={ listOfResults.length } />
            </div>      
        )
    }
}


export default ResultsTable;
