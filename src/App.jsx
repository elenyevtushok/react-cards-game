import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
	const [deckId, setDeckId] = useState();
	const [twoCards, setTwoCards] = useState([
		{
			name: "computerCard",
			image: "",
			value: ""
		},
		{
			name: "myCard",
			image: "",
			value: ""
		},
	]);
	const [remainingCards, setRemainingCards] = useState();
	const [computerScore, setComputerScore] = useState(0);
	const [myScore, setMyScore] = useState(0);
	const [winner, setWinner] = useState("")

	useEffect(() => {
		getNewDeck();
	}, [])

	function getNewDeck() {
		axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/")
			.then(res => {
				setDeckId(res.data.deck_id)
				setRemainingCards(res.data.remaining)
				setComputerScore(0)
				setMyScore(0)
				setWinner("")
			})
	}

	function getTwoCards() {
		axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
			.then(res => {
				setTwoCards([
					{
						name: "computerCard",
						image: res.data.cards[0].image,
						value: res.data.cards[0].value
					},
					{
						name: "myCard",
						image: res.data.cards[1].image,
						value: res.data.cards[1].value
					}
				])
				setRemainingCards(res.data.remaining)
			})
	}

	function endGame() {
		if (myScore > computerScore) {
			setWinner("Congratulations, you won!")
		}
		if (myScore < computerScore) {
			setWinner("Computer won")
		}
		if (myScore === computerScore) {
			setWinner("It's a tie!")
		}
	}

	let cardsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

	function findBiggest() {
		let index1;
		let index2;
		for (let i = 0; i < cardsArray.length; i++) {
			if (twoCards[0].value === cardsArray[i]) {
				index1 = i;
			}
			if (twoCards[1].value === cardsArray[i]) {
				index2 = i;
			}
		}
		if (index1 > index2) {
			setComputerScore((prevComputerScore) => prevComputerScore + 1)
		} if (index1 < index2) {
			setMyScore((prevMyScore) => prevMyScore + 1)
		}
	}

	return (
		<div className='App'>
			<button onClick={getNewDeck}>New Game</button>
			{winner ? winner && <h2 className='shimmer'>{winner}</h2> : <h2>Remaining cards: {remainingCards}</h2>}
			<div className="cards">
				<p>Computer score: {computerScore}</p>
				<div className="card-slot">
					{twoCards[0].image && <img className='card' src={twoCards[0].image} />}
				</div>
				<div className="card-slot">
					{twoCards[1].image && <img className='card' src={twoCards[1].image} />}
				</div>
				<p>My score: {myScore}</p>
			</div>
			{remainingCards === 0 ? <button onClick={endGame}>End Game</button> :
				<button onClick={() => {
					findBiggest();
					getTwoCards()
				}
				}>Draw</button>}
		</div>
	)
}

export default App
