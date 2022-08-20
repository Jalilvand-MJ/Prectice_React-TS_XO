import renamePlayerN from "../actions/renamePlayerN";

export default (who: 1 | 2, to: string) => () => {
    renamePlayerN(who, to);
};
