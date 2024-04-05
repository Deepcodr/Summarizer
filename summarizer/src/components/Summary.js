import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './gradient.css';

function Summary() {
    //state for storing fetched summaries
    const [savedSummaries, setSavedSummaries] = useState([]);

    //handle for fetching saved summaries
    const fetchSummaries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetch-summaries');
            setSavedSummaries(response.data.summaries);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSummaries();
    }, []);

    //handle for deleting summary
    const deleteSummary = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete-summary/${id}`);
            fetchSummaries();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='display-1 text-light'>Summarizer</h1>
            <Link className='btn btn-dark' to="/generate">Generate Summary</Link>
            <div className='container'>
                {savedSummaries.length > 0 && (
                    <div>
                        <ul>
                            {savedSummaries.map((item, index) => (
                                <div className='border border-danger m-4 rounded bg-dark text-light p-3' key={index}>
                                    <strong>Summary {index + 1}</strong><br></br>
                                    {item.summary}
                                    <br></br>
                                    <button className='btn btn-danger m-2' onClick={() => deleteSummary(item._id)}>Delete</button>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Summary;
