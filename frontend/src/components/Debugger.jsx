import { useLocation } from "react-router-dom";

const Debugger = () => {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  return null;
};

export default Debugger;
