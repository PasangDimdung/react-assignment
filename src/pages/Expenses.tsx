import { useState } from "react";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpenseList from "../features/expenses/ExpenseList";
import type { Expense } from "../models/Expense";
import ExpenseSummary from "../features/expenses/ExpenseSummary";

const Expenses = () => {
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <section>
      <h2>Expense Tracker</h2>
      <ExpenseForm onAddExpense={handleAddExpense}/>
      <ExpenseList expenses={expenses}/>
      <ExpenseSummary expenses={expenses}/>
    </section>
  );
};

export default Expenses;