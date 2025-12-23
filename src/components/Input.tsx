import InputError from "./InputError";

type Option = {
  label: string;
  value: string;
};

type FormFieldProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  options?: Option[];
  error?: string;
};

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  options,
  error,
}: FormFieldProps) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(e.target.value); 
    };

  return (
    <div className="expense-field">
      {options ? (
        <select name={name} value={value} onChange={handleChange}>
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}

      <InputError message={error} />
    </div>
  );
};

export default Input;