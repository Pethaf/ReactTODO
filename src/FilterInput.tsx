import React from "react";

export const FilterInput = ({input, changeFilter}) => {
  return <input type="text" value={input} onChange={(e) => changeFilter(e.target.value)} />;
};
