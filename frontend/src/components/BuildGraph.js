import React, { useState, useEffect } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './BuildGraph.css';
import Select from 'react-select';
import { getTablesName, getTableDataByName } from '../http/userAPI';
import GraphChart from './GraphChart'

const ResponsiveGridLayout = WidthProvider(Responsive);

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

const BuildGraph = () => {
    const storedCards = JSON.parse(localStorage.getItem("cards") || "[]").map(card => ({
        ...card,
        x: +card.x,
        y: +card.y,
        w: +card.w,
        h: +card.h,
        selectedFile: card.selectedFile || "",
        selectedChartType: card.selectedChartType || ""
    }));
    const [cards, setCards] = useState(storedCards);
    const [selectedFile, setSelectedFile] = useState(localStorage.getItem("selectedFile") || "");
    const [selectedChartType, setSelectedChartType] = useState(localStorage.getItem("selectedChartType") || "");
    const [fileOptions, setFileOptions] = useState([]);
    const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem("tableData") || "[]"));

    const chartTypes = ["линейный", "столбчастый", "круговой"].map(type => ({ value: type, label: type }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTablesName();
                const tableNames = response.data.map(filePath => {
                    const fileNameWithExtension = filePath.split("\\").pop();
                    const fileName = fileNameWithExtension.split(".").slice(0, -1).join(".");
                    return fileName;
                });
                
                const formattedData = tableNames.map(name => ({
                    value: name,
                    label: name
                }));
                
                setFileOptions(formattedData);
            } catch (error) {
                console.error("Error fetching table names:", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedFile", selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        localStorage.setItem("selectedChartType", selectedChartType);
    }, [selectedChartType]);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        localStorage.setItem("tableData", JSON.stringify(tableData));
    }, [tableData]);

    const handleFileChange = (option, cardId) => {
        const updatedCards = cards.map(card => {
            if (card.i === cardId) {
                return { ...card, selectedFile: option.value };
            }
            return card;
        });
        setCards(updatedCards);
        handleTableChange(option);
    };

    const handleChartTypeChange = (option, cardId) => {
        const updatedCards = cards.map(card => {
            if (card.i === cardId) {
                return { ...card, selectedChartType: option.value };
            }
            return card;
        });
        setCards(updatedCards);
    };

    const addCard = () => {
        const newCard = { i: Date.now().toString(), x: 0, y: Infinity, w: 4, h: 15 };
        setCards(prevCards => [...prevCards, newCard]);
    };

    const deleteCard = (id) => {
        const filteredCards = cards.filter(card => card.i !== id);
        setCards(filteredCards);
    }

    const onDragOrResizeStop = (layout) => {
        const updatedCards = cards.map(card => {
            const matchingLayoutItem = layout.find(l => l.i === card.i);
            return {
                ...card,
                ...matchingLayoutItem
            };
        });
        localStorage.setItem("cards", JSON.stringify(updatedCards));
    };

    const handleTableChange = async (selectedOption) => {
        try {
            const response = await getTableDataByName(selectedOption.value);
            const tableArray = JSON.parse(response.data);
            setTableData(tableArray);
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    return (
        <div className='contain'>
            <h2 className='profile-h'>Build Graph</h2>
            <button onClick={addCard} disabled={cards.length >= 10}>Add Card</button>
            <ResponsiveGridLayout 
                className="layout"
                isDraggable={true}
                isResizable={true}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 12, sm: 8, xs: 6, xxs: 4}}
                rowHeight={5}
                onDragStop={onDragOrResizeStop} 
                onResizeStop={onDragOrResizeStop}
            >
            {cards.map(card => (
                <div key={card.i} data-grid={card}>
                    <span 
                        onClick={() => deleteCard(card.i)} 
                        style={{ position: "absolute", top: 0, right: 3, cursor: "pointer" }}
                    >
                        <i className="bi bi-x-lg"></i>
                    </span>

                    {card.selectedFile && card.selectedChartType ? (
                        <GraphChart
                        type = {card.selectedChartType}
                        data = {JSON.parse(localStorage.getItem('tableData'))}
                        ></GraphChart>
                    ) : (
                    <>
                        <Select
                            options={fileOptions}
                            menuPortalTarget={document.body}
                            styles={{
                                ...customStyles,
                                menuPortal: base => ({ ...base, zIndex: 9999 })
                            }}
                            onChange={(option) => handleFileChange(option, card.i)}
                            value={fileOptions.find(option => option.value === card.selectedFile)}
                        />
                        <Select
                            options={chartTypes}
                            menuPortalTarget={document.body}
                            styles={{
                                ...customStyles,
                                menuPortal: base => ({ ...base, zIndex: 9999 })
                            }}
                            onChange={(option) => handleChartTypeChange(option, card.i)}  
                            value={chartTypes.find(option => option.value === card.selectedChartType)} 
                        />
                    </>
            )}
    </div>
))}
            </ResponsiveGridLayout>
        </div>
    );
};

export default BuildGraph;