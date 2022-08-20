import React from "react";

export type BannerColors = "red" | "green" | "orange" | "gray"

type BannerProps = {
    text: string,
    color: BannerColors
}

export default function Banner (props: BannerProps) {
    return (
        <p className={`absolute bottom-6 right-6 border border-current px-4 py-2 rounded-md font-medium ${{
            "gray": "bg-gray-200 text-gray-700",
            "green": "bg-green-200 text-green-700",
            "orange": "bg-orange-200 text-orange-700",
            "red": "bg-red-200 text-red-700"
        }[props.color]}`}>
            {props.text}
        </p>
    );
}
