import React from "react";
import {render} from "@testing-library/react";
import XO from "../Pages/XO/XO";
import User from "./lib/User";
import getCellElement from "./elements/getCellElement";
import clickCells from "./tasks/clickCells";
import resetBoard from "./tasks/resetBoard";
import renamePlayerN from "./tasks/renamePlayerN";
import winGameAsPlayerN from "./tasks/winGameAsPlayerN";
import cellTextIs from "./questions/cellTextIs";
import playerNWinCountIs from "./questions/playerNWinCountIs";
import cellIsOwnedByPlayerN from "./questions/cellIsOwnedByPlayerN";
import boardIsEmpty from "./questions/boardIsEmpty";
import playerNNameIs from "./questions/playerNNameIs";

function randInt (max = 9) {
    return Math.floor(Math.random() * max);
}

function randPermutation () {
    const
        A = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        B = [];
    while (A.length > 0) {
        const i = randInt(A.length);
        B.push(A[i]);
        A.splice(i, 1);
    }
    return B;
}

function getCellText (i: number) {
    return getCellElement(i).textContent ?? "";
}

describe("XO", () => {
    let user: User;
    beforeEach(() => {
        user = new User("MohammadJavad");
        render(<XO />);
    });

    it("toggles cell on click", async () => {
        const
            randomCells = randPermutation();
        await user
            .attemptsTo(clickCells(randomCells[0]))
            .expectsTo(cellIsOwnedByPlayerN(randomCells[0], 1))
            .run();
        await user
            .attemptsTo(clickCells(randomCells[0]))
            .expectsTo(cellIsOwnedByPlayerN(randomCells[0], 1))
            .run();
        // Ignore click on filled cell
        await user
            .attemptsTo(clickCells(randomCells[1]))
            .expectsTo(cellIsOwnedByPlayerN(randomCells[1], 2))
            .run();
        // Wrong click doesn't change turn
    });

    it("ignores click after finish", async () => {
        await user
            .attemptsTo(winGameAsPlayerN(1))
            .run();
        const
            i = randInt(),
            value = getCellText(i);
        await user
            .attemptsTo(clickCells(i))
            .expectsTo(cellTextIs(i, value))
            .run();
    });

    it("clears board on reset", async () => {
        const randomCells = randPermutation();
        await user
            .attemptsTo([
                clickCells(...randomCells.slice(0, 4)),
                resetBoard()
            ])
            .expectsTo(boardIsEmpty())
            .run();
    });

    it("players can be renamed and cells rename afterward", async () => {
        const
            randomCells = randPermutation(),
            newName1 = "ali",
            newName2 = "hasan";
        await user
            .attemptsTo(clickCells(randomCells[0], randomCells[1]))
            .run();
        await user
            .attemptsTo([
                renamePlayerN(1, newName1),
                clickCells(randomCells[2])
            ])
            .expectsTo([
                playerNNameIs(1, newName1),
                cellTextIs(randomCells[0], newName1),
                cellTextIs(randomCells[2], newName1)
            ])
            .run();
        await user
            .attemptsTo([
                renamePlayerN(2, newName2),
                clickCells(randomCells[3])
            ])
            .expectsTo([
                playerNNameIs(2, newName2),
                cellTextIs(randomCells[0], newName1),
                cellTextIs(randomCells[1], newName2),
                cellTextIs(randomCells[2], newName1),
                cellTextIs(randomCells[3], newName2)
            ])
            .run();
    });

    it("increases win counter on win", async () => {
        await user
            .attemptsTo(renamePlayerN(1, "ali"))
            .attemptsTo(renamePlayerN(1, "hassan"))
            .run();
        await user
            .expectsTo([
                playerNWinCountIs(1, 0),
                playerNWinCountIs(2, 0)
            ]).run();
        await user
            .attemptsTo(
                winGameAsPlayerN(1))
            .expectsTo([
                playerNWinCountIs(1, 1),
                playerNWinCountIs(2, 0)
            ])
            .run();
        await user
            .attemptsTo([
                resetBoard(),
                winGameAsPlayerN(2)
            ])
            .expectsTo([
                playerNWinCountIs(1, 1),
                playerNWinCountIs(2, 1)
            ])
            .run();
    });

    it("reloads counter on rename", async () => {
        const
            name1 = "ali",
            name2 = "hossein";
        await user
            .attemptsTo(renamePlayerN(1, name1))
            .run();
        await user
            .attemptsTo(winGameAsPlayerN(1))
            .expectsTo(playerNWinCountIs(1, 1))
            .run();
        await user
            .attemptsTo(renamePlayerN(1, name2))
            .expectsTo(playerNWinCountIs(1, 0))
            .run();
        await user
            .attemptsTo([
                resetBoard(),
                winGameAsPlayerN(1)
            ])
            .expectsTo(playerNWinCountIs(1, 1))
            .run();
        await user
            .attemptsTo(renamePlayerN(1, name1))
            .expectsTo(playerNWinCountIs(1, 1))
            .run();
    });
});
