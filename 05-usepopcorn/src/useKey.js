import { useEffect } from "react";

export function useKey(callback) {
    useEffect(
        function () {
            document.addEventListener("keydown", callback);

            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [callback]
    );
}
