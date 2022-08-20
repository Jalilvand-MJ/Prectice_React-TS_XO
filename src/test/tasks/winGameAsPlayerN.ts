import clickCellSequence from "./clickCells";

export default (who: 1 | 2) => () => {
    const L = who === 1 ? [0, 7, 1, 8, 2] : [3, 0, 6, 1, 7, 2];
    clickCellSequence(...L)();
};
