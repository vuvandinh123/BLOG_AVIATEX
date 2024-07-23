import { useEffect } from "react";

export default function useToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    },[])
}