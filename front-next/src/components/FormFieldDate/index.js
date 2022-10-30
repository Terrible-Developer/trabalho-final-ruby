import { useState } from "react";
import * as Styled from "./styles";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const FormFieldDate = ({
  label,
  name,
  register,
  error,
  defaultValue = '',
  setValueFormState = () => {},
}) => {
  const [value, setValue] = useState(() => {
    setValueFormState(name, defaultValue);
    return defaultValue;
  });
  
  //registerLocale('pt', pt)

  const updateDate = (e) => {
    setValue(e.target.value);
    setValueFormState(name, e.target.value);
  };
  

  return (
    <Styled.Wrapper>
      <Styled.Label>{label ?? ''}:</Styled.Label>
      <Styled.Input
        {...register(name)}
        value={value}
        onChange={updateDate}
        locale="pt"
        mask="11/11/1111"
        size="10"
      />
      <Styled.ErrorMessage>{error ?? ""}</Styled.ErrorMessage>
    </Styled.Wrapper>
  );
};

export default FormFieldDate;
