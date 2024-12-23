# @rudolph

Copy `.example.env` to `.env` and fill the environment variables.

Run `npm i` to install the cli command `rudolph` and `docker compose up -d` to run mongo, api and swagger.

Use `rudolph uploader filename.csv` to save new transactions from a file.

If `zsh: permission denied: rudolph` occurs, it's enough to link again using `npm i`.

Use `rudolph indexer` to index from current block.

Navigate to `http://localhost:3000/docs` to explore api.
