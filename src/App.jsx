import './App.css'
import RandomCards from './components/RandomCards';
import Scoreboard from './components/ScoreBoard'
import { useState, useEffect } from 'react';
// immer nur eine Karte neu fetchen
// fetch früher laden (Odin-lesson lesen)
const length = 2;

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [ids, setIds] = useState(generateIds())

  function increaseScore() {
    setCurrentScore(currentScore + 1);
    if (currentScore + 1 > bestScore) setBestScore(currentScore + 1);
    shuffleIds();
  }

  // Change only one id and shuffle
  function shuffleIds() {
    const newId = getRandomInt(1000);
    const changedIndex = getRandomInt(length);
    let newIds = [...ids];
    newIds[changedIndex] = newId;
    console.log(newIds);
    setIds(newIds);
  }

  return (
    <div>
      
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don't click on any more than once!</p>   
      <RandomCards handleClick={increaseScore} ids={ids}/>
      <Scoreboard score={currentScore} bestScore={bestScore}/>
    </div>
  )
}

export default App

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateIds() {
  let newIds = []
  for (let i=0; i<length; i++) {
      newIds.push(getRandomInt(1000));
  }
  return newIds;
}