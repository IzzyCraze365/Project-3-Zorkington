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
// A List of All Interactable Items
class Commodity {
  constructor({
    name,
    interact
  }) {
    this.name = name;
    this.interact = interact;
  }
}

// A List of All Interactable People
class Person {
  constructor({
    name,
    inventory,
    interact,
    status
  }) {
    this.interact = interact;
    this.inventory = inventory;
    this.name = name;
    this.status = status;
  }
}

// Player's Backpack Inventory Management
class Player {
  constructor(inventory, status) {
    this.inventory = inventory;
    this.status = status;
  }
}

//List of all the Locations in this Adventure, containing everything they have.
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
//Player Inventory
let hero = new Player(
  ["Bucket", "Sword", "Premium Horse Manure"],
  "Healthy."
); // Starts with a Sword & useless Junk, Status is Healthy

// The following is a list of Objects that define our rooms.
let townTriangle = new Room({
  name: "Town Triangle",
  doorLock: false,
  inventory: [],
  interact: ["Retired Adventurer", "Simple Villager"],
  possibleLocations: ["Idiot's Inspiring Inn", "Forlorn Forest Of Fatality"],
  description:
    "The center of a rustic hamlet of Placeholder Village in the shape of a triangle.\nIt is usually a vibrant hub of activity, but most people are still asleep. \nThe only inhabitants, presently present, are the Simple Villager and the Retired Adventurer.\n",
});

let idiotsInspiringInn = new Room({
  name: "Idiot's Inspiring Inn",
  doorLock: false,
  inventory: ["Bags Of Jewels"],
  interact: ["Inkeeper", "Obnoxious Patron", "Musician With A Broken Arm"], //"Black Eye" from interaction puzzle
  possibleLocations: ["Town Triangle", "Upstairs Room"],
  description:
    "The most popular tavern in the Placeholder Village, \nprimarily because it is the only tavern in Placeholder Village. \nThe Innkeeper behind the bar is preparing a meal for a Musician With A Broken Arm. \nIn the back of the room, an Obnoxious Patron is slovenly eating a meal.\nBags Of Jewels are scattered across the patron's table.",
});
let upstairsRoom = new Room({
  name: "Upstairs Room",
  doorLock: false,
  inventory: [],
  interact: ["Sleeping Child", "Exhausted Parents"],
  possibleLocations: ["Idiot's Inspiring Inn"],
  description:
    "Heading up the stairs you come across\na pair of Exhausted Parents reading just outside of a room.\nInside the room, a Sleeping Child lays motionless on the bed.",
});

let forlornForestOfFatality = new Room({
  name: "Forlorn Forest Of Fatality",
  doorLock: false,
  inventory: ["Damaged Lute"],
  interact: ["Crooked Sign"],
  possibleLocations: ["Town Triangle", "Deep Woods Of Certain Doom"],
  description:
    "The edge of the forest seems welcoming enough.\nAs you travel down the overgrown path\nyou see a Crooked Sign hanging on a weatherbeaten post.",
});

let deepWoodsOfCertainDoom = new Room({
  name: "Deep Woods Of Certain Doom",
  doorLock: true,
  inventory: ["Pointless Rock"],
  interact: [],
  possibleLocations: ["Town Triangle", "Hag's Horrid Hoval", "Dragon's Keep"],
  description:
    "As soon as you step into the shadows of the trees,you can feel the warmth pulled from your body,\nas if by an unnatural force.\nYou know that this is the point of no return.\nYou steel as you continue to march onward.",
});

let hagsHorridHoval = new Room({
  name: "Hag's Horrid Hoval",
  doorLock: false,
  inventory: [],
  interact: ["Letterbox"], //Read from Letterbox "Pariah's Name"
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description:
    "A gnarled pile of sticks and mud twist together to form a makeshift shelter.\n Out of the braided husk of a dying tree sits a simple Letterbox.",
});

let dragonsKeep = new Room({
  name: "Dragon's Keep",
  doorLock: false,
  inventory: ["Dragon's Treasure"],
  interact: ["Dragon", "Mounds Of Gold", "Heaps Of Silver", "Pile Of Bones"],
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description:
    "The air smells of ash, as you approach a dark cave.\nYou can see the light being reflected off of shimmering Mounds Of Gold, Heaps Of Silver.\nIn the back of the cave you spot a large red Dragon,resting upon a massive Pile Of Bones.",
});

let underworld = new Room({
  name: "Underworld",
  doorLock: true,
  inventory: [],
  interact: ["Grim Reaper"],
  possibleLocations: [],
  description:
    "You could feel your consciousness leave your body.\nThen suddenly without warning you were here.\nInside a dark cavern.  The only source of light...\na flickering torch held by a robed figure\nwhom you instinctually know is the personification of death, the Grim Reaper.",
});

// List of Interactable Persons (People b/c Grammar)
let retiredAdventurer = new Person({
  name: "Retired Adventurer",
  inventory: ["Death's Scythe"],
  interact: "Something",//TODO
  status: "Normal"
});

let simpleVillager = new Person({
  name: "Simple Villager",
  inventory: [],
  interact: "Something",//TODO
  status: "Normal"
});

let inkeeper = new Person({
  name: "Inkeeper",
  inventory: ["A Warm Meal"],
  interact: "Something",//TODO
  status: "Normal"
});

let obnoxiousPatron = new Person({
  name: "Obnoxious Patron",
  inventory: ["Black Eye"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  status: "Normal"
});

let musicianWithABrokenArm = new Person({
  name: "Musician With A Broken Arm",
  inventory: [],
  interact: "Something",//TODO
  status: "Normal"
});

let sleepingChild = new Person({
  name: "Sleeping Child",
  inventory: ["Warm Apple Pie"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  status: "Normal"
});

let exhaustedParents = new Person({
  name: "Exhausted Parents",
  inventory: ["Town Map"],// Trade for Food
  interact: "Something",//TODO
  status: "Normal"
});

let dragon = new Person({
  name: "Dragon",
  inventory: [],
  interact: "Something",//TODO
  status: "Normal"
});

let grimReaper = new Person({
  name: "Grim Reaper",
  inventory: ["Death's Scythe"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  status: "Normal"
});

// List of Interactable Items
let sword = new Commodity({
  name: "Sword",
  interact: "The sword of an adventurer.\nThe blade is very sharp.\nA lethal weapon, to be sure."
});

let bucket = new Commodity({
  name: "Bucket",
  interact: "A simple bucket, with a hole in the bottom."
});

let premiumHorseManure = new Commodity({
  name: "Premium Horse Manure",
  interact: "If it looks like shit,\nsmells like shit,\nand tastes like shit...\nIt'll make the crops grow tall!"
});

let aWarmMeal = new Commodity({
  name: "A Warm Meal",
  interact: "The meal consists of a plain gruel.\nTasteless but still comforting."
});

let BagsOfJewels = new Commodity({
  name: "Bags Of Jewels",
  interact: "Something"//TODO
});

let townMap = new Commodity({
  name: "Town Map",
  interact: "A Map of Placeholder Village and the surrounding forest.\nYou can't get lost with this in hand."
});

let warmApplePie = new Commodity({
  name: "Warm Apple Pie",
  interact: "Fresh baked pie is the best.\nEveryone loves apple pie.\nAnd people do crazy, death-defying things when they are in love."
});

let damagedLute = new Commodity({
  name: "Damaged Lute",
  interact: "A musical instrument that has seen better days."
});

let crookedSign = new Commodity({
  name: "Crooked Sign",
  interact: `A worn sign at the intersection of two paths.\nIt reads:\n    "Abandon hope all yee who enter here!\n     This forest are a living maze that you'll not want to be lost in.\n     There be deadly monsters within these trees."`
});

let pointlessRock = new Commodity({
  name: "Pointless Rock",
  interact: "A simple rock that has no innate value."
});

let letterbox = new Commodity({
  name: "Letterbox",
  interact: `A plain wooded box that is void of all letters.\nThe name "${secretName}" is carved into it.`
});

let moundsOfGold = new Commodity({
  name: "Mounds Of Gold",
  interact: "A simple rock that has no innate value."//TODO
});

let heapsOfSilver = new Commodity({
  name: "Heaps Of Silver",
  interact: "A simple rock that has no innate value."//TODO
});

let pileOfBones = new Commodity({
  name: "Pile Of Bones",
  interact: "A simple rock that has no innate value."//TODO
});

let deathsScythe = new Commodity({
  name: "Death's Scythe",
  interact: "The immortal weapon of the manifestation of Death.\nA single scratch would cause any creature to immediately perish.\nUse with caution."
});

// Variables
let currentLocation = "Town Triangle"; // This updates as the player moves
let heroName = ""; // Currently their is no input
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
  Underworld: underworld,
};

// A list of words that I want to have in Yellow Text
let highlightedWords = [
  secretName,
  /*Hero Actions*/
  `"Move"`,
  `"m"`,
  `"Backpack"`,
  `"b"`,
  `"Look"`,
  `"l"`,
  `Items`,
  `"Status"`,
  `"s"`,
  `Healthy`,
  `"Interact"`,
  `"i"`,
  `"Take"`,
  `"t"`,
  `"Drop"`,
  `"d"`,
  `"Help"`,
  `"h"`,
  `"Exit"`,
  `"e"`,
  /*Characters & Interact spots*/
  `Adventurer`,
  `Retired`,
  `Simple Villager`,
  `Innkeeper`,
  `Obnoxious Patron`,
  `Musician With A Broken Arm`,
  `Sleeping Child`,
  `Exhausted Parents`,
  `Crooked Sign`,
  `Letterbox`,
  `Dragon`,
  `Mounds Of Gold`,
  `Heaps Of Silver`,
  `Pile Of Bones`,
  `Grim Reaper`,
  /*Inventory Items*/
  `Sword`,
  `Gold`,
  `Premium Horse Manure`,
  `Bucket`,
  `Bags Of Jewels`,
  `A Warm Meal`,
  `Black Eye`,
  `Town Map`,
  `Warm Apple Pie`,
  `Damaged Lute`,
  `Pointless Rock`,
  `Dragon's Treasure`,
  `Death's Scythe`,
  /*Locations*/
  `Placeholder Village`,
  `Town Triangle`,
  `Idiot's Inspiring Inn`,
  `Upstairs Room`,
  `Forlorn Forest Of Fatality`,
  `Deep Woods Of Certain Doom`,
  `Hag's Horrid Hoval`,
  `Dragon's Keep`,
  `Underworld`,
];

titleScreen(); // Title Screen & Art

//! Function List
// This is the function that Plays the Game
async function start() {
  heroName = await introduction(); //The player will have to name themselves;
  //console.log(heroName, userInput, "Before Loop of Function\n"); //! TEST
  colorChangeWords(
    `(type "Help" to see a list of available actions.)`,
    highlightedWords
  );
  while (userInput !== "Exit") {
    colorChangeWords(
      `\nYou are currently in the ${currentLocation}.`,
      highlightedWords
    );
    userInput = await heroAction(heroName);
    //console.log(heroName, userInput, "Inside Loop of Function\n"); //! TEST
  }
}

async function heroAction(heroName) {
  const heroAction = `What would you like to do, ${heroName}?\n>_ `;
  let action = await ask(heroAction);
  action = capitalizePlayerInput(action);
  if (action === "Exit" || action === "E") {
    colorChangeWords(
      `\nThis is where the Adventure of ${heroName} comes to an end.\n`,
      highlightedWords
    );
    process.exit();
  } else if (action === "Help" || action === "H") {
    //Brings up the Help Menu
    console.log(`\nHELP\n`); //! Test
    helpMenu();
  } else if (action === "Move" || action === "M") {
    console.log(`\nMOVE\n`); //! Test
    await locationMove();
  } else if (action === "Backpack" || action === "B") {
    // Displays inventory
    console.log(`\nBACKPACK\n`); //! Test
    itemDisplay(hero.inventory);
  } else if (action === "Drop" || action === "D") {
    // Removes item from Backpack, Adds item to Current Room
    console.log(`\nDROP\n`); //! Test
    let dropItem = await ask(`What item would you like to drop?\n>_ `);
    droppingItem = capitalizePlayerInput(dropItem);
    if (hero.inventory.includes(droppingItem) === true) {
      ItemExchange(
        hero.inventory,
        locations[currentLocation].inventory,
        droppingItem
      );
      colorChangeWords(
        `You have dropped the ${droppingItem}.\n`,
        highlightedWords
      );
    } else {
      colorChangeWords(
        `\nSorry ${heroName}, you don't have a ${dropItem} to drop.\n`,
        highlightedWords
      );
    }
  } else if (action === "Take" || action === "T") {
    // Adds item to Backpack, Removes item from Current Room
    console.log(`\nTAKE\n`); //! Test
    let takeItem = await ask(`What item would you like to take?\n>_ `);
    tookenItem = capitalizePlayerInput(takeItem);
    if (locations[currentLocation].inventory.includes(tookenItem) === true) {
      ItemExchange(
        locations[currentLocation].inventory,
        hero.inventory,
        tookenItem
      );
      colorChangeWords(
        `You have picked up the ${tookenItem}.\n`,
        highlightedWords
      );
    } else {
      colorChangeWords(
        `\nSorry ${heroName}, there is no ${takeItem} for you to take.\n`,
        highlightedWords
      );
    }
  } else if (action === "Interact" || action === "I") {
    //Let's player Interact with an Object or person
    console.log(`\nINTERACT\n`); //! Test
    let npc = await ask(`What are you going to interact with?\n`);
  } else if (action === "Look" || action === "L") {
    //Let's player get a description of the area they are in
    console.log(`\nLOOK\n`); //! Test
    colorChangeWords(
      `${locations[currentLocation].description}`,
      highlightedWords
    );
    if (locations[currentLocation].inventory.length > 0) {
      // checks to see if there is anything in the inventory in the room
      colorChangeWords(
        `Looking around, you see: ${locations[currentLocation].inventory.join(
          ", "
        )}`,
        highlightedWords
      );
    } else {
      colorChangeWords(
        `Looking around, you don't see any items.`,
        highlightedWords
      );
    }
  } else if (action === "Status" || action === "S") {
    //Gives the player a quick check of character health
    console.log(`\nSTATUS\n`); //! Test
    colorChangeWords(`Status: ${hero.status}\n`, highlightedWords);
  } else {
    unknownPrompt(action);
  }
}

// TODO Modify this function
// Response if the Player tries to take something they shouldn't
function immovableObject() {
  colorChangeWords(
    `That would be selfish. How will other students find their way?`,
    highlightedWords
  );
}

function lockedOut() {
  colorChangeWords(
    `The door is locked. There is a keypad on the door handle.`,
    highlightedWords
  );
}

function speakFriendAndEnter(password) {
  if (secretName === password) {
    colorChangeWords(
      `Success! The door opens.\nYou enter the foyer and the door shuts behind you.`,
      highlightedWords
    );
  } else {
    colorChangeWords(`Bzzzzt! The door is still locked.`);
  }
}

async function introduction() {
  colorChangeWords(
    `\nThe sun rises peacefully on the small hamlet of Placeholder Village.\nThe birds are singing sweetly in the tress.\nThe morning dew glistens on the grass as the first rays of the sun reach the still earth below.\nA gentle breeze caresses your face as you briskly walk to the Town Triangle, hoping to get a jump on our morning chores.\n\nUpon entering the Town Triangle you see the village's heroic Adventurer in a rather bad temper.\nThe Adventurer groans loudly, before throwing his Sword down upon the ground.\n    "I has't hadith enough!\n     Yee all kepeth requesting too much.\n     Th're is nary a way f'r me to slayeth a Dragon with this steel!\n     I art to retire."\n\nIt appears the village is in need of a new heroic Adventurer...\n\nDo you pick up the Sword?`,
    highlightedWords
  );
  const welcomeMessage = `Yes (y) or No (n)\n>_ `;
  let answer = await ask(welcomeMessage);
  answer = capitalizePlayerInput(answer);
  if (answer === "Yes" || answer === "Y") {
    colorChangeWords(
      `\nA Simple Villager, whom bares an uncanny resemblance to you apporaches.\n    "Greetings stranger!\n     It is not often a new adventurer enters our peaceful hamlet of Placeholder Village.`,
      highlightedWords
    );
    let heroName = await ask(`     What is your name, adventurer?"\n>_ `);
    colorChangeWords(
      `\nSimple Villager\n    "I see, your name is ${heroName},\n     Obviously, you were named after '${heroName} the Mighty,' the Hero of Legend\n     As I live and breathe, we are most fortunate for your arrival.\n\n     Recently, a missionary of rightous nuns was dispatched to aid our small hamlet.\n     However, as they were crossing a bridge over a ravine they were attacked by a horde of goblins.\n     The goblins cut the ropes of the bridge and the cart of nuns fell hundreds of feet into the sharp rocks below.\n\n     Your assistance is needed posthaste, ${heroName}!\n     Only you can raise enough Gold to help us rebuild that broken bridge."\n`,
      highlightedWords
    );
    return heroName;
  } else if (answer === "No" || answer === "N") {
    colorChangeWords(
      `\nYou ignore the obvious call to adventure and go about your day.\nYou manage to finsih your chores early and have enough time to explore the woods near of town.\nThat is when you met ${secretName}, your soulmate.\n\nThe two of you began spending more and more time together.\neventually you were married, and moved into the lovliest cottage together by the outskirts of Placeholder Village.\nYou had 3 children, 2 dogs and a hampster.\nIt was an incredibly average and boring life.\n\nYou are so lucky you didn't pick up that Sword.\nWho needs a life of adventure?\nNot you.\n\nYou are just a ridiculously normal person,\ndedicating your life to slightly above-average achievement,\ndespite your aggressive and all-consuming mundanity!\n\n`,
      highlightedWords
    );
    process.exit();
  } else {
    unknownPrompt(answer);
    process.exit();
  }
}

// This is what allows "Take" and "Drop" to work with items
function itemDisplay(player) {
  colorChangeWords(
    `Your backpack contains the following items: ${player.join(", ")}`,
    highlightedWords
  );
}

// This is what allows "Take" and "Drop" to work with items
function ItemExchange(giver, receiver, itemToBeExchanged) {
  console.log("The Giver's Items before", giver); //! TEST
  console.log("The Receiver's Items before", receiver); //! TEST
  let index = giver.indexOf(itemToBeExchanged);
  console.log(`The ${itemToBeExchanged} is in position ${index}`); //! TEST
  giver.splice(index, 1);
  receiver.push(itemToBeExchanged);
  console.log("The Giver's Items after", giver); //! TEST
  console.log("The Receiver's Items after", receiver); //! TEST
}

// This function allows the player to change locations
async function locationMove() {
  let newLocation = "";
  colorChangeWords(
    `You are currently standing in the ${currentLocation}.`,
    highlightedWords
  );
  newLocation = await ask(`Where would you like to go?\n>_ `);
  newLocation = capitalizePlayerInput(newLocation);
  locationUpdate(newLocation);
}

// This function keeps track of where the player has moved to
function locationUpdate(newLocation) {
  let possibleOptionsToUpdateLocation =
    locations[currentLocation].possibleLocations;
  if (possibleOptionsToUpdateLocation.includes(newLocation) === true) {
    // Found a match and we are able to update the state in the function "locationMove"
    currentLocation = newLocation;
    //console.log("\nYou have moved state!\n"); //! TEST
    colorChangeWords(
      `\n${locations[currentLocation].description}`,
      highlightedWords
    ); //Gives a description when you enter a new location.
    return currentLocation;
  } else if (newLocation === "Exit") {
    process.exit();
  } else {
    // If the player tries to move to an invalid location they get the following response
    colorChangeWords(
      `\nSorry ${heroName}, but you can't go there.\nFrom your current location you can go to\nthe ${possibleOptionsToUpdateLocation.join(
        ", or the "
      )}\n`,
      highlightedWords
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

//Color Changing Text so some words pop out easier
function colorChangeWords(string, highlightedWords) {
  let white = "\033[0;39m";
  let yellow = "\033[0;33m";
  highlightedWords.forEach((word) => {
    string = string.replaceAll(word, yellow + word + white);
  });
  console.log(white + string + white);
}

// Help Menue
function helpMenu() {
  colorChangeWords(
    `You may perform any of the following actions:\n     Move to a Nearby Location (type "Move" or "m")\n     Look around the Area for Items (type "Look" or "l")\n     Interact with a Person or Item (type "Interact" or "i")\n     Check your General Wellbeing (type "Status" or "s")\n     Check your Backpack's Inventory (type "Backpack" or "b")\n     Take an Item from this Location (type "Take" or "t")\n     Drop an Item to this Location (type "Drop" or "d")\n     Open the Help Screen (type "Help" or "h")\n     Exit the Game at any time (type "Exit" or "e")\n`,
    highlightedWords
  );
}

// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//For when the Player's input does NOT makes sense.
function unknownPrompt(input) {
  colorChangeWords(
    `\nSorry ${heroName}, you don't know how to ${input}.\n`,
    highlightedWords
  );
}


//! Premium Functions
//This is a Function that Shows the Game Start Screen
// Used " https://fsymbols.com/generators/carty/ "
async function titleScreen() {
  console.log(`From the mind of John I.

░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗  ████████╗░█████╗░
░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝  ╚══██╔══╝██╔══██╗
░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░  ░░░██║░░░██║░░██║
░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░  ░░░██║░░░██║░░██║
░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗  ░░░██║░░░╚█████╔╝
░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝  ░░░╚═╝░░░░╚════╝░

 ██████╗░░█████╗░██████╗░██╗░░██╗██╗███╗░░██╗░██████╗░████████╗░█████╗░███╗░░██╗
 ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██║████╗░██║██╔════╝░╚══██╔══╝██╔══██╗████╗░██║
 ██║░░██║██║░░██║██████╔╝█████═╝░██║██╔██╗██║██║░░██╗░░░░██║░░░██║░░██║██╔██╗██║
 ██║░░██║██║░░██║██╔══██╗██╔═██╗░██║██║╚████║██║░░╚██╗░░░██║░░░██║░░██║██║╚████║
 ██████╔╝╚█████╔╝██║░░██║██║░╚██╗██║██║░╚███║╚██████╔╝░░░██║░░░╚█████╔╝██║░╚███║
 ╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░░░░╚═╝░░░░╚════╝░╚═╝░░╚══╝
`);
colorChangeWords(
  `\nWould you like to Play this Game?`,
  highlightedWords
);
const titleQuestion = `Yes (y) or No (n)\n>_ `;
let playGame = await ask(titleQuestion);
playGame = capitalizePlayerInput(playGame);
if (playGame === "Yes" || playGame === "Y") {
  start();
} else if (playGame === "No" || playGame === "N") {
  colorChangeWords(
    `\nA Grand Adventure Awaits You...\nNext Time You Choose to Play!\nGood-bye.\n`,
    highlightedWords
  );
  process.exit();
} else {
  unknownPrompt(answer);
  process.exit();
}
}