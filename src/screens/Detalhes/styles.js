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

// export const ProgressView = styled.View`
//   /* color: white; */
//   height: 20px;
//   width: 70%;
// `;

// async function fetchSpecificPokemon(id) {
//   let _pokemonData = await Promise.all(
//       fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//       .then(response => response.json())
//       .then(data => setSpecificPokemon(data))
//   )
//   return new Promise((resolve, reject) => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//       .then((res) => res.json())
//       .then((data) => resolve(data));
//   });
