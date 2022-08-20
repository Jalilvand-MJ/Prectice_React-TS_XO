import {screen} from "@testing-library/react";

export default (who: 1 | 2) => <HTMLInputElement>screen.getByLabelText(`Player${who} Name`);
