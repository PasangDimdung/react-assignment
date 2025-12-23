import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import type { Expense } from "../models/Expense.type";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  filters: { category: string; date: string };
  setCategoryFilter: (category: string) => void;
  setDateFilter: (date: string) => void;
  resetFilters: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used within ExpenseProvider");
  return context;
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const addExpense = (expense: Expense) => setExpenses((prev) => [...prev, expense]);
  const resetFilters = () => {
    setCategoryFilter("");
    setDateFilter("");
  };

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      filters: { category: categoryFilter, date: dateFilter },
      setCategoryFilter,
      setDateFilter,
      resetFilters,
    }),
    [expenses, categoryFilter, dateFilter]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
