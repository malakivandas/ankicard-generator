const fs = require('fs');
const path = require('path');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

const { conjugateVerb } = require('./conjugateVerb');

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

  tenses.map((tense) => {
    verbs.map((verb) => {
      try {
        conjugationHtml = '';
        conjugateVerb(verb, tense).map(
          ({ pronoun, conjugation, agreement }) => {
            conjugationHtml +=
              '<div class=""grid-item subject-pronoun"">' +
              pronoun +
              '</div><div class=""grid-item conjugation"">' +
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
          verb +
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
