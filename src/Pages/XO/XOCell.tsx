import React from "react";
import {playerCode} from "./XO";

type XOCellProps = {
    type: playerCode | "empty" | "finished",
    children: React.ReactNode,
    onClick: () => void
}

export default function XOCell (props: XOCellProps) {
    return (
        <p
            className={`m-2 rounded-md flex items-center justify-center text-7xl truncate ${{
                "empty": "bg-white",
                "finished": "bg-gray-300",
                "p1": "bg-green-100 text-green-700",
                "p2": "bg-orange-100 text-orange-700"
            }[props.type]}`}
            data-testid="game-cell"
            onClick={props.onClick}>
            {props.children}
        </p>
    );
}
