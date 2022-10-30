import { useState } from "react";
import * as Styled from './styles';

const FormFieldSelect = ({
  options,
  label,
  name,
  register,
  firstValue,
  error,
  defaultValue = -1,
  setValueFormState = () => {},
}) => {
  const [value, setValue] = useState(() => {
    const newVal = defaultValue;
    setValueFormState(name, defaultValue);
    return newVal;
  });

  const onChange = (e) => {
    setValue(e.target.value);
    setValueFormState(name, e.target.value);
    console.log(e.target.value)
  }

  return (
    <Styled.Wrapper>
      <Styled.Label>{label ?? ''}:</Styled.Label>
      <Styled.Select
        {...register(name)}
        value={value}
        onChange={onChange}
      >
        <option value={-1} disabled>{firstValue}</option>
        {options}
      </Styled.Select>
      <Styled.ErrorMessage>{error ?? ""}</Styled.ErrorMessage>
    </Styled.Wrapper>
  );
};

export default FormFieldSelect;
