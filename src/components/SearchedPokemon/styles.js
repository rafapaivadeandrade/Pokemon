import styled, { css } from "styled-components/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
export const Item = styled.TouchableOpacity`
  flex: 1;
  background-color: #3e3b47;
  margin: 5px;
  padding-bottom: 50px;
  height: 30px;
  border-radius: 10px;
  width: 30px;
`;
export const ItemLabelSearched = styled.Text`
  width: 130px;
  color: white;
  margin-right: 10px;
  margin-left: 10px;
`;
export const PokemonInfo = styled.Text`
  color: #ff9000;
`;
export const Number = styled.Text`
  color: #666360;
  margin-right: 10px;
  margin-left: 10px;
`;
export const ItemLabel = styled.Text`
  width: 120px;
  color: white;
  margin-right: 10px;
  margin-left: 10px;
`;
export const Image = styled.Image`
  height: 50px;
  width: 50px;
  align-items: center;
  margin-top: -20px;
`;
export const TextInput = styled.TextInput`
  /* color: "#666360",
    height: 50,
    backgroundColor: "#28262E",
    borderRadius: 10,
    width: 300,
    maxWidth: 400,
    paddingHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 0, */
`;
