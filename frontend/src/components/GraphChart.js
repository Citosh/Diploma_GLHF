import React, { useState } from 'react';
import 'chart.js/auto';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '5px',
        borderColor: state.isFocused ? '#459155f6' : '#dcdce6',
        boxShadow: state.isFocused ? '0 0 5px #173a1ef6' : 'none',
        "&:hover": {
            borderColor: state.isFocused ? '#459155f6' : '#dcdce6'
        }
    }),
    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? '#459155f6' : isFocused ? '#dcdce6' : null,
        color: isSelected ? 'white' : '#333',
    }),
    menu: styles => ({
        ...styles,
        zIndex: 2005
    })
};

const formatChartData = (rawData) => {
    let labels = [...new Set(rawData.map(item => item.date))];
    let datasets = {};

    rawData.forEach(item => {
        if (!datasets[item.name]) {
            datasets[item.name] = {
                label: item.name,
                data: new Array(labels.length).fill(0), 
            };
        }
        const dateIndex = labels.indexOf(item.date);
        datasets[item.name].data[dateIndex] = item.value;
    });

    return {
        labels,
        datasets: Object.values(datasets)
    };
};

const GraphChart = ({ type, data }) => {
    const formattedData = formatChartData(data);

    const [selectedDataset, setSelectedDataset] = useState(null);

    const handleNameChange = (selectedOption) => {
        setSelectedDataset(selectedOption.value);
    };

    const datasetOptions = formattedData.datasets.map(dataset => ({
        value: dataset.label,
        label: dataset.label
    }));

    

    switch (type) {
        case 'линейный':
            return <Line data={formattedData} />;
        case 'столбчастый':
            return <Bar data={formattedData} />;
        case 'круговой':
    const pieData = {
        labels: formattedData.labels,
        datasets: selectedDataset ? [formattedData.datasets.find(dataset => dataset.label === selectedDataset)] : []
    };

    return (
        <>
            <Select
                options={datasetOptions}
                onChange={handleNameChange}
                styles={{
                    ...customStyles,
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
                menuPortalTarget={document.body}
            />
            <Pie data={pieData} />
        </>
    );
        default:
            return null;
    }
};

export default GraphChart;