#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';
import csv from 'csv-parser'

yargs(hideBin(process.argv))
  .command('game [way]', 'game start', (yargs) => {
    return yargs
    .positional('way', {
        describe: 'way',
        default: './Потоки_модули/log.csv'
      })
  }, (argv) => {
    game(argv.way);
  }).parse()

  function game(way) {
    const rl = readline.createInterface({ input, output });
    const number = Math.round(Math.random()) + 1;
    
    console.log('Отгадай 1 или 2 : ')
    rl.on('line', (input) => {
        if (input == number) {
            console.log(`Везунчик! Ты отгадал: ${number}`);
            fs.appendFileSync(way, "win"+ "\n")
        } else if (input != 1 && input != 2) {
            console.log(`Грустно, но кажется, ты не понял задания. Я загадал ${number}.`);
        } else {
            console.log(`Увы, я загадал ${number}. Повезет в следующий раз!`);
            fs.appendFileSync(way, "fail"+ "\n")
        }
        rl.close();
            statsGame(way);
      });
  }

  function statsGame(file) {
    const results = [];

    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => results.push(data)) // Добавляем каждую строку в массив results
      .on('end', () => {
        let win = 0;
        let fail = 0;
        results.forEach(element => {
            if (element.result == 'win') {
                win++;
            } else fail++;
        })
        console.log('\n-----Статистика-----\n' +
            `Количество игр: ${results.length} \n`+
            `Количество выигранных партий: ${win} \n` +
            `Количество проигранных партий: ${fail} \n` +
            "Процентное соотношение выигранных партий: " + ((win * 100) / results.length).toFixed(1) + "%\n"
        );
        })
      .on('error', (err) => {
        console.error('Ошибка при чтении CSV-файла:', err);
    });

  }

