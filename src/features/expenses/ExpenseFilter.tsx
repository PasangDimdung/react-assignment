type ExpenseFilterProps = {
  category: string;
  date: string;
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
};

const ExpenseFilter = ({
  category,
  date,
  onCategoryChange,
  onDateChange,
  onReset,
}: ExpenseFilterProps) => {
  return (
    <div style={{ marginBottom: "1rem" }} className="expense-filter">
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
      </select>

      <input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} style={{ marginLeft: "10px" }}/>

      <button onClick={onReset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
};

export default ExpenseFilter;