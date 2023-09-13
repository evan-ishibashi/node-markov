"use strict";

const { MarkovMachine } = require("./markov");
const fsP = require("fs/promises");

async function readFile(path) {
  const contents = await fsP.readFile(path, "utf8");
  return contents;
}

async function createMarkovTextFromFile(path) {
  try {
    var machine = new MarkovMachine(await readFile(path));
  } catch (error) {
    console.log("ERROR:", error.message);
  }
  console.log(machine.getText());
}

async function createMarkovTextFromUrl(url) {
  try {
    const res = await fetch(url);
    const text = await res.text()
    var machine = new MarkovMachine(text);
  } catch (error) {
    console.log("ERROR:", error.message);
  }

  console.log(machine.getText());
}




if (process.argv[2] === 'file') {
  createMarkovTextFromFile(process.argv[3]);
} else {
  createMarkovTextFromUrl(process.argv[3]);
}
