import Card from "./Card";
export default function RandomCards({handleClick, cards}) {
    return (
        <div>
            {cards.slice(0, 10).map(card => (
                <Card key={card.id}
                    handleClick={handleClick}
                    card={card}
                />
            ))}
        </div>
    )
}


