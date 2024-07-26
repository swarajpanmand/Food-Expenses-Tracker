// File: client/src/components/Summary.jsx
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/App.css'
import MonthlyExpenseGraph from './MonthlyExpenseGraph'

const Summary = ({ refreshKey, displayMode }) => {
    const [dailySummary, setDailySummary] = useState([]);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchSummaries = async () => {
                try {
                    setIsLoading(true);
                    const dailyResponse = await axios.get('http://localhost:3000/daily-summary');
                    setDailySummary(dailyResponse.data);
        
                    const monthlyResponse = await axios.get('http://localhost:3000/monthly-summary');
                    setMonthlySummary(monthlyResponse.data);
                } catch (error) {
                    console.error('Failed to fetch summaries', error);
                    setError('Failed to load data. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSummaries();
        }, [refreshKey])
    
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return 'Invalid Date';
            }
            return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }
    
        const formatMonth = (monthStr) => {
            const [year, month] = monthStr.split('-');
            return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        }
    
        if (isLoading) return <div className="loading">Loading...</div>;
        if (error) return <div className="error">{error}</div>;
    
        if (displayMode === "daily") {
            return (
                <div className=" daily-summary">
                    <h3>Daily Summary (Last 30 Days)</h3>
                    {dailySummary.length > 0 ? (
                        <ul>
                            {dailySummary.map((day) => (
                                <li key={day._id} className="daily-summary-item">
                                    <span className="date">{formatDate(day._id)}</span>
                                    <span className="total">₹{day.totalCost ? day.totalCost.toFixed(2) : '0.00'}</span>
                                    <div className="hover-details">
                                        <p>Mess: ₹{day.mess ? day.mess.toFixed(2) : '0.00'}</p>
                                        <p>Tiffin: ₹{day.tiffin ? day.tiffin.toFixed(2) : '0.00'}</p>
                                        <p>Junk: ₹{day.junk ? day.junk.toFixed(2) : '0.00'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No daily summary data available.</p>
                    )}
                </div>
            );
        }
    

    return (
        <div className="summary">
            <h2>Monthly Expense Summary</h2>
            <div className="summary-container">
                <div className="monthly-summary">
                    
                    <div className="monthly-cards">
                        {monthlySummary.map((month) => (
                            <div key={month._id} className="month-card">
                                <h4>{formatMonth(month._id)}</h4>
                                {['mess', 'tiffin', 'junk'].map(category => (
                                    <div key={category} className="expense-item">
                                        <span className="expense-label">{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
                                        <span className="expense-value">
                                             ₹{month[category] && month[category].totalCost ? month[category].totalCost.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                ))}
                                <div className="expense-item total">
                                    <span className="expense-label">Total:</span>
                                    <span className="expense-value">
                                        ₹{month.totalCost ? month.totalCost.toFixed(2) : '0.00'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <MonthlyExpenseGraph data={monthlySummary} />
                </div>
            </div>
        </div>
    );
}

export default Summary