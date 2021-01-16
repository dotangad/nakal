# nakal - Backup MySQL databases to Google Sheets

A MySQL backup tool for Google Sheets, written in Node.js.

## Why

At [Exun Clan](https://exunclan.com), my school's CS club, we usually build an app and take it down after a month or two. However, we need the data somewhere easily accessible by people who don't know SQL for much longer than that. We already use Google Sheets for a lot of internal tracking so this felt like the natural thing to do.

## How

I'd never written a CLI with Node.js before but I'd heard good things about [yargs](https://github.com/yargs/yargs/) so I decided to use it. It was easy enough to setup and didn't get in the way, 10/10. I used the [`google-spreadsheet`](https://www.npmjs.com/package/google-spreadsheet) package to edit spreadsheets.

I started by writing a function to fetch tables and their contents from the database and another function to put those into a Google Sheet. The user needs to make the Google Sheet, share it with the client email and give me the sheetId and the functions populate that sheet with data.

## Installation

For now, you'll have to clone the repository and install the command manually. I'll get around to putting this on NPM someday.

```sh
git clone https://github.com/dotangad/nakal
cd nakal
npm install
npm link
```

You should now be able to run the `nakal` command from anywhere.

## Getting credentials from Google

1. Head to [console.developers.google.com](https://console.developers.google.com/).
2. Create a new project from the select project modal in the top left corner of the screen.
3. Search for the Google Sheets API and enable it.
4. Go to the Credentials tab (from the navbar: APIs & Services > Credentials).
5. Create a service account (Create credentials > Service Account) and download the `credentials.json` file.

## Usage

```
Usage: nakal <options> <sheet_id>

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -h, --host         MySQL host                  [string] [default: "127.0.0.1"]
  -u, --user         MySQL Username                          [string] [required]
  -p, --pass         MySQL Password                                     [string]
      --db           MySQL Database                          [string] [required]
  -c, --credentials  Path to credentials.json file for access to Google's APIs.
                                                             [string] [required]

A MySQL backup tool for Google Sheets.
```

Remember to share your Sheet with the client email in your `credentials.json` file before running the CLI.

## License
MIT License

Copyright (c) 2021 Angad Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
