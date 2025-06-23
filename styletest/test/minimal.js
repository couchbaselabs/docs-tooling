// this test file is designed to be run with Mocha
const assert = require('assert')
const fs = require('fs')
const os = require('os')
const ok = specify
const { spawnSync } = require('node:child_process')

describe(`test`, function () {
  try {
    foo = spawnSync( 'pwd', [] )
    console.log(foo.stdout.toString())
  } catch(e) {
    process.exit(1)
  }
    

  try {
    vale = spawnSync(
      'vale',
      [
        './',
        '--config', './.vale.ini',
        '--output', 'JSON',
        '--minAlertLevel', 'suggestion',
      ],
    )
  }
  catch (err) {
    console.log("Failed to run vale", err)
  }

  console.log(vale.stderr.toString(), vale.stdout.toString())
  console.log(JSON.parse(vale.stdout))
  console.log("RARR")

  ok('a test', assert.equal(1,1, "test"))
})
