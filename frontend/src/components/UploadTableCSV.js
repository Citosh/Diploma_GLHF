import React, { useState } from 'react';
import Papa from 'papaparse';
import './TableEditor.css'; 
import { Button } from "react-bootstrap";
import { sendUserTable } from '../http/userAPI';

const UploadTableCSV = () => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);  
        parseCSV(file);
    };

    const parseCSV = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                const filteredData = result.data.filter(row => row.name && row.value && row.date);
                setData(filteredData);
            },
            header: true
        });
    };

    const handleSubmit = async () => {
        try {
            let datas = {
                fileObj: data,
                fileName: fileName.split('.')[0]
            }
           const response = await sendUserTable(datas);
           if(response?.status == 200)
            alert("aaaaaa")
            else
            alert(`${response.response.data.message}`)
        } catch (error) {
            alert("There was an error sending the table:", error.message);
        }
    };

    return (
        <div className='contain'>
            <div className='profile-h'>
                <h2>Upload your CSV file</h2>
            </div>
            
            <div className='mb-4 mt-3'>
                <input 
                    id="fileInput"
                    style={{ display: 'none' }}
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileUpload} 
                />
                <label htmlFor="fileInput" className="upload-btn">
                    Upload CSV
                </label>
            </div>
            
            {data.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Values</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.value}</td>
                                    <td>{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button className = "table-btn mt-4 mb-4" onClick={handleSubmit}>Send Table</Button>
                </>
            )}
        </div>
    );
};

export default UploadTableCSV;