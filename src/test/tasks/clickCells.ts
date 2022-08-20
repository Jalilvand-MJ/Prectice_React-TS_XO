import clickCell from "../actions/clickCell";

export default (...cells: number[]) => () => {
    cells.forEach((c) => clickCell(c));
};
