import cellTextIs from "./cellTextIs";

export default () => () => {
    for (let i = 0; i < 9; i++) cellTextIs(i, "")();
};
