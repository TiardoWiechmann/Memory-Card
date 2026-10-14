export default function Scoreboard({score, bestScore}){
    return (
        <div className="scoreboard">
            <Score score={score} />
            <BestScore bestScore={bestScore} />
        </div>
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
