import React from "react";
import { renderer, act } from "react-test-renderer";

import App from "../../App";
import Pokemons from "../components/Pokemons";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
