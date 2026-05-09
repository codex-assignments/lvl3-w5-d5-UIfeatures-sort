import React from 'react'

export default function Header({getDeck, cards, setFilteredCards}) {
    
    function chooseSuit(e) {
      const selectedSuit = e.target.value;
      const filteredSuit = cards.filter((card) => card.suit === selectedSuit);
      setFilteredCards(filteredSuit);
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

    //   function sortValue() {
    //     const sortedCards = [...cards].sort((a, b) => {
    //       return a.code.localeCompare(b.code);
    //     });
    //     setFilteredCards(sortedCards);
    //     }

    // create a new sort function to try to transform the face cards to numbers and give each card a value that can be sorted numerically

    //use charAt(0) to isolate that character to compare and sort
    // use a mapping object to convert 0, J, Q, K, A to a number
    //subtract with sort

    function sortValue() {
      //mapping object, assign new values that will sort properly
      const valueMap = {
        A: 14,
        K: 13,
        Q: 12,
        J: 11,
        0: 10,
      };

      const sorted = [...cards].sort((a, b) => {
        //get first character to compare
        const charA = a.code.charAt(0);
        const charB = b.code.charAt(0);

        //use valueMap to replace with a numerical value
        //if its in the valueMap, replace. Otherwise parse as a number
        const valA = valueMap[charA] || parseInt(charA);
        const valB = valueMap[charB] || parseInt(charB);

        return valA - valB;
      });

      setFilteredCards(sorted);
    }


  return (
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
  );
}
