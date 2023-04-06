// Project: Week 3
// Zorkington - A Text Based Adventure
// John Isabella III

const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// Above is the provided code

//! Classes Go Here = FIRST THING!!!
//Here is a list of all the Locations in this Adventure, containing everything they have.
class Room {
  constructor({
    name,
    doorLock,
    inventory,
    interact,
    possibleLocations,
    description,
  }) {
    this.description = description;
    this.doorLock = doorLock;
    this.interact = interact;
    this.inventory = inventory;
    this.name = name;
    this.possibleLocations = possibleLocations;
  }
}

// Inventory Management
class LocationItems {
  constructor(initialItems) {
    this.inventory = initialItems;
  }
  //Adds an Item to an inventory
  inventoryAdd(itemToBeAdded) {
    this.inventory.push(itemToBeAdded);
  }

  // Prints the Player's Current Inventory
  inventoryDisplay() {
    console.log("Your current items are " + this.inventory);
  }

  //This checks to see if something was removed by comparing the length before and after
  inventoryRemove(itemToBeRemoved) {
    let snapshotInventorySize = this.inventory.length;
    this.inventory = this.inventory.filter((item) => item !== itemToBeRemoved);
    return snapshotInventorySize === this.inventory.length
      ? `No Items were removed`
      : `the ${item} was removed`;
  }
}

// Randomly assigns the number to be used by the secretName
let randomNumber = randomNum(1, 4);
//console.log("The Random Number is", randomNumber); //! TEST

// The options for our Secret Name (Key Puzzle) can change thanks to the switch
let secretName = "";
switch (randomNumber) {
  case 1:
    secretName = "Rob Vanarsdall";
    break; // This allows it to exit the switch, otherwise it will check the entire switch
  case 2:
    secretName = "Mary Reagan";
    break;
  case 3:
    secretName = "Henry Dufour";
    break;
  case 4:
    secretName = "John Isabella";
    break;
  default:
    secretName = "unknown";
}
//console.log("The Secret Name is", secretName); //! TEST

//! Object Definition
// The following is a list of Objects that define our rooms.
let townTriangle = new Room({
  name: "Town Triangle",
  doorLock: false,
  inventory: ["Sword"],
  interact: ["Retired Adventurer", "Simple Villager"],
  possibleLocations: ["Idiot's Inspiring Inn", "Forlorn Forest Of Fatality"],
  description: "You have now entered Town Triangle....",
});

let idiotsInspiringInn = new Room({
  name: "Idiot's Inspiring Inn",
  doorLock: false,
  inventory: ["Food", "Black Eye"],
  interact: ["Inkeeper", "Obnoxious Mas"],
  possibleLocations: ["Town Triangle", "Upstairs Room"],
  description: "You have now entered Idiot's Inspiring Inn....",
});

let upstairsRoom = new Room({
  name: "Upstairs Room",
  doorLock: false,
  inventory: ["Map", "Pie"],
  interact: ["Sleeping Child", "Exhaused Parents"],
  possibleLocations: ["Idiot's Inspiring Inn"],
  description: "You have now entered Upstairs Room....",
});

let forlornForestOfFatality = new Room({
  name: "Forlorn Forest Of Fatality",
  doorLock: false,
  inventory: ["Discarded Amulet"],
  interact: ["Sleeping Child", "Exhaused Parents"],
  possibleLocations: ["Town Triangle", "Deep Woods Of Certain Doom"],
  description: "You have now entered Forlorn Forest Of Fatality....",
});

let deepWoodsOfCertainDoom = new Room({
  name: "Deep Woods Of Certain Doom",
  doorLock: true,
  inventory: ["Pointless Rock"],
  interact: [],
  possibleLocations: ["Town Triangle", "Hag's Horrid Hoval", "Dragon's Keep"],
  description: "You have now entered the Deep Woods Of Certain Doom....",
});

let hagsHorridHoval = new Room({
  name: "Hag's Horrid Hoval",
  doorLock: false,
  inventory: ["Pariah's Name"],
  interact: ["Mailbox"],
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description: "You have now entered the Hag's Horrid Hoval....",
});

let dragonsKeep = new Room({
  name: "Dragon's Keep",
  doorLock: false,
  inventory: ["Treasure"],
  interact: ["Dragon", "Pile of Gold"],
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description: "You have now entered the Dragon's Keep....",
});

let underworld = new Room({
  name: "Underworld",
  doorLock: true,
  inventory: ["Death's Scythe"],
  interact: ["Grim Reaper"],
  possibleLocations: [],
  description: "You have now entered the Underworld....",
});

// Variables
let currentLocation = "Town Triangle"; // This updates as the player moves
let userInput = ""; // Currently their is no input

//! State Machine, Keeps track of where the Player can Go
// See functions "locationMove" & "locationUpdate" to see how you move
//The following are all the locations the player can travel to
let locations = {
  "Town Triangle": townTriangle,
  "Idiot's Inspiring Inn": idiotsInspiringInn,
  "Upstairs Room": upstairsRoom,
  "Forlorn Forest Of Fatality": forlornForestOfFatality,
  "Deep Woods Of Certain Doom": deepWoodsOfCertainDoom,
  "Hag's Horrid Hoval": hagsHorridHoval,
  "Dragon's Keep": dragonsKeep,
  "Underworld": underworld
};




start();


/* 
//TODO Probably will need to remove these
let playerBackpack = new LocationItems([""]);
let itemsTownTriangle = new LocationItems(["Sword Of A Hero"]);
let itemsIdiotsInspiringInn = new LocationItems(["Food", "Black Eye"]);
let itemsUpstairsRoom = new LocationItems(["Map", "Pie"]);
let itemsForlornForestOfFatality = new LocationItems([""]);
let itemsDeepWoodsOfCeertainDoom = new LocationItems([""]);
let itemsHagsHorridHoval = new LocationItems(["Witch's Name"]);
let itemsDragonsKeep = new LocationItems(["Treasure"]);
let itemUnderworld = new LocationItems(["Immortal Scythe"]);

playerBackpack.inventoryAdd("fries");
console.log(playerBackpack.inventoryRemove("beanz")); // "beanz" will not remove anything
playerBackpack.inventoryDisplay();
 */

//! Function List
// This is the function that Plays the Game
async function start() {
  let heroName = await introduction(); //The player will have to name themselves;
  console.log(heroName + userInput+ "Before Loop of Function\n"); //! TEST
  helpMenu();
  while(userInput !== "Exit"){
  userInput = await heroAction(heroName);
  console.log(heroName + userInput+ "Inside Loop of Function\n"); //! TEST
}
}

async function heroAction(heroName) {
  const heroAction = `What would you like to do ${heroName}?\n>_`;
  let action = await ask(heroAction);
  action = capitalizePlayerInput(action);
if (action === "Exit" || action === "E"){
  console.log(`\nThis is where the advenutre of ${heroName} comes to an end.\n`)
  process.exit();
}else if (action === "Help" || action === "H"){ //Brings up the Help Menu
  console.log(`\nHELP\n`) //! Test
  helpMenu();
}else if (action === "Move" || action === "M"){
  console.log(`\nMOVE\n`) //! Test
  locationMove();
}else if (action === "Backpack" || action === "B"){
  console.log(`\nBACKPACK\n`) //! Test
  inventoryDisplay();
}else if (action === "Drop" || action === "D"){ // Removes an item from Backpack, add the item to the current room inventory
  console.log(`\nDROP\n`) //! Test
  let dropItem = await ask("`What item would you like to ${action}?");
  inventoryRemove(dropItem); // Removes an item from Backpack
  inventoryAdd(dropItem); // Add item to the current Room inventory
  }else if (action === "Take" || action === "T"){ //Add item to Backpack, remove from room inventory
    console.log(`\nTAKE\n`) //! Test
  let takeItem = await ask("`What item would you like to ${action}?");
  inventoryRemove(takeItem); // Removes an item from current Room inventory
  inventoryAdd(takeItem); // Add item to the Backpack
}else if (action === "Interact" || action === "I"){//Let's player Interact with an Object or person
  console.log(`\nINTERACT\n`) //! Test
  let npc = await ask("What are you going to interact with?");

}else {
  unknownPrompt(action);
}
}

// TODO Modify this function
// Response if the Player tries to take something they shouldn't
function immovableObject(){
  console.log(`That would be selfish. How will other students find their way?`);
}

function lockedOut(){
  console.log(`The door is locked. There is a keypad on the door handle.`);
}

function speakFriendAndEnter(password){
  if (secretName === password){
    console.log(`Success! The door opens.\nYou enter the foyer and the door shuts behind you.`);
  }else{
    console.log(`Bzzzzt! The door is still locked.`);
  }
}


async function introduction() {
  console.log(
    `\nThe sun rises peacefully on the small hamlet of Placeholder Village.\nThe birds are singing sweetly in the tress.\nThe morning dew glistens on the grass as the first rays of the sun reach the still earth below.\nA gentle breeze caresses your face as you briskly walk to the Town Triangle, hoping to get a jump on our morning chores.\n\nUpon entering the Town Triangle you see the village's heroic 'Adventurer' in a rather bad temper.\nThe 'Adventurer' groans loudly, before throwing his sword down upon the ground.\n    "I has't hadith enough!\n     Yee all kepeth requesting too much.\n     Th're is nary a way f'r me to slayeth a dragon with this steel!\n     I art to retire."\n\nIt appears the village is in need of a new heroic Adventurer...\n`
  );
  const welcomeMessage = `Do you pick up the Sword?\nYes (y) or No (n)\n>_`;
  let answer = await ask(welcomeMessage);
  answer = capitalizePlayerInput(answer);
  if (answer === "Yes" || answer === "Y") {
    console.log(
      `\n\nA villager, whom bares an uncanny resemblance to you apporaches.\n    "Greetings stranger!\n     It is not often a new adventurer enters our peaceful hamlet of Placeholder Village.`
    );
    let heroName = await ask(`     What is your name, adventurer?"\n>_`);
    console.log(
      `\n\n    "I see, your name is ${heroName},\n     Obviously, you were named after '${heroName} the Mighty,' the Hero of Legend\n     As I live and breathe, we are most fortunate for your arrival.\n\n     Recently, a missionary of rightous nuns was dispatched to aid our small hamlet.\n     However, as they were crossing a bridge over a ravine they were attacked by a horde of goblins.\n     The goblins cut the ropes of the bridge and the cart of nuns fell hundreds of feet into the sharp rocks below.\n\n     Your assistance is needed posthaste, ${heroName}!\n     Only you can raise enough gold to help us rebuild that broken bridge.`
    );
    return heroName;
  } else if (answer === "No" || answer === "N") {
    console.log(
      `You ignore the obvious call to adventure and go about your day.\nYou manage to finsih your chores early and have enough time to explore the woods near of town.\nThat is when you met ${secretName}, your soulmate.\nThe two of you began spending more and more time together.\neventually you were married, and moved into the lovliest cottage together by the outskirts of Placeholder Village.\nYou had 3 children, 2 dogs and a hampster.\nIt was an incredibly average and boring life.\n\nYou are so lucky you didn't pick up that sword.\nWho needs a life of adventure?\nNot you.\n\nYou are just a ridiculously normal person,\ndedicating your life to slightly above-average achievement,\ndespite your aggressive and all-consuming mundanity!\n\n`
    );
    process.exit();
  } else {
    unknownPrompt(answer);
    process.exit();
  }
}



// This function allows the player to change locations
async function locationMove() {
  let newLocation = "";

  while (newLocation !== "Exit") {
    newLocation = await ask(
      `You are currently standing in the ${currentLocation}.\nWhere would you like to go?\n\n`
    );
    newLocation = capitalizePlayerInput(newLocation);
    locationUpdate(newLocation);
  }
  process.exit();
}

// This function keeps track of where the player has moved to
function locationUpdate(newLocation) {
  let possibleOptionsToUpdateLocation =
    locations[currentLocation].possibleLocations;
  if (possibleOptionsToUpdateLocation.includes(newLocation) === true) {
    // Found a match and we are able to update the state in the function "locationMove"
    currentLocation = newLocation;
    computerResponse("\nYou have moved state!\n");
  } else if (newLocation === "Exit") {
    process.exit();
  } else {
    // If the player tries to move to an invalid location they get the following response
    computerResponse(
      `\nSorry hero, but you can't go there. From your current location you can go to the ${possibleOptionsToUpdateLocation.join(
        ", or the "
      )}\n`
    );
  }
}

//! Helper Function List (Alphabetical Order) - Bonus functions
// Capitolize the first letter of a word, and make the rest lower case
function capitalizeFirstLetter(word) {
  word = word.trim();
  let firstLetter1 = word.charAt(0).toUpperCase();
  let restOfWord1 = word.slice(1).toLowerCase();
  return firstLetter1 + restOfWord1;
}

// Capitalize the Player's Input
function capitalizePlayerInput(myString) {
  return (wordsCapitolized = myString
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" "));
}

//Color Changing Text
// Taken from state.js lesson
function computerResponse(string) {
  let white = "\033[0;39m";
  let yellow = "\033[0;33m";
  console.log(yellow + string + white);
}

// Help Menue
function helpMenu(){
  console.log(`You may perform any of the following actions:\n     Move to a new location (type "Move" or "m")\n     Interact with a Person or Item (type "Interact" or "i")\n     Check your Backpack's Inventory (type "Backpack" or "b")\n     Take an Item (type "Take" or "t")\n     Drop an Item (type "Drop" or "d")\n     Open the Help Screen (type "Help" or "h")\n     To Exit the Game at any time (type "Exit" or "e")\n\n`)
}

// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//For when the Player's input does NOT makes sense.
function unknownPrompt(input) {
  console.log(`Sorry, I don't know how to ${input}.\n`);
}
