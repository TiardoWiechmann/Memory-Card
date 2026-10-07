
export default function Scoreboard({score, bestScore}){
    return (
        <>
            <Score score={score} />
            <BestScore bestScore={bestScore} />
        </>
    )
}

function Score({score}) {
    return (
        <p>Score: {score}</p>
    )
}

function BestScore({bestScore}){
    return (
        <p>Best Score: {bestScore}</p>
    )
}