import './App.css'
import RandomCards from './components/RandomCards';
import Scoreboard from './components/ScoreBoard'
import { useState, useEffect } from 'react';

const NUMBER_OF_IDS = 30;

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [visitedCards, setVisitedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  

  async function generateCards() {
    const ids = [...generateIds()];
    let responses;
    
    try {
    responses = await Promise.all(
    ids.map(id => fetch(`https://pokapi.co/api/v2/pokemon/${id}`))
    );
    } catch {
      throw new Error("Server not reachable. Please check your internet connection!");
    }

     const failed = responses.find(r => !r.ok);
     if (failed) {
      throw new Error(`Pokémons couldn't get loaded (Status ${failed.status})`);
     }

     const pokemons = await Promise.all(responses.map(r => r.json()));

     return pokemons.map(pokemon => ({
      url: pokemon.sprites.front_default,
      name: pokemon.name,
      id: pokemon.id,
     }));
  }


  function increaseScore(card) {
    if (visitedCards.includes(card.id)){
      setCurrentScore(0);
      setVisitedCards([]);
      alert(`Game Over! ${card.name} was already visited!`);
    }
    else {
      setCurrentScore(currentScore + 1);
      if (currentScore + 1 > bestScore) setBestScore(currentScore + 1);
      setVisitedCards([...visitedCards, card.id]);
    }
    shuffleCards();
  }

  function shuffleCards() {
    let newCards = [...cards];
    shuffleArray(newCards);
    setCards(newCards);
  }

  useEffect(() => {
    generateCards()
      .then(newCards => setCards(newCards))
      .catch(err => setError(err.message));
  }, []);


  return (
    <div>  
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don't click on any more than once!</p>   
      {error 
        ? <p className="error">Error: {error}</p>
        : <RandomCards handleClick={increaseScore} cards={cards}/>}
      <Scoreboard score={currentScore} bestScore={bestScore}/>
    </div>
  )
}

export default App






// ----------------
// Helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * (max));
}

function generateIds() {
  let ids = new Set()
  while (ids.size < NUMBER_OF_IDS) {
      ids.add(getRandomInt(1000)+1);
  }
  return ids;
}

function shuffleArray(array) {
  for (let i=array.length -1; i>0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}