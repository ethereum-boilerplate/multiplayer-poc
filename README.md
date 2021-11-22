# multiplayer-poc


1) All moves go through the backend - no cheating allowed and NFTs/tokens can be awarded safely in the `move` function of cloud.js
2) Client lag needs to be compensated by the game engine using extrapolation - [Read more](https://www.gabrielgambetta.com/client-server-game-architecture.html)
3) Optimizations need to be done to rate-limit who can call `move` and how often
