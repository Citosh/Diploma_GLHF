import React, { useState } from 'react';
import { Button } from "react-bootstrap";

import './TableEditor.css'; 

const TableEditor = () => {
    const [tableName, setTableName] = useState('Default Name');
    const [editingName, setEditingName] = useState(false);
    const [rows, setRows] = useState([
        { name: '', value: '', date: '' }
    ]);
    const [showPreview, setShowPreview] = useState(false);

    const addRow = () => {
        setRows([...rows, { name: '', value: '', date: '' }]);
    };

    const updateRow = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const deleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const saveTable = () => {
        console.log('Table Saved', { tableName, rows });
        setShowPreview(true);
    };

    const sendTable = () => {
        
        let arr = {value: rows,
        filename: tableName
        }

        console.log(arr)
        setShowPreview(false);
    };

    return (
        <div className='contain'>

            <div style={showPreview ? { filter: 'blur(3px)' } : {}}>
            <div className='profile-h'>
                <h2>Table Editor</h2>
            </div>
                {editingName ? (
                    <div className='d-flex'>
                        <input 
                            className='table-name-input input'
                            value={tableName} 
                            onChange={(e) => setTableName(e.target.value)}
                        />
                        <Button className='table-btn ms-2' onClick={() => setEditingName(false)}>Save Name</Button>
                    </div>
                ) : (
                    <h5 className="h5" onClick={() => setEditingName(true)}>{tableName}</h5>
                )}
                
                {rows.map((row, index) => (
                    <div className ="d-flex mb-2"key={index}>
                        <input 
                            className='table-input'
                            placeholder="Name" 
                            value={row.name} 
                            onChange={(e) => updateRow(index, 'name', e.target.value)}
                        />
                        <input 
                            className='table-input'
                            placeholder="Value"
                            value={row.value}
                            onChange={(e) => updateRow(index, 'value', e.target.value)}
                        />
                        <input 
                            className='table-input'
                            type="date" 
                            value={row.date.split('.').reverse().join('-')}
                            onChange={(e) => updateRow(index, 'date', e.target.value.split('-').reverse().join('.'))}
                        />
                        <Button className='table-btn ms-2' onClick={() => deleteRow(index)}>Delete</Button>
                    </div>
                ))}
                <Button className='table-btn' onClick={addRow}>Add Row</Button>
                <Button className='table-btn ms-2' onClick={saveTable}>Save Table</Button>
            </div>

            {showPreview && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', marginLeft:"50px",padding: '20px', zIndex: '1000', border:'solid 3px #559c64f6', borderRadius:'7px'}}>
                    <h3>Table Preview:</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody >
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.value}</td>
                                    <td>{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button className='table-btn mt-2' onClick={sendTable}>Send</Button>
                    <Button className='table-btn mt-2 ms-2' onClick={() => setShowPreview(false)}>Close Preview</Button>
                </div>
            )}
        </div>
    );
};

export default TableEditor;