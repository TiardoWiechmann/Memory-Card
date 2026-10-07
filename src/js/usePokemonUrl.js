import { useState, useEffect } from "react";

export default function usePokemonUrl(id) {
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect( () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            setCard({url: response.sprites.front_default, name: response.name});
        })
        .catch(err => setError(err.message))
    }, [])

    return { card, error };
}