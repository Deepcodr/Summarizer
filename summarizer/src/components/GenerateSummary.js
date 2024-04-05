import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GenerateSummary(){
    const nav=useNavigate();
    //state for storing text
    const [text, setText] = useState('');
    //state for storing summary
    const [summary, setSummary] = useState('');

    //handle for generating text summary
    const summarizeText = async () => {
        try {
            const response = await axios.post('http://localhost:5000/summarize', { text });
            setSummary(response.data.summary);
        } catch (error) {
            console.error(error);
        }
    };

    //handle for saving generated summary
    const saveSummary = async () => {
        try {
            if (!summary) {
                alert("No summary Generated");
            }
            else {
                const response = await axios.post('http://localhost:5000/save-summary', { text, summary });
                nav('/')   
            }
        } catch (error) {
            console.error(error);
        }
    }

    //route for home page
    const gotoHome = () =>{
        nav('/')
    }

    return (
        <div>
            <h1 className='display-1 text-light m-2'>Generate Summary</h1>
            <div className='container'>
                <textarea
                className='form-control m-4'
                    placeholder="Enter text to summarize"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="8"
                ></textarea>

            </div>
            <div className='container'>
                <button onClick={summarizeText} className='btn btn-dark m-2'>Summarize</button>
                <button className='btn btn-dark m-2' onClick={saveSummary}>Save Summary</button>
                <button className='btn btn-dark m-2' onClick={gotoHome}>View Summaries</button>
            </div>
            <div className='container'>
                {summary && (
                    <div>
                        <h2>Summary:</h2>
                        <p className='text-light'>{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
}