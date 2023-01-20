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

	useEffect(() => {
		getNewDeck();
	}, [])

	function getNewDeck() {
		axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/")
			.then(res => {
				setDeckId(res.data.deck_id)
				console.log(deckId)
				console.log("new call made")
				setRemainingCards(res.data.remaining)
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
				console.log(res.data)
				console.log(twoCards)
				console.log(deckId)
				console.log("new call 2 made")
				setRemainingCards(res.data.remaining)
			})
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
			setComputerScore((prevComputerScore) => prevComputerScore+1)
		} if (index1 < index2) {
			setMyScore((prevMyScore) => prevMyScore + 1)
		}
	}

	return (
		<div className='App'>
			<button onClick={getNewDeck}>New Deck, Please!</button>
			<h2>Remaining cards: {remainingCards}</h2>
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
			<button onClick={() => {
				findBiggest();
				getTwoCards()
				}
			}>Draw</button>
		</div>
	)
}

export default App
