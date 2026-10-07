// Card = image + text
// Use Pokemon API
import usePokemonUrl from "../js/usePokemonUrl"

export default function Card({id, handleClick}) {
    const { card, error } = usePokemonUrl(id);

    if (error) return <p>Error: {error}</p>;
    if (!card) return <p>Loading...</p>;

    return (
        <button onClick={handleClick}>
            <figure>
                <img src={card.url} alt={card.name}/>
                <figcaption>{card.name}</figcaption>
            </figure>
        </button>
    )
}