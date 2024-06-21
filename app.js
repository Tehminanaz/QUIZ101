import inquirer from "inquirer";
import chalk from "chalk";
const apilink = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fecthQuiz = await fetch(data);
    let res = await fecthQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    // for user name 
    let userName = await inquirer.prompt([
        {
            name: "string",
            type: "input",
            message: "What is your name?"
        }
    ]);
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                name: "quiz",
                type: "list",
                message: data[i].question,
                choices: answers.map(val => val)
            }
        ]);
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.blue.italic("correct"));
        }
        else {
            console.log(chalk.bold.blue.italic(data[i].correct_answer));
        }
    }
    ;
    console.log(score);
};
startQuiz();
