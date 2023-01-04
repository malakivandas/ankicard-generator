#! /usr/bin/env node

const path = require('path');

const verbConjugator =
  require('./utilities/verbConjugator').verbConjugator;

const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: [-f | --file <path>] [-t | --tense <string>]')
  .option('f', {
    alias: 'file',
    demandOption: true,
    describe:
      'The path to the list of verbs to conjugate (.json)',
    type: 'string',
  })
  .option('t', {
    alias: 'tense',
    demandOption: true,
    describe: 'The verb tense(s) selected for conjugation',
    type: 'array',
    choices: [
      'present',
      'futur',
      'imparfait',
      'passe_simple',
      'conditionnel_present',
      'imperatif_present',
      'subjonctif_present',
      'subjonctif_imparfait',
      'passe_compose',
      'plus_que_parfait',
    ],
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .example('$0 -f ./verbs-list.json -t tense')
  .example('$0 -f ./verbs-list.json -t tense1 tense2').argv;

const verbs = require(path.join(__dirname, argv.file)).verbs;

argv.tense.map((tense) => {
  verbs.map((verb) => {
    console.log(verbConjugator(verb, tense));
  });
});
