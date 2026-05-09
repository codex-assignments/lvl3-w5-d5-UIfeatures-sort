import React, { useEffect, useState } from "react";
import "./Assignment.css";

export default function Assignment() {
  const [deck, setDeck] = useState("");
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);


    async function getDeck() {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      );
      const data = await res.json();
        setDeck(data.deck_id);
        setCards([]);
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
    
    function filterRedCards() {
        const filteredCards = cards.sort()
    }

        function filterBlackCards() {
          const filteredCards = cards.sort();
    }
    
        function sortCards() {
          const filteredCards = cards.sort();
        }

    const displayCards = filteredCards.length > 0 ? filteredCards : cards

  return (
    <div>
      <div className="app-container">
        <header className="controls">
          <select>
            <option>Choose a Suit</option>
            <option value="HEARTS">Hearts</option>
            <option value="DIAMONDS">Diamonds</option>
            <option value="CLUBS">Clubs</option>
            <option value="SPADES">Spades</option>
          </select>
          <button>Sort by Value</button>
          <button>Show Only Red</button>
          <button>Show Only Black</button>
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
