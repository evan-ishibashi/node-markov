const { MarkovMachine } = require("./markov");

describe("getChains function", function () {

  let machine;
  beforeEach(function () {
    machine = new MarkovMachine("the cat in the hat");
  });

  test("returns markovChain Obj", function () {
    const markovChain = machine.getChains();
    expect(markovChain).toEqual({
      "the": ["cat","hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null],
    });

  });
});

describe("getText function", function () {

  let machine;
  beforeEach(function () {
    machine = new MarkovMachine("the cat in hat is fat");
  });

  test("returns markovChain Obj", function () {
    const text = machine.getText();
    expect(text).toEqual("the cat in hat is fat");

  });
});

test("returns random idx",function(){
  const randomIdx = MarkovMachine.generateRandomIdx(3);
  expect([0,1,2]).toContain(randomIdx);
})