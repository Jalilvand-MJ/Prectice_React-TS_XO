import {fireEvent} from "@testing-library/react";
import getResetButtonElement from "../elements/getResetButtonElement";

export default () => {
    fireEvent.click(getResetButtonElement());
};
