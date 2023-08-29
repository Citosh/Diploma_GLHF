const express = require('express');
const crypto = require('crypto');
const { createObjectCsvStringifier } = require('csv-writer');
const path = require('path');
const fs = require('fs');

class Data_Gen_Controller {

    async gen_ran_data(req,res) {
        
        function generateRandomName() {
            const adjectives = ['Happy', 'Sunny', 'Brave', 'Smart', 'Clever'];
            const nouns = ['Cat', 'Dog', 'Dolphin', 'Elephant', 'Tiger'];
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            return `${randomAdjective} ${randomNoun}`;
        }
  
        function generateRandomEmail() {
            const randomHash = crypto.randomBytes(8).toString('hex');
            return `${randomHash}@example.com`;
        }
                 // Set response headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="random_data.csv"');

        // Generate random data
        const randomData = [];
        const numRecords = 10; // Number of records to generate
        for (let i = 0; i < numRecords; i++) {
          const record = {
            id: i + 1,
            name: generateRandomName(),
            email: generateRandomEmail(),
            age: Math.floor(Math.random() * (80 - 18 + 1)) + 18,
            country: 'Randomland'
          };
          randomData.push(record);
        }
    
        // Create a CSV stringifier
        const csvStringifier = createObjectCsvStringifier({
          header: [
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'age', title: 'Age' },
            { id: 'country', title: 'Country' }
          ]
        });

        // // Pipe the CSV data to the response stream
        // res.write(csvStringifier.getHeaderString());
        // randomData.forEach(item => {
        //   res.write(csvStringifier.stringifyRecords([item]));
        // });

        const csvFilename = 'random_data.csv';
  const csvFilePath = path.join(__dirname, csvFilename);

  // Write CSV data to the file
  const csvStream = fs.createWriteStream(csvFilePath);
  csvStream.write(csvStringifier.getHeaderString());
  randomData.forEach(item => {
    csvStream.write(csvStringifier.stringifyRecords([item]));
  });
  csvStream.end();

  res.send(`CSV file saved as ${csvFilePath}`);
    }


}


module.exports = new Data_Gen_Controller()