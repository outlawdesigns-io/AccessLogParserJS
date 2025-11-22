# Access Log Parser

**A lightweight Node.js module for parsing Apache-style HTTP access logs**

This module extracts key fields—IP address, request method, URL/query, timestamps, referrer, response code, response size, and user-agent details—from standard Apache access log lines. It is designed to be small, dependency-light, and easy to integrate into log-processing pipelines.

---

## ✨ Features

* Extracts:

  * IP address (including handling of IPv6 `::1` → `127.0.0.1`)
  * Timestamp → JavaScript `Date` object
  * HTTP method
  * Query/path
  * Referrer
  * Response code
  * Response size
  * Full parsed user-agent (via `parse-user-agent`)
* Provides a `parseLine()` helper that extracts all values at once
* No external Apache configuration required—parses raw log lines

---

## 📦 Installation

```bash
npm install @outlawdesigns/access-log-parser
```

---

## 🚀 Usage

```js
const fs = require('fs');
const AccessLogParser = require('@outlawdesigns/access-log-parser');
const logPath = '/var/log/apache2/access.log';

let data = fs.readFileSync(logPath, 'utf8').split("\n");

data.forEach((line) => {
  console.log(AccessLogParser.parseLine(line));
});
```

Sample output:

```json
{
  "ip_address": "127.0.0.1",
  "responseCode": "200",
  "requestDate": "2024-01-01T12:34:56.000Z",
  "requestMethod": "GET",
  "query": "/index.html",
  "referrer": "https://example.com",
  "responseSize": "5321",
  "ua": "Mozilla/5.0...",
  "browser": { ... },
  "engine": { ... },
  "os": { ... },
  "device": { ... }
}
```

---

## 🧩 API Reference

### `parseIp(logStr)`

Returns the client IP address.
IPv6 loopback (`::1`) is mapped to `127.0.0.1`.

### `parseDate(logStr)`

Returns a JavaScript `Date` based on the Apache timestamp.

### `parseTimeZone(logStr)`

Returns the timezone offset (e.g. `-0600`).

### `parseMethod(logStr)`

Extracts the HTTP verb (`GET`, `POST`, etc.).

### `parseQuery(logStr)`

Extracts the request target (path/query).

### `parseReferrer(logStr)`

Returns the request referrer, if present.

### `parseResponseCode(logStr)`

Extracts the numeric HTTP status code.

### `parseResponseSize(logStr)`

Response payload size in bytes.

### `parseUserAgent(logStr)`

Parses the User-Agent header using `parse-user-agent`.

### `parseLine(logStr)`

Returns a full object with all possible parsed fields.

---

## 🛠 Example: Processing a Log Stream

```js
const readline = require('readline');
const fs = require('fs');
const parser = require('@outlawdesigns/access-log-parser');

const rl = readline.createInterface({
  input: fs.createReadStream('/var/log/apache2/access.log'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const record = parser.parseLine(line);
  if (record) console.log(record);
});
```

---

## 🧪 Notes

* The parser assumes your access logs follow an Apache combined-style pattern.
* Malformed or incomplete lines return `false`.
* All regexes are intentionally optimized for speed and low overhead.

---

## 📄 License

MIT
