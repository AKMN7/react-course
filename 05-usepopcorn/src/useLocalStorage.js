import { useEffect, useState } from "react";

export function useLocalStorae(key, initState) {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || initState));

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
