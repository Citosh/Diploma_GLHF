import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getTablesName, getTableDataByName, deleteTable } from '../http/userAPI';
import { Button } from "react-bootstrap";
import ConfirmationModal from './ConfirmationModal';

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
        color: isSelected ? 'white' : '#333'
    }),
};

const AllTables = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                
                setTables(formattedData);
            } catch (error) {
                console.error("Error fetching table names:", error);
            }
        };
    
        fetchData();
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTableChange = async (selectedOption) => {
        setSelectedTable(selectedOption);
        try {
            const response = await getTableDataByName(selectedOption.value);
            const tableArray = JSON.parse(response.data);
            setTableData(tableArray); 
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    const handleConfirmAction = async () => {
        if (selectedTable) {
            try {
                const status = await deleteTable(selectedTable.value);
                if (status === 200) {
                    const newTables = tables.filter(table => table.value !== selectedTable.value);
                    setTables(newTables);
                    setTableData([]);
                    setSelectedTable(null);
                }
            } catch (error) {
                console.error("Error deleting the table:", error);
            }
        }
    };

    return (
        <div className='contain'>
            <div className='profile-h'>
                <h3>Select a Table</h3>
            </div>
            
            <Select
                classNamePrefix="react-select"
                placeholder="Select a table..."
                options={tables}
                onChange={handleTableChange}
                isSearchable={true}
                styles={customStyles}
                value={selectedTable}
            />

            {selectedTable && tableData.length > 0 && (
                <Button variant="danger" className="mt-3" onClick={handleShowModal}>
                    Drop Table
                </Button>
            )}

            {tableData && tableData.length > 0 && (
                <table className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.value}</td>
                                <td>{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ConfirmationModal
                show={showModal}
                handleClose={handleCloseModal}
                confirmAction={handleConfirmAction}
            />
        </div>
    );
};

export default AllTables;





