import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
	const [deckId, setDeckId] = useState();
	const [twoCards, setTwoCards] = useState({
		firstCard: "",
		secondCard: ""
	});
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
			})
	}

	function getTwoCards() {
		axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
			.then(res => {
				setTwoCards({
					firstCard: res.data.cards[0].image,
					secondCard: res.data.cards[1].image
				})
				console.log(res.data)
				console.log(twoCards)
				console.log(deckId)
			})
	}

	return (
		<div className='App'>
			<button onClick={getNewDeck}>New Deck, Please!</button>
			<div className="cards">
				<p>Computer score:{computerScore}</p>
				<div className="card-slot">
					{twoCards.firstCard&&<img className='card' src={twoCards.firstCard} />}
				</div>
				<div className="card-slot">
					{twoCards.secondCard &&<img className='card' src={twoCards.secondCard} />}
				</div>
				<p>My score:{myScore}</p>
			</div>
			<button onClick={getTwoCards}>Draw</button>
		</div>
	)
}

export default App
