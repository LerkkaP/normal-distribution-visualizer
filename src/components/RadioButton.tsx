import { RadioButtonProps } from "../types";

const RadioButton: React.FC<RadioButtonProps> = ({ label, value }) => (
  <div>
      <input type="radio" name="option" value={value} />
      <label htmlFor={value}>{label}</label>
    </div>
  );

export default RadioButton;