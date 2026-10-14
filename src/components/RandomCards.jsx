import Card from "./Card";
export default function RandomCards({handleClick, cards, lang}) {
    return (
        <div className="cards-container">
            {cards.slice(0, 12).map(card => (
                <Card key={card.id}
                    handleClick={handleClick}
                    card={card}
                    lang={lang}
                />
            ))}
        </div>
    )
}


