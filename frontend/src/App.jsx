import { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data);
    } catch (err) {
       console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Personal Expense Tracker</h1>
      </div>
      <div className="layout">
        <div className="left-panel">
          <TransactionForm onAdd={fetchTransactions} />
        </div>
        <div className="right-panel">
          <TransactionList transactions={transactions} onDelete={fetchTransactions} />
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
