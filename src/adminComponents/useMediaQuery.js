import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        window.matchMedia(query).matches
    );
    
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
        setMatches(media.matches);
        }
    
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
    
        return () => media.removeListener(listener);
    }, [query, matches]);

    return matches;
}

export default useMediaQuery;
