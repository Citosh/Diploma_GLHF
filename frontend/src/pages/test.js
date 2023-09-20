import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Test = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [xKey, setXKey] = useState("");
    const [yKey, setYKey] = useState("");
    const [products, setProducts] = useState([]);
    const colors = ["#8884d8", "#82ca9d", "#ffc658"];

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        parseCSV(file);
    };

    const parseCSV = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                const sortedData = result.data
                .filter(item => item.date)
                .sort((a, b) => new Date(a.date.split(".").reverse().join("-")) - new Date(b.date.split(".").reverse().join("-")));
                setData(sortedData);
                setKeys(result.meta.fields);
                const uniqueProducts = [...new Set(result.data.map(item => item.name))];
                setProducts(uniqueProducts);
            },
            header: true
        });
    };

    const uniqueNames = [...new Set(data.map(item => item.name))];
    useEffect(() => {
        const transformedData = {};

        data.forEach(entry => {
            if (!transformedData[entry.date]) {
                transformedData[entry.date] = { date: entry.date };
            }
            transformedData[entry.date][entry.name] = entry.value;
        });

        setChartData(Object.values(transformedData));
    }, [data]);

    return (
        <div>
            <h3>Upload your CSV file</h3>
            <input type="file" accept=".csv" onChange={handleFileUpload} />

            {keys.length > 0 && (
                <div>
                    <select onChange={(e) => setXKey(e.target.value)}>
                        <option value="">Select X-axis</option>
                        {keys.map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <select onChange={(e) => setYKey(e.target.value)}>
                        <option value="">Select Y-axis</option>
                        {keys.map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                </div>
            )}

            {data.length > 0 && (
                <div>
                    <h3>Graph from CSV Data</h3>
                    <LineChart width={600} height={300} data={chartData}>
                        {uniqueNames.map((name, index) => (
                            <Line key={name} type="monotone" dataKey={name} stroke={colors[index % colors.length]} />
                        ))}
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey={xKey} />
                        <YAxis domain={[0, 1000]}/>
                        <Tooltip />
                    </LineChart>
                </div>
            )}
        </div>
    );
};

export default Test;