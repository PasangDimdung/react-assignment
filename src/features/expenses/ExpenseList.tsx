const ExpenseList: any = ({ expenses } : any) => {
  if (expenses.length === 0) {
    return <p style={{ textAlign: "center" }}>No expenses added yet.</p>;
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: any) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>Rs. {expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;