import './App.css'
import RandomCards from './components/RandomCards';
import Scoreboard from './components/ScoreBoard'
import { useState, useEffect } from 'react';
// Zuerste 30 Karten fetchen und diese immer wieder mischen
const length = 30;

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [cards, setCards] = useState([]);
  // const [error, setError] = useState(null);
  

  async function generateCards() {
     const ids = generateIds();
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


  function increaseScore() {
    setCurrentScore(currentScore + 1);
    if (currentScore + 1 > bestScore) setBestScore(currentScore + 1);
    shuffleCards();
  }

  // Change only one id and shuffle
  async function shuffleCards() {
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

function getRandomInt(max) {
  return Math.floor(Math.random() * (max));
}


function generateIds() {
  let newIds = []
  for (let i=0; i<length; i++) {
      newIds.push(getRandomInt(1000)+1);
  }
  return newIds;
}

function shuffleArray(array) {
  for (let i=array.length -1; i>0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}