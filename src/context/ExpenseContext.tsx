import { createContext, useContext, useState, useMemo, type ReactNode, useEffect } from "react";
import type { Expense } from "../models/Expense.type";
import { useSearchParams } from "react-router-dom";

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
  
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const date = searchParams.get("date") || "";
    setCategoryFilter(category);
    setDateFilter(date);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (categoryFilter) params.set("category", categoryFilter);
    else params.delete("category");

    if (dateFilter) params.set("date", dateFilter);
    else params.delete("date");

    // Only update URL if changed
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true }); 
    }
  }, [categoryFilter, dateFilter, searchParams, setSearchParams]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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
