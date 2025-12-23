type InputErrorProps = {
  message?: string;
};

const InputError = ({ message }: InputErrorProps) => {
  if (!message) return null;

  return <span className="expense-errors">{message || "\u00A0"}</span>

};

export default InputError;