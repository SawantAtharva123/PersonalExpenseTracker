import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  // Calculate totals
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [income, expense],
      backgroundColor: ['#2ecc71', '#e74c3c'],
    }]
  };

  return (
    <div className="card">
      <h3>Income vs Expense</h3>
      <div style={{ width: '250px', margin: '0 auto' }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default ExpenseChart;
