export function calculateStatistics(data) {
    // Calculate "Gamma" property and statistics for Flavanoids and Gamma
    const gammaStats = calculatePropertyStats(data, 'Gamma');
    const flavanoidsStats = calculatePropertyStats(data, 'Flavanoids');
  
    return { gammaStats, flavanoidsStats };
  }
  
  function calculatePropertyStats(data, property) {
    // Group data by "Alcohol" property to calculate class-wise statistics
    const groupedData = groupDataByClass(data);
  
    // Calculate Mean, Median, and Mode for the property in each class
    const stats = {};
    for (const alcoholClass in groupedData) {
      const values = groupedData[alcoholClass].map((item) => item[property]);
      stats[alcoholClass] = {
        Mean: calculateMean(values),
        Median: calculateMedian(values),
        Mode: calculateMode(values),
      };
    }
  
    return stats;
  }
  
  function groupDataByClass(data) {
    return data.reduce((result, item) => {
      const alcoholClass = item.Alcohol;
      if (!result[alcoholClass]) {
        result[alcoholClass] = [];
      }
      // Calculate "Gamma" property for each data point
      const gamma = (parseFloat(item.Ash) * parseFloat(item.Hue)) / parseFloat(item.Magnesium);
      item.Gamma = gamma;
      result[alcoholClass].push(item);
      return result;
    }, {});
  }
  
  
  function calculateMean(values) {
    // Calculate Mean
    const sum = values.reduce((acc, val) => acc + parseFloat(val), 0);
    return sum / values.length;
  }
  
  function calculateMedian(values) {
    // Calculate Median
    const sortedValues = values.sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (parseFloat(sortedValues[middle - 1]) + parseFloat(sortedValues[middle])) / 2;
    } else {
      return parseFloat(sortedValues[middle]);
    }
  }
  
  function calculateMode(values) {
    // Calculate Mode
    const countMap = {};
    values.forEach((val) => {
      countMap[val] = (countMap[val] || 0) + 1;
    });
    let mode = null;
    let maxCount = 0;
    for (const val in countMap) {
      if (countMap[val] > maxCount) {
        mode = parseFloat(val);
        maxCount = countMap[val];
      }
    }
    return mode;
  }
   