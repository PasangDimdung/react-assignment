import { useState } from "react";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpenseList from "../features/expenses/ExpenseList";

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const Expenses = () => {
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const handleAddExpense = (expense: Expense) => {
    debugger;
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <section>
      <h2>Expense Tracker</h2>
      <ExpenseForm onAddExpense={handleAddExpense}/>
      <ExpenseList expenses={expenses}/>
    </section>
  );
};

export default Expenses;