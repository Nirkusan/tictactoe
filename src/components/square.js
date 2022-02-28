import Button from "react-bootstrap/Button";
const Square = ({ value, turn, onClick }) => {
  return (
    <Button
      className="m-1 square"
      onClick={onClick}
      {...((value !== "" || turn === "O") && { disabled: true })}
    >
      {value}
    </Button>
  );
};

export default Square;
