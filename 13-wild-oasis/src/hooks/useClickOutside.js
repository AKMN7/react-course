import { useEffect, useRef } from "react";

export function useClickOutside(callback) {
    const ref = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) callback();
        }

        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
    }, [callback]);

    return ref;
}
