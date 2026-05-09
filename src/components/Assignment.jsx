import React, { useEffect, useState } from "react";
import "./Assignment.css";

export default function Assignment() {
  const [deck, setDeck] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [suit, setSuit] = useState("");

  async function getDeck() {
    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
    );
    const data = await res.json();
    setDeck(data.deck_id);
    setCards([]);
    setFilteredCards([]);
    console.log(data.deck_id);
  }

  useEffect(() => {
    try {
      getDeck();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleDraw() {
    try {
      async function getCards() {
        const res = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=12`,
        );
        const data = await res.json();
        setCards(data.cards);
        console.log(data.cards);
      }
      getCards();
    } catch (error) {
      console.log(error);
    }
  }

    function chooseSuit(e) {
        const selectedSuit = e.target.value;
        const filteredSuit = cards.filter((card) => card.suit === selectedSuit);
        setFilteredCards(filteredSuit)
  }

  function filterRedCards() {
    const filteredRed = cards.filter((card) =>
      ["HEARTS", "DIAMONDS"].includes(card.suit),
    );
    setFilteredCards(filteredRed);
  }

  function filterBlackCards() {
    const filteredBlack = cards.filter((card) =>
      ["SPADES", "CLUBS"].includes(card.suit),
    );
    setFilteredCards(filteredBlack);
  }

    // unlike filter which returns a new array, sort method mutates the array, so spread operator is used
    // this is not actually sorting by card value since card.code is a mix of letters and numbers.

  function sortValue() {
    const sortedCards = [...cards].sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
    setFilteredCards(sortedCards);
    }
    
    // create a new sort function to try to transform the face cards to numbers and give each card a value that can be sorted numerically

    // function sortValue() {
        
    // }

  const displayCards = filteredCards.length > 0 ? filteredCards : cards;

  return (
    <div>
      <div className="app-container">
        <header className="controls">
          <select onChange={chooseSuit}>
            <option>Choose a Suit</option>
            <option value="HEARTS">Hearts</option>
            <option value="DIAMONDS">Diamonds</option>
            <option value="CLUBS">Clubs</option>
            <option value="SPADES">Spades</option>
          </select>

          <button onClick={sortValue}>Sort by Value</button>
          <button onClick={filterRedCards}>Show Only Red</button>
          <button onClick={filterBlackCards}>Show Only Black</button>
          <button onClick={() => getDeck()}>New Deck</button>
        </header>

        <main className="card-grid">
          {cards.length === 0 ? (
            <div className="empty-state-container">
              <button className="draw-button-large" onClick={handleDraw}>
                Draw Hand
              </button>
            </div>
          ) : (
            displayCards.map((card) => (
              <div key={card.code} className="card-item">
                <img src={card.image} alt={card.value} className="card-image" />
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
