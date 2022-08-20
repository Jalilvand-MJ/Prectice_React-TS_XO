import React, {useState} from "react";
import XOBoard from "./XOBoard";
import ScoreBoard from "./ScoreBoard";
import PlayerRegister from "./PlayerRegister";
import Banner, {BannerColors} from "../../Partials/Banner";

export type playerCode = "p1" | "p2"
export type gameResult = playerCode | "" | "tie"

export default function XO () {
    const
        [playCount, setPlayCount] = useState(0),
        [result, setResult] = useState<gameResult>(""),
        [banner, setBanner] = useState(false),
        [p1name, setP1name] = useState("X"),
        [p2name, setP2name] = useState("O");

    function getStorageKeyForPlayer (who: playerCode): string {
        return `${{
            "p1": p1name,
            "p2": p2name
        }[who]}-wins`;
    }

    function handleUpdate (r: gameResult) {
        setResult(r);
        if (r === "") return;
        if (r !== "tie") localStorage.setItem(
            getStorageKeyForPlayer(r),
            (parseInt(localStorage.getItem(getStorageKeyForPlayer(r)) ?? "0", 10) + 1).toString());

        setBanner(true);
        setTimeout(
            () => setBanner(false),
            5000);
    }

    function handleReset () {
        setPlayCount(playCount + 1);
        setResult("");
        setBanner(false);
    }

    return (
        <div className="relative h-screen w-full bg-blue-50 flex justify-center gap-4 p-6">
            {banner
                ? <Banner
                    color={{
                        "": "gray",
                        "p1": "green",
                        "p2": "orange",
                        "tie": "gray"
                    }[result] as BannerColors}
                    text={{
                        "": "",
                        "p1": `${p1name} won!`,
                        "p2": `${p2name} won!`,
                        "tie": "Tie ;))"
                    }[result]} />
                : null}
            <XOBoard
                key={playCount}
                onUpdate={handleUpdate}
                p1name={p1name}
                p2name={p2name}
                result={result} />
            <div className="w-96 flex flex-col">
                <ScoreBoard
                    players={[
                        {
                            name: p1name,
                            score: localStorage.getItem(getStorageKeyForPlayer("p1")) ?? "0"
                        },
                        {
                            name: p2name,
                            score: localStorage.getItem(getStorageKeyForPlayer("p2")) ?? "0"
                        }
                    ]} />
                <button
                    className="rounded-md bg-blue-900 text-white m-1 px-3 py-1 font-bold"
                    onClick={handleReset}>
                    RESET
                </button>
                <PlayerRegister
                    players={[
                        {
                            name: p1name,
                            setName: setP1name
                        },
                        {
                            name: p2name,
                            setName: setP2name
                        }
                    ]} />
            </div>
        </div>
    );
}
