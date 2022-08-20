import {expect} from "chai";
import getCellElement from "../elements/getCellElement";


export default (i: number, val: string) => () => {
    expect(getCellElement(i).textContent).to.be.equal(val);
};
