import styled, { css } from "styled-components/native";

export const ProgressDone = styled.View`
  background-color: orange;
  border-radius: 10px;
  height: 100%;
  width: ${(props) => (props.width ? props.width + "%" : 0 + "%")};
  align-items: flex-end;
  justify-content: center;
`;

export const Progress = styled.View`
  background-color: #dbdbdb;
  height: 20px;
  width: 70%;
  align-self: center;
  border-radius: 10px;
  margin-top: 10px;
`;
