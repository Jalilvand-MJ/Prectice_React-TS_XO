import getCellElement from "../elements/getCellElement";
import userEvent from "@testing-library/user-event";

export default (i: number) => {
    userEvent.click(getCellElement(i));
};
