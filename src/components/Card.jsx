export default function Card({card, handleClick, lang}) {
    if (!card) return <p>Loading...</p>;

    const name = lang.pokemonName(card);

    return (
        <button className="card" onClick={() => handleClick(card)}>
            <figure>
                <img src={card.url} alt={name} width={96} height={96}/>
                <figcaption>{name}</figcaption>
            </figure>
        </button>
    )
}