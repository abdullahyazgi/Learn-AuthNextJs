import { Typography } from "@mui/material";
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const setColors = () => {
    if(type === "error") return "bg-red-100 text-red-900 border-red-200";
    return "bg-green-100 text-green-900 border-green-200";
  } 
  return (
    <Typography component="div" className={`rounded-md text-sm p-2 flex items-center my-1 border ${setColors()}`}>
      {type === "error" ? (
        <BsExclamationTriangle className="me-1" />
      ) : (
        <BsCheckCircle className="me-1" />
      )}
      {message}
    </Typography>
  );
};

export default Alert;
