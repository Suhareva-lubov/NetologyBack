import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const number = Math.floor(Math.random() * (100 + 1));

console.log('Загадано число в диапазоне от 0 до 100: ')
    rl.on('line', (input) => {
        if (input > number) console.log("Меньше");
        if (input < number) console.log("Больше");
        if (input == number) {
            console.log(`Отгадано число ${input}`);
            rl.close();
        }
      });