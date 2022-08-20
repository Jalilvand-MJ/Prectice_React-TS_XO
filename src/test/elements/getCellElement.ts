import {screen} from "@testing-library/react";

export default (i: number) => screen.getAllByTestId("game-cell")[i];
