const MOVE_SPEED = 15;
const DRAW_DISTANCE = 500;
const MOVE_COOLOFF = 400; // milliseconds between registering new commands for same user on same core

var lastMoved = {}

Moralis.Cloud.define("move", async (request) => {

  const user = request.user;
  if(!user)
  {
    return "You need to login!";
  }

  if(lastMoved[user.id]){
    let timeNow = new Date();
    let lastTime = lastMoved[user.id];
    let timeDiff = timeNow-lastTime
    logger.info(timeDiff); 

    if(timeDiff < MOVE_COOLOFF){
        return "moves locked for this user - cooling off";
    }
  }
  
  lastMoved[user.id] = new Date()
  
 
  const direction = request.params.direction;
  
  const Room = Moralis.Object.extend("Room1");

  const query = new Moralis.Query(Room);
  query.equalTo("player", user);
  const roomEntry = await query.first();

  if(!roomEntry){
    const roomEntry = new Room();
    roomEntry.set("player", user);
    roomEntry.set("x", 0);
    roomEntry.set("y", 0);
    await roomEntry.save();
  }

  if(direction=="up"){
    roomEntry.set("y",roomEntry.get("y")-MOVE_SPEED)
  }
  else if(direction=="down"){
    roomEntry.set("y",roomEntry.get("y")+MOVE_SPEED)
  }
  else if(direction=="left"){
    roomEntry.set("x",roomEntry.get("x")-MOVE_SPEED)
  }
  else if(direction=="right"){
    roomEntry.set("x",roomEntry.get("x")+MOVE_SPEED)
  }

  await roomEntry.save();

  return "move registered";
  
});


Moralis.Cloud.define("playersNearby", async (request) => {

  const user = request.user;

  if(!user)
  {
    return "You need to login!";
  }

  const Room = Moralis.Object.extend("Room1");
  const query = new Moralis.Query(Room);
  query.equalTo("player", user);
  const userEntry = await query.first();
  
  if(userEntry){
    const nearbyPlayerQuery = new Moralis.Query(Room);
    nearbyPlayerQuery.lessThanOrEqualTo("x", userEntry.get("x")+DRAW_DISTANCE);
    nearbyPlayerQuery.greaterThanOrEqualTo("x", userEntry.get("x")-DRAW_DISTANCE);
    nearbyPlayerQuery.lessThanOrEqualTo("y", userEntry.get("y")+DRAW_DISTANCE);
    nearbyPlayerQuery.greaterThanOrEqualTo("y", userEntry.get("y")-DRAW_DISTANCE);
    nearbyPlayerQuery.notEqualTo("player", user);
    const nearByPlayers = await nearbyPlayerQuery.find();
    return nearByPlayers;
  }
  else{
    return "Caller of this function could not be found!";
  }

});