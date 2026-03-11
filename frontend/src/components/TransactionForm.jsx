import { useState } from 'react';
import axios from 'axios';

function TransactionForm({ onAdd }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { text, amount: Number(amount), category };
    
    // Send data to backend
    await axios.post('http://localhost:5000/api/transactions', newTransaction);
    
    // Reset form and UI
    setText('');
    setAmount('');
    onAdd(); // Refresh the list
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add New Transaction</h3>
      <div>
        <label>Description</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
      </div>
      <div>
        <label>Amount (negative for expense, positive for income)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <button type="submit" className="btn">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
