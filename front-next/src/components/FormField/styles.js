import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1%;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const Input = styled.input`
  padding: 15px;
  width: 100%;
  outline: none;
  height: 50px;
  border: 0;
  background-color: #2e2e2c;
  border-radius: 8px;
  color: gray;

  &&checking {
    padding-left: 15px;
    color: red;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;