# Salt Crypto Challenge

A challenge for a Back End Engineer position at Salt Lending.

# Back End

## Run Locally

Clone the project (Should already be cloned with front end, same repo)

```bash
  git clone git@github.com:amoses12/salt-crypto-test.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

# General Notes

## Following backend code

I know there's a lot to follow here and wanted to give some context on the pieces you will
most likely be interested in. Here's a quick guide on how to follow the back end code and
where to find files/code of interest:

Main server file:

```
index.js
```

API endpoints imported into server file:

```
routers/balance.router.ts
```

Service functions (this is probably of most interest):

```
services/balance.service.ts
```

There are 2 helper functions in the /helpers directory. balanceHelper has a function
that may be of interest when it comes to dynamically creating sql queries for the
balanceService.spend function:

```
helpers/balanceHelpers.ts
```

Models/Types can all be found in the models directory

## Other things to note

### .env

I know that commiting a .env is bad practice. But for the sake of ease for this challenge,
the fact that there is no sensitive information involved, and that this isn't a production
application, I've decided to include the .env in git.

### Certain refactors/breaking out of functions

Certain functions in the back end have been broken out, others have not. Breaking functions
out for reuse is incredibly helpful for when changes need to be made, however, when trying
to read on function it can be cumbersome to jump back and forth between functions and files
to decipher what's going on. I'm a fan of "wet" code (opposite of D.R.Y. get it?). This
doesn't mean I don't break anything out, but to keep a balance between readability and
maintainability, my general rule of thumb is that if I have to write something more than
twice (or believe I will use a certain function more than twice), then I will break it out
into it's own function and err on the side of maintainability. Hopefully that answers some
of the structure questions, especially in the balanceService.spend function.

### Use of the balanceService.spend function

The balance service.spend function will mutate and create data (mutation is setting spent
to true). If you are expecting certain numbers to be returned given the main requirement
of returning a balance given a BTC Address and spent boolean, know that running the spend
function or using the spend feature will alter the numbers returned. I have tested this in
a duplicate copy of the database, so the original data that was sent to me will be intact
and unchanged upon reaching you.

# Front End

## Run Locally

Clone the project (should already be cloned from back end)

```bash
  git clone https://link-to-project
```

Make sure the back end is running (see above)

Go to the project directory

```bash
  cd frontend/salt-challenge-frontend
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## General Notes

The front end is built on react and uses redux toolkit as well is nivo charts for the
pie chart. The purpose of this was to demonstrate my versatility, but I spent more time on
the back end since this is for a back end position. By no means is it perfect or incredibly pretty,
but it is entirely functional and mostly mobile responsive. Hopefully
it demonstrates that I can be useful on the front end when needed as well.

# General App Useage

There are 3 features created here. The first is the user can enter a valid btc address (validated)
and check spent or unspent. The balance will be returned. The 2nd feature is handled by the same
input as the first, but displays a pie chart showing spent vs unspent balance as well as a percent
of balance available (unspent). The third is that a user can enter a btc address and choose either
an amount, or full amount to spend. the balance and pie chart are updated upon spend.
