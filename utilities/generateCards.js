const fs = require('fs');
const path = require('path');

const { conjugateVerb } = require('./conjugateVerb');

const tenseString = (tense) => {
  if (tense === 'present') {
    return 'présent';
  }
  if (tense === 'futur') {
    return 'futur simple';
  }
  if (tense === 'imparfait') {
    return 'imparfait';
  }
  if (tense === 'passe_simple') {
    return 'passé simple';
  }
  if (tense === 'conditionnel_present') {
    return 'conditionnel';
  }
  if (tense === 'imperatif_present') {
    return 'impératif';
  }
  if (tense === 'subjonctif_present') {
    return 'subjonctif';
  }
  if (tense === 'subjonctif_imparfait') {
    return 'imparfait du subjonctif';
  }
  if (tense === 'passe_compose') {
    return 'passé composé';
  }
  if (tense === 'plus_que_parfait') {
    return 'plus-que-parfait';
  }
};

const generateCards = (verbs, tenses) => {
  const date = new Date();
  const dateString = date.toString();
  const filePath =
    path.join(__dirname, '../data/output/') +
    dateString.substring(4, 15).replaceAll(' ', '-') +
    '_' +
    dateString.substring(16, 24).replaceAll(':', '-') +
    '_' +
    tenses.map((tense) => tense.replaceAll('_', '-')).join('_') +
    '.txt';

  let conjugationHtml;
  const tensesRequired = tenses.length > 1;

  tenses.map((tense) => {
    verbs.map((verb) => {
      try {
        conjugationHtml = '';
        conjugateVerb(verb, tense).map(
          ({ pronoun, conjugation, agreement }) => {
            conjugationHtml +=
              '<div class=""subject-pronoun"">' +
              pronoun +
              '</div><div class=""conjugation"">' +
              (conjugation.includes(' ')
                ? ((i = conjugation.lastIndexOf(' ')) =>
                    conjugation.substring(0, i) +
                    '<br />' +
                    conjugation.substring(i + 1))()
                : conjugation) +
              (agreement[0]
                ? '&#x2060;<span class=""agreement-e-bracket"">' +
                  '(e)' +
                  '</span>'
                : '') +
              (agreement[1]
                ? '&#x2060;<span class=""agreement-s' +
                  (agreement[1] === '(s)' ? '-bracket' : '') +
                  '"">' +
                  agreement[1]
                : '') +
              '</div>';
          }
        );
        fs.appendFileSync(
          filePath,
          (tensesRequired ? '"' : '') +
            verb +
            (tensesRequired
              ? '<p class=""tense"">' +
                tenseString(tense) +
                '</p>"'
              : '') +
            ' "<div class=""grid-container"">' +
            conjugationHtml +
            '</div>"\n'
        );
      } catch (err) {
        // Only the 'NotFoundInDict' error
        console.log(err.message);
      }
    });
  });
};

module.exports = { generateCards };
