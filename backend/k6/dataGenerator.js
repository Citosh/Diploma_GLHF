const fs = require('fs');

// Function to generate a random date within a specified range
function getRandomDate(start, end) {
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
}

// Function to generate random data object
function generateData() {
  const startDate = new Date(2020, 0, 1); // Start date (e.g., January 1, 2020)
  const endDate = new Date(2021, 11, 31); // End date (e.g., December 31, 2021)

  return {
    date: getRandomDate(startDate, endDate),
    name: `Item${Math.floor(Math.random() * 100)}`,
    quantity: Math.floor(Math.random() * 100),
  };
}

// Function to generate and save data objects in a JSON file
function generateAndSaveData(numObjects, filename) {
  const dataObject = {};

  for (let i = 0; i < numObjects; i++) {
    const newData = generateData();
    dataObject[`Object${i + 1}`] = newData;
  }

  const jsonData = JSON.stringify(dataObject, null, 2);

  fs.writeFileSync(filename, jsonData, 'utf-8');
  console.log(`${numObjects} data objects saved to ${filename}`);
}

// Usage: Generate 10 data objects and save them to "data.json"
generateAndSaveData(1000, 'data.json');
