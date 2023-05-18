const fs = require('fs');

const inputFile = 'input.json'; // Replace this with the path to your JSON file
const outputFile = 'output.sql';

const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

const questionsInsert = "INSERT INTO questions (category, root_category, text, created_at, updated_at) VALUES";
const optionsInsert = "INSERT INTO options (question_id, text, created_at, updated_at) VALUES";

let questionsValues = [];
let optionsValues = [];

const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

data.forEach((item) => {
  const question = `('${item.category}', '${item.root_category}', '${item.question}', '${now}', '${now}')`;
  questionsValues.push(question);

  if (item.options) {
    item.options.forEach((option) => {
      const optionValue = `(currval('questions_id_seq'), '${option}', '${now}', '${now}')`;
      optionsValues.push(optionValue);
    });
  }
});

const questionsSql = `${questionsInsert}\n${questionsValues.join(',\n')};\n`;
const optionsSql = `${optionsInsert}\n${optionsValues.join(',\n')};\n`;

const outputSql = `${questionsSql}\n${optionsSql}`;

fs.writeFileSync(outputFile, outputSql, 'utf8');
console.log(`Generated SQL INSERT statements saved to ${outputFile}`);
