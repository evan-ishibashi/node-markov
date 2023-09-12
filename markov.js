"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const markovChain = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (markovChain[word]) {
        markovChain[word].push(nextWord);
      } else {
        markovChain[word] = [nextWord];
      }
    }

    return markovChain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let text = [];
    let currentWord = this.words[0];

    while (currentWord) {
      text.push(currentWord);

      const nextWords = this.chains[currentWord];

      const numOfPossibilites = nextWords.length;
      const randomIdx = MarkovMachine.generateRandomIdx(numOfPossibilites);

      const nextWord = nextWords[randomIdx];

      currentWord = nextWord;
    }

    return text.join(" ");
  }

  /** generateRandoIdx: returns a random number from 1 to input length */
  static generateRandomIdx(length) {
    return Math.floor(Math.random() * length);
  }

}



module.exports = {
  MarkovMachine,
};
