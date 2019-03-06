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

  // functions to detect most isolated

  getMissionsByCountry = (missions) => {
    let missionsByCountry = {};
    if(missions){
      for(let mission of missions) {
        if (missionsByCountry[ mission.country ] instanceof Array) {
          missionsByCountry[ mission.country ].push(mission);
        } else {
          missionsByCountry[ mission.country ] = [ mission ];
        }
      }
    }
    
    return missionsByCountry;
  }

  getIsolatedAgents = (missions) => {
    const agentCounter = {};  
    const isolatedAgents = [];

    // map all agents to a counter object to see which are isolated
    for (let mission of missions) {
      if (agentCounter[mission.agent]){
        agentCounter[mission.agent] ++;
      }
      else {
        agentCounter[mission.agent] = 1;
      }
    }
    
    // get all isolated agents from the agents map
    for (let agent in agentCounter) {
      if (agentCounter[agent] === 1) {
        isolatedAgents.push(agent);
      }
    }
    return isolatedAgents;
  }

  // check which country has the biggest intersection with the isolated agents array

  getMostIsolated = (missions) => {
    const missionsBycountry = this.getMissionsByCountry(missions);
    const isolatedAgents = this.getIsolatedAgents(missions);
    let countyWinnerBoard = {};
   
    for (let country in missionsBycountry) {        
        for (let mission in missionsBycountry[country]){
          if (isolatedAgents.indexOf(missionsBycountry[country][mission].agent) > -1) {
            if (countyWinnerBoard[country]){
              countyWinnerBoard[country] ++;
            }
            else {
              countyWinnerBoard[country] = 1
            }
          }
        }        
    }

    let winner; 
    if (Object.keys(countyWinnerBoard).length > 0){
      winner =  Object.keys(countyWinnerBoard).reduce((a, b) => countyWinnerBoard[a] > countyWinnerBoard[b] ? a : b);
    }

    return winner;
  }

  render () {
    const { missions, loaded } = this.state;
    
    return (
      <div>
        {loaded ? <ResultsTable listOfResults={ missions }/> : '...'}
        <Winner mostIsolatedCountry = {this.getMostIsolated(missions)} />
      </div>
    )
  }
}

export default MainView;
