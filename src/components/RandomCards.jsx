import Card from "./Card";
export default function RandomCards({handleClick, ids}) {
    return (
        <div>
            {ids.map((id) => (
                <Card key={id} handleClick={handleClick} id={id} />       
            ))}
        </div>
    )
}


