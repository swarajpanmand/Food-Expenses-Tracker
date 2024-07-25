import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/App.css'

const Summary = ({refreshKey}) => {
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
                console.log('Daily Summary Data:', dailyResponse.data);
    
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

    return (
        <div className="summary">
            <h2>Expense Summary</h2>
            <div className="summary-container">
            <div className="daily-summary">
                    <h3>Daily Summary (Last 30 Days)</h3>
                    {dailySummary.length > 0 ? (
                        <ul>
                            {dailySummary.map((day) => (
                                <li key={day._id}>
                                    <span>{formatDate(day._id)}</span>
                                    
                                    <span>₹{day.totalCost ? day.totalCost.toFixed(2) : '0.00'}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No daily summary data available.</p>
                    )}
                </div>
                <div className="monthly-summary">
                    <h3>Monthly Category Summary</h3>
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
                </div>
            </div>
        </div>
    );
}

export default Summary