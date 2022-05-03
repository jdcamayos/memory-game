import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const urlBaseImage = (n = 1) =>
	`https://rickandmortyapi.com/api/character/avatar/${n}.jpeg`;

const cardImages = [
	{ src: urlBaseImage(1), matched: false },
	{ src: urlBaseImage(2), matched: false },
	{ src: urlBaseImage(3), matched: false },
	{ src: urlBaseImage(4), matched: false },
	{ src: urlBaseImage(5), matched: false },
	{ src: urlBaseImage(6), matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// Shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(_ => Math.random() - 0.5)
			.map(card => ({ ...card, id: String(Math.random()).replace('0.', '') }));

		setTurns(0);
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
	};

	// Handle a choice
	const handleChoice = card => {
		if (!choiceOne) {
			setChoiceOne(card);
		} else if (card.id !== choiceOne.id) {
			setChoiceTwo(card);
		}
	};

	// Compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				// console.log('Those cards match');
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				setTimeout(() => resetTurn(), 1000);
			} else {
				// console.log('Those cards do not match');
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	// Reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	};

	// Start a new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className='App'>
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New game!</button>
			<div className='card-grid'>
				{cards.map(card => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={
							card.matched === true ||
							choiceOne?.id === card.id ||
							choiceTwo?.id === card.id
						}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
