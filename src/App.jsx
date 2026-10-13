import './App.css'
import RandomCards from './components/RandomCards';
import Scoreboard from './components/ScoreBoard'
import { useState, useEffect } from 'react';

const LENGTH = 30;

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [visitedCards, setVisitedCards] = useState([]);
  const [cards, setCards] = useState([]);
  // const [error, setError] = useState(null);
  

  async function generateCards() {
     const ids = [...generateIds()];
     const responses = await Promise.all(
      ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
     ));
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
      .then(newCards => setCards(newCards));
  }, []);


  return (
    <div>  
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don't click on any more than once!</p>   
      <RandomCards handleClick={increaseScore} cards={cards}/>
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
  while (ids.size < LENGTH) {
      ids.add(getRandomInt(1000)+1);
  }
  return ids;
}

function shuffleArray(array) {
  for (let i=array.LENGTH -1; i>0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}