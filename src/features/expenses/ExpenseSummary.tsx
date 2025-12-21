import type { Expense } from "../../models/Expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  if(total <= 0) return;

  return (
    <p>
      Total Expenses: <strong>Rs. {total}</strong>
    </p>
  );
};

export default ExpenseSummary;
