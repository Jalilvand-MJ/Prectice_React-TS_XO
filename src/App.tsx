import React, {useState} from "react";
import XO from "./Pages/XO/XO";
import Auth from "./Pages/Auth";

export default function App () {
    const [user, setUser] = useState<string>(localStorage.getItem("currant-user") ?? "");
    function handleLogin (id: string) {
        localStorage.setItem("currant-user", id);
        setUser(id);
    }
    return (
        user
            ? <XO />
            : <Auth onLogin={handleLogin} />
    );
}
