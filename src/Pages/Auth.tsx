import React, {useState} from "react";
import axios from "axios";
import Field from "../Partials/Field";
import Banner from "../Partials/Banner";

type stage = 1 | 2 | 3
type errorCode = "CONNECTION" | "INVALID" | ""
type AuthProps = {
    onLogin: (id: string) => void
}

export default function Auth (props: AuthProps) {
    const
        [level, setLevel] = useState(1 as stage),
        [error, setError] = useState<errorCode>(""),
        [mobile, setMobile] = useState(""),
        [code, setCode] = useState("");
    function handleError (type: "CONNECTION" | "INVALID") {
        setError(type);
        setTimeout(
            () => setError(""),
            5000);
    }
    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        setError("");
        switch (level) {
        case 1:
            axios.get(`http://localhost:8080/send?mobile=${mobile}`)
                .then((r) => {
                    if (r.status === 200) setLevel(2);
                    else handleError("CONNECTION");
                })
                .catch(() => {
                    handleError("CONNECTION");
                });
            break;
        case 2:
            axios.get(`http://localhost:8080/check?mobile=${mobile}&code=${code}`)
                .then((r) => {
                    if (r.status === 200) if (r.data) {
                        setLevel(3);
                        props.onLogin(r.data);
                    } else handleError("INVALID");
                    else handleError("CONNECTION");
                })
                .catch(() => {
                    handleError("CONNECTION");
                });
            break;
        default:
            break;
        }
    }
    return (
        <div
            className="h-screen w-full bg-blue-50 flex items-center justify-center"
            dir="rtl">
            {error !== ""
                ? <Banner
                    color="red"
                    text={{
                        "": "",
                        "CONNECTION": "خطا در برقراری ارتباط.",
                        "INVALID": "کد اشتباه است"
                    }[error]} />
                : null}
            {level < 3
                ? <form
                    className="w-96 p-8 bg-blue-200 rounded-lg shadow-lg flex flex-col"
                    onSubmit={handleSubmit}>
                    {level === 1
                        ? <Field
                            inputProps={{
                                type: "tel"
                            }}
                            label="شماره موبایل"
                            onChange={setMobile}
                            value={mobile} />
                        : <Field
                            label="کد ارسال شده"
                            onChange={setCode}
                            value={code} />}
                    <button
                        className="self-center rounded-md bg-blue-500 text-white m-1 px-2 py-1"
                        type="submit">
                        {level === 1
                            ? "ارسال کد تایید"
                            : "ورود"}
                    </button>
                </form>
                : <p>
                    DONE
                </p>}
        </div>
    );
}
