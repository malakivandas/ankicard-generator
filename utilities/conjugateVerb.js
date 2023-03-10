const {
  getConjugation,
  alwaysAuxEtre,
  isTransitive,
} = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');
const { contracts } = require('french-contractions');

const conjugateVerb = (verb, tense) => {
  let conjugationArray = [];
  let pronoun;
  let conjugation;
  let agreement = [];

  tense = tense.toUpperCase();

  [0, 1, 2, 3, 4, 5].map((pronoun_id) => {
    try {
      agreement = [];

      // french-verbs package bug patch - person omittance in tenses other than PRESENT
      try {
        getConjugation(Lefff, verb, 'PRESENT', pronoun_id, {
          aux:
            !alwaysAuxEtre(verb) && !isTransitive(verb)
              ? 'AVOIR'
              : null,
        });
      } catch (err) {
        if (
          err.message.substring(0, 6) === 'person' &&
          err.message.substring(0, 8) !== 'person m'
        ) {
          err.message =
            err.message.substring(
              0,
              err.message.lastIndexOf(' ')
            ) +
            ' PRESENT and therefore in ' +
            tense;
          throw err;
        } else {
          throw err;
        }
      }

      conjugation = getConjugation(
        Lefff,
        verb,
        tense,
        pronoun_id,
        {
          aux:
            !alwaysAuxEtre(verb) && !isTransitive(verb)
              ? 'AVOIR'
              : null,
        }
      );

      // french-verbs package bug patch - reflexive pronoun in tenses other than PRESENT
      if (
        conjugation[1] === "'" &&
        !contracts(
          conjugation.substring(
            conjugation.indexOf("'") + 1,
            conjugation.includes(' ')
              ? conjugation.indexOf(' ')
              : 100
          )
        )
      ) {
        conjugation =
          conjugation[0] + 'e ' + conjugation.substring(2);
      }

      // Custom verb agreement
      if (
        ['PASSE_COMPOSE', 'PLUS_QUE_PARFAIT'].includes(tense)
      ) {
        if (alwaysAuxEtre(verb)) {
          agreement.push('(e)');
          if ([3, 5].includes(pronoun_id)) {
            agreement.push('s');
          }
          if (pronoun_id === 4) {
            agreement.push('(s)');
          }
        }
        if (['se', "s'"].includes(verb.substring(0, 2))) {
          agreement.push('(e)');
          if ([3, 4, 5].includes(pronoun_id)) {
            agreement.push('(s)');
          }
        }
      }

      switch (pronoun_id) {
        case 0:
          contracts(
            conjugation.substring(
              0,
              conjugation.includes(' ')
                ? conjugation.indexOf(' ')
                : 100
            )
          )
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

      conjugationArray.push({ pronoun, conjugation, agreement });
    } catch (err) {
      if (err.name !== 'NotFoundInDict') {
        console.log(err.name + ': ' + err.message);
      } else {
        throw err;
      }
    }
  });

  return conjugationArray;
};

module.exports = { conjugateVerb };
