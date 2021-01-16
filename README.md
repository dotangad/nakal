# nakal - Backup MySQL databases to Google Sheets

A MySQL backup tool for Google Sheets, written in Node.js.

## Why

At [Exun Clan](https://exunclan.com), my school's CS club, we usually build an app and take it down after a month or two. However, we need the data somewhere easily accessible by people who don't know SQL for much longer than that. We already use Google Sheets for a lot of internal tracking so this felt like the natural thing to do.

## How

Read the code [here](https://github.com/dotangad/nakal).

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
