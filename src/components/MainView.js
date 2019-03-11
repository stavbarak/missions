import React, { Component } from 'react';
// import _ from 'underscore';
import ResultsTable from './ResultsTable';
import Winner from './Winner';

class MainView extends Component {
   constructor(props){
    super(props);
    this.state = {
      missions: [],
      loaded: false
    }
  }
  componentWillMount = () => {
    const FETCH_URL = this.props.baseURL;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        missions: json,
        loaded: true
      })
    })
    .catch(err => {
          console.log(err)
      })   
  }

  mapIsolatedAgentsToCountries = (missions) => {
    // map all agents
    const agentsMap = {};

    for (let mission of missions) {
      if(agentsMap[mission.agent]) {
        agentsMap[mission.agent].push(mission.country);
      }
      else {
        agentsMap[mission.agent] = [mission.country];
      }
    }

    // remove non-isolated agents
    for (let agent in agentsMap) {
      if (agentsMap[agent].length > 1) {
        delete agentsMap[agent];
      }
    }

    return agentsMap;
  }

  getMostIsolatedCountry(missions) {
    const countryCounter = {};
    const agentsMap = this.mapIsolatedAgentsToCountries(missions);

    for (let agent in agentsMap) {
      let country = agentsMap[agent][0];
      if (countryCounter[country]) {
        countryCounter[country] ++;
      }
      else {
        countryCounter[country] = 1;
      }     
    }

    let winner; 
    if (Object.keys(countryCounter).length > 0){
      winner =  Object.keys(countryCounter).reduce((a, b) => 
      countryCounter[a] > countryCounter[b] ? a : b);
    }

    return winner;
  }


  render () {
    const { missions, loaded } = this.state;
    return (
      <div>
        {loaded ? <ResultsTable listOfResults={ missions }/> : '...'}
        <Winner mostIsolatedCountry = {this.getMostIsolatedCountry(missions)} />
      </div>
    )
  }
}

export default MainView;
