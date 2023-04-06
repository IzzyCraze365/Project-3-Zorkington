// Project: Week 3
// Zorkington - A Text Based Adventure
// John Isabella III


const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

// Classes Go Here FIRST THING!!!
class Room {
  constructor({ name, doorLock, inventory, interact, possibleLocations, description }) {
    this.description = description;
    this.doorLock = doorLock;
    this.interact = interact;
    this.inventory = inventory;
    this.name = name;
    this.possibleLocations = possibleLocations;
  }
}
  let townTriangle = new Room({
    name: "Town Triangle",
    doorLock: false,
    inventory: ["Sword"],
    interact: ["Retired Adventurer", "Simple Villager"],
    possibleLocations: ["Idiot's Inspiring Inn", "Forlorn Forest Of Fatality"],
    description: "You have now enter foyer....",
  });


  let idiotsInspiringInn = new Room({
    name: "Idiot's Inspiring Inn",
    doorLock: false,
    inventory: ["Food", "Black Eye"],
    interact: ["Inkeeper", "Obnoxious Mas"],
    possibleLocations: ["Town Triangle", "Upstairs Room"],
    description: "You have now enter foyer....",
  });

  let upstairsRoom = new Room({
    name: "Upstairs Room",
    doorLock: false,
    inventory: ["Map", "Pie"],
    interact: ["Sleeping Child", "Exhaused Parents"],
    possibleLocations: ["Idiot's Inspiring Inn"],
    description: "You have now enter foyer....",
  });

  
  let forlornForestOfFatality = new Room({
    name: "Forlorn Forest Of Fatality",
    doorLock: false,
    inventory: ["Discarded Amulet"],
    interact: ["Sleeping Child", "Exhaused Parents"],
    possibleLocations: ["Town Triangle", "Deep Woods Of Certain Doom"],
    description: "You have now enter foyer....",
  });

  let deepWoodsOfCertainDoom = new Room({
    name: "Deep Woods Of Certain Doom",
    doorLock: true,
    inventory: ["Pointless Rock"],
    interact: [],
    possibleLocations: ["Town Triangle", "Hag's Horrid Hoval", "Dragon's Keep"],
    description: "You have now enter foyer....",
  });

  let hagsHorridHoval = new Room({
    name: "Hag's Horrid Hoval",
    doorLock: false,
    inventory: ["Pariah's Name"],
    interact: ["Mailbox"],
    possibleLocations: ["Deep Woods Of Certain Doom"],
    description: "You have now enter foyer....",
  });

  let dragonsKeep = new Room({
    name: "Dragon's Keep",
    doorLock: false,
    inventory: ["Treasure"],
    interact: ["Dragon", "Pile of Gold"],
    possibleLocations: ["Deep Woods Of Certain Doom"],
    description: "You have now enter foyer....",
  });

  let underworld = new Room({
    name: "Underworld",
    doorLock: true,
    inventory: ["Death's Scythe"],
    interact: ["Grim Reaper"],
    possibleLocations: [],
    description: "You have now enter foyer....",
  });

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//TODO start OF TRAFFIC CODE
let currentLocation = "Town Triangle";

let locations = {
  "Town Triangle": townTriangle,
  "Idiot's Inspiring Inn": idiotsInspiringInn,
  "Upstairs Room": upstairsRoom,
  "Forlorn Forest Of Fatality": forlornForestOfFatality,
  "Deep Woods Of Certain Doom": deepWoodsOfCertainDoom,
  "Hag's Horrid Hoval": hagsHorridHoval,
  "Dragon's Keep": dragonsKeep,
  "Underworld": underworld,
};

async function start() {
  let newLocation = "";

  while (newLocation !== "Exit") {
    newLocation = await ask(
      `You are currently standing in the ${currentLocation}.\nWhere would you like to go?\n\n`
    );
    newLocation = capitalizePlayerInput(newLocation);
    updateLocation(newLocation);
  }
  process.exit();
}

start();

function updateLocation(newLocation) {
  let possibleOptionsToUpdateLocation = locations[currentLocation].possibleLocations;
  if (possibleOptionsToUpdateLocation.includes(newLocation) === true) {
    // Found a match and we are able to update the current state
    currentLocation = newLocation;
    computerResponse("\nYou have moved state!\n");
  } else if (newLocation === "Exit") {
    process.exit();
  } else {
    // Match was not found and display a message to the user that is an invalid entry.
    computerResponse(
      `\nSorry hero, but you can't go there. From your current location you can go to the ${possibleOptionsToUpdateLocation.join(
        ", or the "
      )}\n`
    );
  }
}
//TODO END OF TRAFFIC CODE

//TODO START OF CLASSES 'Pantry Example'
class LocationItems {
  constructor(initialItems) {
    this.inventory = initialItems;
  }

  // Prints the current Inventory
  displayInventory() {
    console.log("The current items are " + this.inventory);
  }

  //Adds an item to the inventory
  addInventory(itemToBeAdded) {
    this.inventory.push(itemToBeAdded);
  }

  //This checks to see if something was removed by comparing the length before and after
  removeInventory(itemToBeRemoved) {
    let snapshotInventorySize = this.inventory.length;
    this.inventory = this.inventory.filter((item) => item !== itemToBeRemoved);
    return snapshotInventorySize === this.inventory.length
      ? "No Items were removed"
      : "Item was removed";
  }
}

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

playerBackpack.addInventory("fries");
console.log(playerBackpack.removeInventory("beanz")); // "beanz" will not remove anything
playerBackpack.displayInventory();
//TODO END OF CLASSES
 */

start();


/* 
async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}

 */
//! Function List (Alphabetical Order)

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
