import { useEffect } from "react";

export default function useTitle(title) {
    useEffect(() => {
        window.document.title = title;
    }, [title])
}