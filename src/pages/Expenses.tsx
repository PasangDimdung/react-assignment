import { useState } from "react";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpenseList from "../features/expenses/ExpenseList";
import type { Expense } from "../models/Expense.type";
import ExpenseSummary from "../features/expenses/ExpenseSummary";
import ExpenseFilter from "../features/expenses/ExpenseFilter";

const Expenses = () => {
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory =
      categoryFilter === "" || expense.category === categoryFilter;

    const matchDate =
      dateFilter === "" || expense.date === dateFilter;

    return matchCategory && matchDate;
  });

  const resetFilters = () => {
    setCategoryFilter("");
    setDateFilter("");
  };

  return (
    <section>
      <h2>Expense Tracker</h2>
      <ExpenseFilter category={categoryFilter} date={dateFilter} onCategoryChange={setCategoryFilter} onDateChange={setDateFilter} onReset={resetFilters}/>
      <ExpenseForm onAddExpense={handleAddExpense}/>
      <ExpenseList expenses={filteredExpenses}/>
      <ExpenseSummary expenses={filteredExpenses}/>
    </section>
  );
};

export default Expenses;