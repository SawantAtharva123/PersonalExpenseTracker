import axios from 'axios';

function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    onDelete(); // Refresh the list
  };

  return (
    <div className="card">
      <h3>History</h3>
      <ul className="list">
        {transactions.map(t => (
          <li key={t._id} className={t.amount < 0 ? 'minus' : 'plus'}>
            {t.text} (<i>{t.category}</i>) 
            <span>${Math.abs(t.amount)}</span>
            <button onClick={() => handleDelete(t._id)} className="delete-btn">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
