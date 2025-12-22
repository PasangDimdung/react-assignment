type InputErrorProps = {
  message?: string;
};

const InputError = ({ message }: InputErrorProps) => {
  if (!message) return null;

  return <span className="expense-errors">{message}</span>;
};

export default InputError;