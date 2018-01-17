#!/usr/bin/env node
'use strict'

const ftpd = require('./')
const chalk = require('chalk')
const fs = require('fs-extra')
const { version } = require('./package.json')

const program = require('commander')
  .version(version)
  .usage('root [options...]')
  .option('--port [port]', 'set port', (n) => parseInt(n, 10))
  .option('--host [ipv4]', 'set host')
  .option('--read-only [bool]', 'set read only mode', (v) => {
    if (v === 'false' || v === 'no') return false
    return true
  })
  .parse(process.argv)

let readOnly = true
if (program.readOnly === false) readOnly = false

const opts = {
  root: program.args[0] || process.cwd(),
  readOnly: readOnly,
  host: program.host || '127.0.0.1',
  port: program.port || 1337,
  maxConnections: program.maxConnections || 10
}

console.log(
  ' - starting %s ftp server on %s',
  readOnly ? chalk.green('read only') : chalk.red('full access'),
  chalk.magenta(opts.root)
)

const server = ftpd(opts, (session) => {
  session.on('pass', (username, password, cb) => {
    cb() // LET EVERYBODY IN
  })

  session.on('read', (pathName, offset, cb) => {
    cb(null, fs.createReadStream(pathName, { start: offset }))
  })

  session.on('write', (pathName, offset, cb) => {
    cb(null, fs.createWriteStream(pathName, { start: offset }))
  })

  session.on('stat', fs.stat)
  session.on('readdir', fs.readdir)
  session.on('mkdir', fs.mkdir)
  session.on('unlink', fs.unlink)
  session.on('remove', fs.remove)
  session.on('rename', fs.rename)
})

server.on('listening', () => {
  console.log(
    ' - listening on %s:%s',
    chalk.blue(opts.host),
    chalk.yellow(opts.port)
  )
})

server.on('connection', (socket) => {
  const { remoteAddress, remotePort } = socket
  console.log(
    ' - received connection from %s:%s',
    chalk.blue(remoteAddress),
    chalk.yellow(remotePort)
  )

  socket.on('end', () => {
    console.log(
      ' - client %s:%s disconnected',
      chalk.blue(remoteAddress),
      chalk.yellow(remotePort)
    )
  })
})