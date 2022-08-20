import cellTextIs from "./cellTextIs";
import getPlayerNNameFieldElement from "../elements/getPlayerNNameFieldElement";

export default (i: number, who: 1 | 2) => () => {
    cellTextIs(i, getPlayerNNameFieldElement(who).textContent ?? "");
};
