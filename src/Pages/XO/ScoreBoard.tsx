import React from "react";

type Player = {
    name: string,
    score: string | number
}

type ScoreBoardProps = {
    players: Player[]
};

export default function ScoreBoard (props: ScoreBoardProps) {
    return (
        <div className="text-center">
            {props.players.map((p, i) => (
                <p
                    key={i}
                    title={`Player${i + 1} Wins`}>
                    {`${p.name}: ${p.score}` }
                </p>)
            )}
        </div>
    );
}
