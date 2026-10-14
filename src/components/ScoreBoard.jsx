export default function Scoreboard({score, bestScore, lang}){
    return (
        <div className="scoreboard">
            <Score score={score} lang={lang}/>
            <BestScore bestScore={bestScore} lang={lang}/>
        </div>
    )
}

function Score({score, lang}) {
    return (
        <p>{lang.score}: {score}</p>
    )
}

function BestScore({bestScore, lang}){
    return (
        <p>{lang.bestScore}: {bestScore}</p>
    )
}
