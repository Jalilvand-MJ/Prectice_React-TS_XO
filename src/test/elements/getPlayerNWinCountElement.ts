import {screen} from "@testing-library/react";

export default (who: 1 | 2) => screen.getByTitle(`Player${who} Wins`);
