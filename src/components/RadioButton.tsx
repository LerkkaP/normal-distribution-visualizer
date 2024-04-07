import { RadioButtonProps } from "../types";

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked  }) => (
  <div>
      <input type="radio" name="option" value={value} defaultChecked={checked}/>
      <label htmlFor={value}>{label}</label>
    </div>
  );

export default RadioButton;