#!/usr/bin/env node

var program = require('commander');
const {prompt} = require('inquirer');
const questions =require('./cli_handler.json');
const test = require('./logic/autodeployment.js');

  program.version('0.1.0').command('autodeployment').alias('a').description('Get the input from the user').action(() => {
    prompt(questions.auto_deployment).then(answers =>
      test.autodeployment(answers));
  });
  program.parse(process.argv);

