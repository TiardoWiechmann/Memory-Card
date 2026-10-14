export const de = {
    heading: "Pokémon Memory Spiel",
    description: "Sammle Punkte indem du auf ein Bild klickst, aber klicke auf kein Bild mehr als einmal.",
    gameOver(card) {
        return `Game Over. ${card.names.de} wurde bereits ausgewählt`
    },
    serverError: "Server nicht erreichbar. Bitte überprüfe deine Internetverbindung!",
    findIdError(status) {
        return `Pokémons konnten nicht geladen werden (Status ${status})`
    },
    score: "Punkte",
    bestScore: "Beste Punktzahl",
    pokemonName(card) {
        return card.names.de;
    },
    error: "Fehler",
}

export const en = {
    heading: "Pokémon Memory Game",
    description: "Get points by clicking on an image but don't click on any more than once!",
    gameOver(card) {
        return `Game Over. ${card.names.en} was already visited!`
    },
    serverError: "Server not reachable. Please check your internet connection!",
    findIdError(status) {
        return `Pokémons couldn't get loaded (Status ${status})`
    },
    score: "Score",
    bestScore: "Beste Score",
    pokemonName(card) {
        return card.names.en;
    },
    error: "Error",
}