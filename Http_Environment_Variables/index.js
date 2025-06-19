import http from "http";
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process'; 

const apiKey = process.env.apiKey;
let url = `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=`;

const rl = readline.createInterface({ input, output });
rl.question('Введите город: ', (input) => {
    url += input;
    rl.close()
    http.get(url, (res) => {
        const {statusCode} = res;
    
        if(statusCode !== 200) {
            console.log(`Ошибка ${statusCode}`);
            return
        }
    
        res.setEncoding('utf-8')
        let rowData = '';
        res.on('data', (chank) => rowData += chank)
        res.on('end', () => {
            let parse = JSON.parse(rowData)
            console.log(parse)
        })
    }).on('error', (err) => {
        console.log(err)
    })
})
