#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('current', 'start', (yargs) => {
    return yargs
  }, (argv) => {
    if (argv.year) {
        console.info(new Date().getFullYear())
    } else if (argv.month) {
        console.info((new Date().getMonth() + 1))
    } else if (argv.date) {
        console.info(new Date().getDate())
    } else console.log(new Date())
  })
  .command('add [count]', 'add date', (yargs) => {
    return yargs
    .positional('count', {
        describe: 'count',
        default: 1
      })
  }, (argv) => {
    if (argv.year) {
        console.log(new Date(new Date().setFullYear(new Date().getFullYear() + argv.count)));
    } else if (argv.month) {
        console.log(new Date(new Date().setMonth(new Date().getMonth() + argv.count)));
    } else if (argv.date) {
        console.log(new Date(new Date().setDate(new Date().getDate() + argv.count)));
    } else console.log(new Date())
  })
  .command('sub [count]', 'sub date', (yargs) => {
    return yargs
    .positional('count', {
        describe: 'count',
        default: 1
      })
  }, (argv) => {
    if (argv.year) {
        console.log(new Date(new Date().setFullYear(new Date().getFullYear() - argv.count)));
    } else if (argv.month) {
        console.log(new Date(new Date().setMonth(new Date().getMonth() - argv.count)));
    } else if (argv.date) {
        console.log(new Date(new Date().setDate(new Date().getDate() - argv.count)));
    } else console.log(new Date())
  })
  .option('year', {
    alias: 'y',
    type: 'boolean',
    description: 'описание'
  })
  .option('month', {
    alias: 'm',
    type: 'boolean',
    description: 'описание'
  })
  .option('date', {
    alias: 'd',
    type: 'boolean',
    description: 'описание'
  })
  .parse()
