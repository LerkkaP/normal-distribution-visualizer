import { CardProps } from "../types";

const Card: React.FC<CardProps> = ({ label, value, selectedArea, handleCardClick, children }) => {
    const isSelected = selectedArea === value;
  
    return (
      <div
        className={`options__item ${isSelected ? 'selected' : ''}`}
        onClick={() => handleCardClick(value)}
        style={{
          border: isSelected ? '2px solid blue' : '1px solid gray',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        <div>{label}</div>
        {children}
      </div>
    );
  };
  
  export default Card;