interface FilterInputProps {
  input: string;
  changeFilter: (value: string) => void;
}

export const FilterInput = ({ input, changeFilter }: FilterInputProps) => {
  return (
    <input
      autoFocus
      type="text"
      value={input}
      onChange={(e) => changeFilter(e.target.value)}
    />
  );
};
