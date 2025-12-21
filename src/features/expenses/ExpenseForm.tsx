import { useState } from "react";

const ExpenseForm = ({ onAddExpense }: any) => {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

   const handleSubmit = (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
    if (!form.title) {
      alert("Title is required.");
      return;
    }
    if (!form.amount) {
      alert("Amount is required.");
      return;
    }
    
    if (!form.category) {
      alert("Category is required.");
      return;
    }

    if (!form.date) {
      alert("Date is required.");
      return;
    }

    onAddExpense({
      id: crypto.randomUUID(),
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });

     // Reset form
    handleReset();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        <input  name="date" type="date" value={form.date} onChange={handleChange}/>
        <button type="submit">Add Expense</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
      </form>
    </>
  );
};

export default ExpenseForm;