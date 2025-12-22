import { useState } from "react";
 
interface ExpenseFormErrors {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
}
  
const ExpenseForm = ({ onAddExpense }: any) => {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [errors, setErrors] = useState<ExpenseFormErrors>({});

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: ExpenseFormErrors = {};

    if (!form.title) {
      newErrors.title = "Title is required.";
    }
    if (!form.amount) {
      newErrors.amount = "Amount is required."
    }
    
    if (!form.category) {
      newErrors.category = "Category is required.";
    }

    if (!form.date) {
      newErrors.date = "Date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name as keyof ExpenseFormErrors]: undefined }));
  };

  const handleReset = () => {
    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
    setErrors({});
  };

  return (
    <>
 <form className="expense-form" onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <div className="expense-field">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        {errors.title && <span style={{ color: "red", fontSize: "0.75rem" }}>{errors.title}</span>}
      </div>

      <div className="expense-field">
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange}/>
        {errors.amount && <span style={{ color: "red", fontSize: "0.75rem" }}>{errors.amount}</span>}
      </div>

      <div className="expense-field">
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.category && <span style={{ color: "red", fontSize: "0.75rem" }}>{errors.category}</span>}
      </div>

      <div className="expense-field">
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        {errors.date && <span style={{ color: "red", fontSize: "0.75rem" }}>{errors.date}</span>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button type="submit">Add Expense</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
    </>
  );
};

export default ExpenseForm;