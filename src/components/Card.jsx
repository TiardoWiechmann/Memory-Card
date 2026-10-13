// Card = image + text
// Use Pokemon API

export default function Card({card, handleClick}) {
    // if (error) return <p>Error: {error}</p>;
    if (!card) return <p>Loading...</p>;

    return (
        <button onClick={() => handleClick(card)}>
            <figure>
                <img src={card.url} alt={card.name} width={96} height={96}/>
                <figcaption>{card.name}</figcaption>
            </figure>
        </button>
    )
}