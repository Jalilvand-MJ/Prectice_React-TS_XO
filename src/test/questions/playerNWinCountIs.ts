import {expect} from "chai";
import getPlayerNWinCountElement from "../elements/getPlayerNWinCountElement";

export default (who: 1 | 2, count: number) => () => {
    const
        arr = getPlayerNWinCountElement(who).textContent?.split(" ") ?? [],
        value = arr[arr.length - 1];
    expect(parseInt(value ?? "0", 10) ?? 0).to.equal(count);
};
