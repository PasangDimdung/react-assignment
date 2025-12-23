import { useState } from "react";
import Input from "../../components/Input";
 
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

  const handleChange = (value: string, name: string) => {
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

      <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} error={errors.title} />

      <Input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} error={errors.amount} />

      <Input name="category" placeholder="Select Category" value={form.category} onChange={handleChange}
        options={[
          { label: "Food", value: "Food" },
          { label: "Travel", value: "Travel" },
          { label: "Shopping", value: "Shopping" },
        ]}
        error={errors.category}
      />

      <Input name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} />

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button type="submit">Add Expense</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
    </>
  );
};

export default ExpenseForm;