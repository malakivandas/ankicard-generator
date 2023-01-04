const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

const verbConjugator = (verb, tense) => {
  let conjugationArray = [];
  let pronoun;
  let conjugation;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'h'];

  tense = tense.toUpperCase();

  [0, 1, 2, 3, 4, 5].map((pronoun_id) => {
    let agreement = '';

    conjugation = FrenchVerbs.getConjugation(
      Lefff,
      verb,
      tense,
      pronoun_id,
      {}
    );

    if (
      conjugation[1] === "'" &&
      !vowels.includes(conjugation[2])
    ) {
      conjugation =
        conjugation[0] + 'e ' + conjugation.substring(2);
    }

    if (['PASSE_COMPOSE', 'PLUS_QUE_PARFAIT'].includes(tense)) {
      if (FrenchVerbs.alwaysAuxEtre(verb)) {
        conjugation = conjugation + '(e)';
        if ([3, 5].includes(pronoun_id)) {
          conjugation = conjugation + 's';
        }
        if (pronoun_id === 4) {
          conjugation = conjugation + '(s)';
        }
      }
      if (['se', "s'"].includes(verb.substring(0, 2))) {
        conjugation = conjugation + '(e)';
        if ([3, 4, 5].includes(pronoun_id)) {
          conjugation = conjugation + '(s)';
        }
      }
    }

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
