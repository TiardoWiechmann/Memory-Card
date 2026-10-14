export default function Card({card, handleClick}) {
    if (!card) return <p>Loading...</p>;

    return (
        <button className="card" onClick={() => handleClick(card)}>
            <figure>
                <img src={card.url} alt={card.name} width={96} height={96}/>
                <figcaption>{card.name}</figcaption>
            </figure>
        </button>
    )
}