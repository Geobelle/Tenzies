import Die from './Die'
import { useState } from 'react'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function Main() {
 const [dice, setDice] = useState(generateAllNewDice())
    const [count, setCount] = useState(0)

   
      const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

    

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    
   

    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
            setCount(prevCount => prevCount + 1)
            
        } else {
            setDice(generateAllNewDice())
            setCount(prevCount => 0)
        
        }
       
    }

    function Hold(id){
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }
 

    const diceElements = dice.map(dieObj => <Die key={dieObj.id} isHeld={dieObj.isHeld} id={dieObj.id} value={dieObj.value} hold= {Hold}/>)

    return (
        <div className="container">
            <div className="inner-container">
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='numberBtnContainer'>
                    {diceElements}
                </div>
                <div className="roll_details">
                    <p>Roll count:{count}</p>
                    <button className='reroll' onClick={rollDice}> {gameWon ? "New Game" : "Roll"}</button>
                </div>
            </div>
        </div>
     
    )
  }
  
  export default Main