import { useContext } from "react";
export const FilterInput = () => {
  return <input type="text" value={input} onChange={(e) => changeFilter(e.target.value)} />;
};
