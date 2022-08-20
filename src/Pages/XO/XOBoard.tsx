import React, {useState} from "react";
import XOCell from "./XOCell";
import {playerCode, gameResult} from "./XO";

type cell = playerCode | ""
type XOBoardProps = {
    result: gameResult,
    onUpdate: (r: gameResult) => void,
    p1name: string,
    p2name: string,
}

const winTriples = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkTriple (board: cell[], a: number, b: number, c: number) {
    if (board[a] === board[b] && board[b] === board[c]) return board[a];
    return "";
}

function checkIfWinner (board: cell[]): playerCode | null {
    for (const t of winTriples) {
        const w = checkTriple(board, t[0], t[1], t[2]);
        if (w !== "") return w;
    }
    return null;
}

function checkIfTie (board: cell[]): boolean {
    return !board.some((c) => c === "");
}

function findResult (board: cell[]): gameResult {
    return checkIfWinner(board) ??
        (checkIfTie(board)
            ? "tie"
            : "");
}

function findTurn (board: cell[]) {
    return board.reduce((prev, c) => prev !== (c === ""), false) ? "p1" : "p2";
}

export default function XOBoard (props: XOBoardProps) {
    const
        [board, setBoard] = useState<cell[]>(Array(9).fill(""));

    function toggleCell (index: number) {
        if (props.result !== "" || board[index] !== "") return;
        const newBoard = board.map((c, i) => ((i === index) ? findTurn(board) : c));
        setBoard(newBoard);
        props.onUpdate(findResult(newBoard));
    }

    return (
        <div
            className={`aspect-[1] grid grid-cols-3 grid-rows-3 rounded-md p-2 ${{
                "": "bg-blue-900",
                "p1": "bg-green-900",
                "p2": "bg-orange-900",
                "tie": "bg-gray-900"
            }[props.result]}`}>
            {board.map((c, i) => (
                <XOCell
                    key={i}
                    onClick={() => toggleCell(i)}
                    type={c || (props.result === "" ? "empty" : "finished")}>
                    {{
                        "": "",
                        "p1": props.p1name,
                        "p2": props.p2name
                    }[c]}
                </XOCell>
            ))}
        </div>
    );
}
