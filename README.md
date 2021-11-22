# multiplayer-poc


1) All moves go through the backend - no cheating allowed and NFTs/tokens can be awarded safely in the `move` function of cloud.js
2) Client lag needs to be compensated by the game engine using movement extrapolation and prediction - [Read more](https://www.gabrielgambetta.com/client-server-game-architecture.html)
3) Optimizations need to be done to rate-limit who can call `move` and how often
4) When the game loads the server only gives the client the position of the players that are close to the player playing the game - adjust `DRAW_DISTANCE` in `cloud.js` to change this. Room for improvement: this DRAW_DISTANCE needs to be set in live-query so when user gets continuous updates its also applied.
