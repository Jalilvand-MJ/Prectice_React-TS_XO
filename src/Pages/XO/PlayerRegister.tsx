import Field from "../../Partials/Field";
import React from "react";

type Player = {
    name: string,
    setName: (value: string) => void
}

type PlayerRegisterProps = {
    players: Player[]
};

export default function PlayerRegister (props: PlayerRegisterProps) {
    return (
        <>
            {props.players.map((p, i) => (
                <Field
                    key={i}
                    label={`Player${i + 1} Name`}
                    onChange={p.setName}
                    value={p.name} />)
            )}
        </>
    );
}
