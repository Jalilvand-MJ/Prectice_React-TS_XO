import {expect} from "chai";
import getPlayerNNameFieldElement from "../elements/getPlayerNNameFieldElement";

export default (who: 1 | 2, val: string) => () => {
    expect(getPlayerNNameFieldElement(who).value ?? "").to.be.equal(val);
};
