import './App.css'
import RandomCards from './components/RandomCards';
import Scoreboard from './components/ScoreBoard'
import { useState, useEffect } from 'react';
import { de, en } from './js/languages.js';

const NUMBER_OF_IDS = 30;

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [visitedCards, setVisitedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState(en);
  

  async function generateCards() {
    const ids = [...generateIds()];
    let responses;
    
    try {
      responses = await Promise.all(
      ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    );
    } catch {
      throw new Error(lang.serverError);
    }

     const failed = responses.find(r => !r.ok);
     if (failed) {
      throw new Error(lang.findIdError(failed.status));
     }

     const pokemons = await Promise.all(responses.map(r => r.json())); 

     const speciesList = await Promise.all(
      pokemons.map(pokemon => fetch(pokemon.species.url).then(r => r.json()))
     )

     return pokemons.map((pokemon, index) => ({
      url: pokemon.sprites.front_default,
      id: pokemon.id,
      names: {
        en: pokemon.name,
        de: findName(speciesList[index], "de") ?? pokemon.name,
      },
     }));
  }


  function increaseScore(card) {
    if (visitedCards.includes(card.id)){
      setCurrentScore(0);
      setVisitedCards([]);
      alert(lang.gameOver(card));
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
      <h1>{lang.heading}</h1>
      <button onClick={() => setLang(en)}>en</button>
      <button onClick={() => setLang(de)}>de</button>
      <div className="gameboard">
        <p className="description">{lang.description}</p>
        <Scoreboard
          score={currentScore}
          bestScore={bestScore}
          lang={lang}
        />
        {error 
          ? <p className="error">{lang.error}: {error}</p>
          : <RandomCards handleClick={increaseScore} cards={cards} lang={lang}/>}
      </div>
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

function findName(species, lang) {
  return species.names.find(n => n.language.name === lang)?.name;
}