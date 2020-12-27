# AccessLogParserJS

## Preamble
This module provides a (better) JavaScript implementation of [AccessLogParser](https://github.com/outlawdesigns-io/AccessLogParser).

## Installation

`npm i outlawdesigns.io.accesslogparser`

## Usage

```
const fs = require('fs');
const AccessLogParser = require('outlawdesigns.io.accesslogparser');
const logPath = '/var/log/apache2/access.log';


let data = fs.readFileSync(logPath).split("\n");

data.forEach((line)=>{
  console.log(AccessLogParser.parseLine(line));
});

```
