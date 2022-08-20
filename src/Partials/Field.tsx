import React from "react";

type fieldProps = {
    label: string,
    onChange: (value: string) => void,
    value: string,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function Field (props: fieldProps) {
    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value);
    }
    return (
        <label className="flex flex-col">
            <span className="self-start mx-3">
                {props.label}
            </span>
            <input
                className="rounded-md border border-gray-500/70 m-1 py-1 px-2 self-stretch"
                onChange={handleChange}
                value={props.value}
                {...props.inputProps} />
        </label>
    );
}
