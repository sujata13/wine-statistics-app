import React, { Component } from 'react';
import './App.css';
import wineData from './wineData.json';
import { calculateStatistics } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: calculateStatistics(wineData),
    };
  }

  render() {
    const { flavanoidsStats, gammaStats } = this.state.statistics;
    return (
      <div className="App">
        <h1>Wine Data Statistics</h1>
  
        {/* Flavanoids Statistics */}
        <h2>Flavanoids Statistics</h2>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(flavanoidsStats).map((alcoholClass) => (
                <th key={alcoholClass}>Class {alcoholClass}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Mean', 'Median', 'Mode'].map((measure) => (
              <tr key={measure}>
                <td>{measure}</td>
                {Object.keys(flavanoidsStats).map((alcoholClass) => (
                  <td key={alcoholClass}>{flavanoidsStats[alcoholClass][measure].toFixed(3)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Gamma Statistics */}
        <h2>Gamma Statistics</h2>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(gammaStats).map((alcoholClass) => (
                <th key={alcoholClass}>Class {alcoholClass}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Mean', 'Median', 'Mode'].map((measure) => (
              <tr key={measure}>
                <td>{measure}</td>
                {Object.keys(gammaStats).map((alcoholClass) => (
                  <td key={alcoholClass}>{gammaStats[alcoholClass][measure].toFixed(3)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;
