const fs = require('fs');
const path = require('path');

const { conjugateVerb } = require('./conjugateVerb');

const generateCards = (verbs, tenses = ['a_b', 'c_d']) => {
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

  const write = (content) => {
    fs.appendFileSync(filePath, content);
  };

  tenses.map((tense) => {
    verbs.map((verb) => {
      write(verb + ' "<div class=""grid-container"">');
      conjugateVerb(verb, tense).map(
        ({ pronoun, conjugation, agreement }) => {
          write(
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
              '</div>'
          );
        }
      );
      write('</div>"\n');
    });
  });
};

module.exports = { generateCards };
