import {fireEvent} from "@testing-library/react";
import getPlayerNNameFieldElement from "../elements/getPlayerNNameFieldElement";

export default (who: 1 | 2, to: string) => {
    fireEvent.change(getPlayerNNameFieldElement(who), {target: {value: to}});
};
