# multiplayer-poc

This is an implementation of a basic web3 game that logs in user with a wallet like Metamask and allows for real-time movement in game.

NodeJS is single-threaded and therefore needs to be deployed as a cluster to make use of all cores. This application is automatically deployed as several processes (one of each core) and load balanced accordingly in order to take advantage of the whole machine.


1) All moves go through the backend - no cheating allowed and NFTs/tokens can be awarded safely in the `move` function of cloud.js
2) Client lag needs to be compensated by the game engine using movement extrapolation and prediction - [Read more](https://www.gabrielgambetta.com/client-server-game-architecture.html)
3) Optimizations need to be done to rate-limit who can call `move` and how often
4) When the game loads the server only gives the client the position of the players that are close to the player playing the game - adjust `DRAW_DISTANCE` in `cloud.js` to change this. Room for improvement: this DRAW_DISTANCE needs to be set in live-query so when user gets continuous updates its also applied.
5) Room for improvement: add join/leave logic so players can change rooms
6) Server has rate limits so users can't spam endless moves - rate limit is ensured by `MOVE_COOLOFF` constant in `cloud.js` - this cooloff is per core in the server. There is also `MOVE_COOLOFF` on client side to ensure the client is rate limiting itself.



# Handling MANY players
1) The best would be to limit number of connections for each server to a few hundred (depends on server specs)
2) Let the user choose a "world" they want to join - each world runs on a separate server - kinda like Runescape
3) Each world is a separate Moralis Server
4) Worlds can be added in real time as the user base growth 
5) Worlds can have different settings - for example PvP enabled/disabled


