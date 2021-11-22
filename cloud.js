const MOVE_SPEED = 5;
const DRAW_DISTANCE = 500;

Moralis.Cloud.define("move", async (request) => {
  logger.info("Move called!");
  logger.info(JSON.stringify(request));

  const user = request.user;
  if(!user)
  {
    return "You need to login!";
  }
 
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