import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpenseList from "../features/expenses/ExpenseList";
import ExpenseSummary from "../features/expenses/ExpenseSummary";
import ExpenseFilter from "../features/expenses/ExpenseFilter";
import { useExpenses } from "../context/ExpenseContext";

const Expenses = () => {
  
    const { expenses, addExpense, filters, setCategoryFilter, setDateFilter, resetFilters } = useExpenses();


  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = !filters.category || expense.category === filters.category;
    const matchDate = !filters.date || expense.date === filters.date;
    return matchCategory && matchDate;
  });

  return (
    <section>
      <h2>Expense Tracker</h2>
      <ExpenseFilter category={filters.category} date={filters.date} onCategoryChange={setCategoryFilter} onDateChange={setDateFilter} onReset={resetFilters}/>
      <ExpenseForm onAddExpense={addExpense}/>
      <ExpenseList expenses={filteredExpenses}/>
      <ExpenseSummary expenses={filteredExpenses}/>
    </section>
  );
};

export default Expenses;