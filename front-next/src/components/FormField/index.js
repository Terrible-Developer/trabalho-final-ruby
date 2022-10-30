import { useEffect, useState } from "react";
import * as Styled from "./styles";

const FormField = ({
  label,
  name,
  register,
  error,
  defaultValue = "",
  setValueFormState = () => {},
}) => {
  const [value, setValue] = useState(() => {
    const newVal = defaultValue;
    return newVal;
  });

  const onChange = (e) => {
    setValue(e.target.value);
    setValueFormState(name, e.target.value);
  }

  return (
    <Styled.Wrapper>
      <Styled.Label>{label ?? ''}:</Styled.Label>
      <Styled.Input
        value={value}
        {...register(name)}
        onChange={onChange}
      />
      <Styled.ErrorMessage>{error ?? ""}</Styled.ErrorMessage>
    </Styled.Wrapper>
  );
};

export default FormField;
