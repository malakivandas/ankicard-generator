const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

const verbConjugator = (verb, tense) => {
  let conjugationArray = [];
  let pronoun;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'h'];

  [0, 1, 2, 3, 4, 5].map((pronoun_id) => {
    const conjugation = FrenchVerbs.getConjugation(
      Lefff,
      verb,
      tense.toUpperCase(),
      pronoun_id,
      {}
    );
    switch (pronoun_id) {
      case 0:
        vowels.includes(conjugation[0])
          ? (pronoun = "j'")
          : (pronoun = 'je');
        break;
      case 1:
        pronoun = 'tu';
        break;
      case 2:
        pronoun = 'il/elle/on';
        break;
      case 3:
        pronoun = 'nous';
        break;
      case 4:
        pronoun = 'vous';
        break;
      case 5:
        pronoun = 'ils/elles';
        break;
      default:
        console.log('Error in switch statement.');
    }
    conjugationArray.push({ pronoun, conjugation });
  });

  return conjugationArray;
};

module.exports = { verbConjugator };
