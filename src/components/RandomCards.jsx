import Card from "./Card";
export default function RandomCards({handleClick, cards}) {
    return (
        <div>
            {cards.map((card) => (
                <Card key={card.name} 
                    handleClick={handleClick} 
                    card={card} 
                />       
            ))}
        </div>
    )
}


