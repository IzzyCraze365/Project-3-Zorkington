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

//! Classes Go Here = FIRST THING!!!
// A List of All Interactable Items
class Commodity {
  constructor({
    name,
    interact,
    followUp
  }) {
    this.name = name;
    this.interact = interact;
    this.followUp = followUp;
  }
}

// A List of All Interactable People
class Person {
  constructor({
    name,
    inventory,
    interact,
    followUp,
    status
  }) {
    this.interact = interact;
    this.inventory = inventory;
    this.name = name;
    this.followUp = followUp;
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

//! Object Definition
//Player Inventory
let hero = new Player(
  ["Bucket", "Sword", "Premium Horse Manure","Mounds Of Gold","Damaged Lute"],
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
    "\nThe Town Triangle\nThe center of a rustic hamlet of Placeholder Village in the shape of a triangle.\nIt is usually a vibrant hub of activity, but most people are still asleep. \nThe only inhabitants, presently present, are the Simple Villager and the Retired Adventurer.\n\nFrom here you can go to the Idiot's Inspiring Inn or travel into the Forlorn Forest Of Fatality.\n",
});

let idiotsInspiringInn = new Room({
  name: "Idiot's Inspiring Inn",
  doorLock: false,
  inventory: ["Bags Of Jewels"],
  interact: ["Innkeeper", "Obnoxious Patron", "Musician With A Broken Arm"], //"Black Eye" from interaction puzzle
  possibleLocations: ["Town Triangle", "Upstairs Room"],
  description:
    "\nThe Idiot's Inspiring Inn\nThe most popular tavern in the Placeholder Village, \nprimarily because it is the only tavern in Placeholder Village. \nThe Innkeeper behind the bar is preparing a meal for a Musician With A Broken Arm. \nIn the back of the room, an Obnoxious Patron is slovenly eating a meal.\nBags Of Jewels are scattered across the patron's table.\n\nFrom here you can head outside to the Town Triangle or go to the Upstairs Room.\n",
});
let upstairsRoom = new Room({
  name: "Upstairs Room",
  doorLock: false,
  inventory: [],
  interact: ["Sleeping Child", "Exhausted Parents"],
  possibleLocations: ["Idiot's Inspiring Inn"],
  description:
    "The Upstairs Room\nHeading up the stairs you come across\na pair of Exhausted Parents reading just outside of a room.\nInside the room, a Sleeping Child lays motionless on the bed.\n\nFrom here you can head back downstairs to the Idiot's Inspiring Inn.\n",
});

let forlornForestOfFatality = new Room({
  name: "Forlorn Forest Of Fatality",
  doorLock: false,
  inventory: ["Damaged Lute"],
  interact: ["Crooked Sign"],
  possibleLocations: ["Town Triangle", "Deep Woods Of Certain Doom"],
  description:
    "\nThe Forlorn Forest Of Fatality\nThe edge of the forest seems welcoming enough.\nAs you travel down the overgrown path\nyou see a Crooked Sign hanging on a weatherbeaten post.\n\nFrom here you can head back to safety in the Town Triangle or venture onward into the Deep Woods Of Certain Doom.\n",
});

let deepWoodsOfCertainDoom = new Room({
  name: "Deep Woods Of Certain Doom",
  doorLock: true,
  inventory: ["Pointless Rock"],
  interact: [],
  possibleLocations: ["Forlorn Forest Of Fatality", "Hag's Horrid Hoval", "Dragon's Keep"],
  description:
    "\nThe Deep Woods Of Certain Doom\nAs soon as you step into the shadows of the trees,\nyou can feel the warmth pulled from your body,\nas if by an unnatural force.\nYou know that this is the point of no return.\nYou steel as you continue to march onward.\n\nFrom here you can head back to the Forlorn Forest Of Fatality, follow the path to the Hag's Horrid Hoval or trek towards the Dragon's Keep.\n",
});

let hagsHorridHoval = new Room({
  name: "Hag's Horrid Hoval",
  doorLock: false,
  inventory: [],
  interact: ["Letterbox"], //Read from Letterbox "Pariah's Name"
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description:
    "\nThe Hag's Horrid Hoval\nA gnarled pile of sticks and mud twist together to form a makeshift shelter.\n Out of the braided husk of a dying tree sits a simple Letterbox.\n\nFrom here you can follow the path back to the Deep Woods Of Certain Doom.\n",
});

let dragonsKeep = new Room({
  name: "Dragon's Keep",
  doorLock: false,
  inventory: ["Dragon's Treasure"],
  interact: ["Dragon", "Mounds Of Gold", "Heaps Of Silver", "Pile Of Bones"],
  possibleLocations: ["Deep Woods Of Certain Doom"],
  description:
    "\nDragon's Keep\nThe air smells of ash, as you approach a dark cave.\nYou can see the light being reflected off of shimmering Mounds Of Gold, Heaps Of Silver.\nIn the back of the cave you spot a large red Dragon,sleeping upon a massive Pile Of Bones.\n\nFrom here you can run away and end up in the Deep Woods Of Certain Doom.\n",
});

let underworld = new Room({
  name: "Underworld",
  doorLock: "No Escape",
  inventory: [],
  interact: ["Grim Reaper"],
  possibleLocations: ["... funny there are no exits.","There is nowhere to go, there is no escape."],
  description:
    `\nYou could feel your consciousness leave your body.\nThen suddenly without warning you were here.\nYou know without a shadow of a doubt that you are in the Underworld.\n\nInside a dark cavern.  The only source of light...\na flickering torch held by a robed figure\nwhom you instinctually know is the personification of death, the Grim Reaper.\n`,
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
  Underworld: underworld
};


// List of Interactable Persons (People b/c Grammar)
let retiredAdventurer = new Person({
  name: "Retired Adventurer",
  inventory: ["Death's Scythe"],
  interact: `The Retired Adventurer looks you up and down.\n    "I daresay, I hath been retired only since morn.\n     Tis good of yee to taketh the mantle up.\n     Dost thou even hoist, ${heroName}?\n     Alas, I shalth spend me retirment plalying my favorite game...\n     Guess the Number.\n     Doth thou wisheth to play?\n     Nay? Then begone with yee!`,
  followUp: ()=>{},//TODO
  status: "Normal"
});

let simpleVillager = new Person({
  name: "Simple Villager",
  inventory: [],
  interact: `Simple Villager\n    "Thank you for all your assistance brave adventurer.\n     Your services are invaluable to us here in Placeholder Village.\n     Only you can save us from the horros that plague us.\n     Being stranded in a cozy little hamlet with no Gold to fix our broken bridge.\n     We lead a truly cursed life."`,
  followUp: ()=>{},
  status: "Normal"
});

let innkeeper = new Person({
  name: "Innkeeper",
  inventory: ["A Warm Meal"],
  interact: `Innkeeper\n    "Hallooo there, ${heroName}!\n     Welcome to the Idiot's Inspring Inn where our hospitality is as warm as our food.\n     Don't believe me?\n     Help yourself to A Warm Meal, and feel free to talk to anybody round these parts.\n     We're all the friendly sort,\n     of course the Musician With A Broken Arm seems a tad jumpy,\n     and the Obnoxious Patron back there is fixing to get into a tussel.`,
  followUp: ()=>{itemExchange(innkeeper.inventory, locations[currentLocation].inventory, "A Warm Meal");
    innkeeper.interact = `Innkeeper\n    "Welcome to the Idiot's Inspring Inn where our hospitality is as warm as our food.\n     Good to see you again, ${heroName}!\n     Feel free to talk to anybody round these parts.\n     We're the friendly sort of folk,\n     and we all have some nuggets of useful information.`},
  status: "Normal"
});

let obnoxiousPatron = new Person({
  name: "Obnoxious Patron",
  inventory: ["Black Eye"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  followUp: ()=>{},//TODO
  status: "Normal"
});

let musicianWithABrokenArm = new Person({
  name: "Musician With A Broken Arm",
  inventory: [],
  interact: `\nMusician With A Broken Arm\n    "You... who are you?!?!?!?!\n     It doesn't matter, you can't help me.\n     I was attacked by many a foul beast out in the Forlorn Forest Of Fatality!\n     They broke my arm, causing me to drop my Damaged Lute.\n     That will teach me to go out into the woods without a weapon.\n     I wish my instrument could be returned to me.\n     Music brings comfort.\n     Especially in these dark times where monsters hide amoung us...\n`,
  followUp: async ()=>{if(hero.inventory.includes("Damaged Lute")===true){
    colorChangeWords(`\nYou reach into your backpack and pull out the Musician's Damaged Lute.\nTears of joy appear in the Musician's eyes.\n\nMusician With A Broken Arm.\n    "My Broke Lute!\n    I never thought I would see it again!\n    Thank you so much, ${heroName}.\n    I shall use the power of music to fight against the darkness."\n\nThe musician plucks the one string on the lute that hasn't snapped.\nAn an eerie sound resonates through the room.\n\n    "I should tell you, one of the foul beasts from the woods has infiltrated out humble hamlet.\n    A creature of darkness has possessed the Sleeping Child.\n     But it will only make itself know to people like myself whom have been injured.\n`, highlightedWords);
    itemExchange(hero.inventory, musicianWithABrokenArm.inventory, "Damaged Lute");
    musicianWithABrokenArm.interact = `\nMusician With A Broken Arm.\n    "Thank you so much, ${heroName} for returning my Damaged Lute to me.\n     I should tell you, a creature of darkness has possessed the Sleeping Child.\n     But it will only make itself know to people, like myself, whom have been injured.\n`
  }
  },
  status: "Normal"
});

let sleepingChild = new Person({
  name: "Sleeping Child",
  inventory: ["Warm Apple Pie"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  followUp: ()=>{},//TODO
  status: "Normal"
});

let exhaustedParents = new Person({
  name: "Exhausted Parents",
  inventory: ["Town Map"],// Trade for Food
  interact: "\nA pair of weary parents are looking over a Town Map.\nThey are talking in hushed voices to about where to send their Sleeping Child to school.\nYou can barely hear their voices over the rumbling stomaches.\nThey should probably eat something.\n",
  followUp: ()=>{
    if(hero.inventory.includes("A Warm Meal")){
      colorChangeWords(`\nAs you approach them with food in hand the two look up at you.\n\nExhausted Parents\n    "Thank you for bringing us A Warm Meal, ${heroName}.\n     We have been so busy that we haven't had a chance to eat."\nThe Exhausted Parents drop the Town Map in the Upstairs Room.`, highlightedWords);
      itemExchange(hero.inventory, exhaustedParents.inventory, "A Warm Meal");
      itemExchange(exhaustedParents.inventory, locations[currentLocation].inventory, "Town Map");
      exhaustedParents.interact = `Exhausted Parents\n    "Thank you for bringing us A Warm Meal, ${heroName}.\n     We have been so busy that we haven't had a chance to eat."\nThe pair continue to eat their food, oblivious to the world around them.`
    }},
  status: "Normal"
});

let dragon = new Person({
  name: "Dragon",
  inventory: [],
  interact: "Something",//TODO
  followUp: ()=>{},//TODO
  status: "Normal"
});

let grimReaper = new Person({
  name: "Grim Reaper",
  inventory: ["Death's Scythe"], //Reward for Solving Puzzle
  interact: "Something",//TODO
  followUp: ()=>{},//TODO
  status: "Normal"
});

//All the Person's you can interact with
let interactPeople = {
  "Retired Adventurer": retiredAdventurer,
  "Simple Villager": simpleVillager,
  "Innkeeper": innkeeper,
  "Obnoxious Patron": obnoxiousPatron,
  "Musician With A Broken Arm":musicianWithABrokenArm,
  "Sleeping Child":sleepingChild,
  "Exhausted Parents":exhaustedParents,
  "Dragon":dragon,
  "Grim Reaper":grimReaper
}

// List of Interactable Items
let sword = new Commodity({
  name: "Sword",
  interact: "\nThe sword of an adventurer.\nThe blade is very sharp.\nA lethal weapon, to be sure.",
  followUp: ()=>{},
});

let bucket = new Commodity({
  name: "Bucket",
  interact: "\nA simple bucket, with a hole in the bottom.",
  followUp: ()=>{},
});

let premiumHorseManure = new Commodity({
  name: "Premium Horse Manure",
  interact: "\nIf it looks like shit,\nsmells like shit,\nand tastes like shit...\nIt'll make the crops grow tall!",
  followUp: ()=>{},
});

let aWarmMeal = new Commodity({
  name: "A Warm Meal",
  interact: "\nThe meal consists of a plain gruel.\nTasteless but still comforting.",
  followUp: ()=>{},
});

let BagsOfJewels = new Commodity({
  name: "Bags Of Jewels",
  interact: "A bag of priceless gems.",
  followUp: ()=>{},//TODO event goes here
});

let townMap = new Commodity({
  name: "Town Map",
  interact: "\nA Map of Placeholder Village and the surrounding forest.\nYou can't get lost with this in hand.",
  followUp: ()=>{},
});

let warmApplePie = new Commodity({
  name: "Warm Apple Pie",
  interact: "\nFresh baked pie is the best.\nEveryone loves apple pie.\nAnd people do crazy, death-defying things when they are in love.",
  followUp: ()=>{},
});

let damagedLute = new Commodity({
  name: "Damaged Lute",
  interact: "\nA musical instrument that has seen better days.\nIt appears to have been damaged by some kind of wild animal.",
  followUp: ()=>{},//TODO
});

let crookedSign = new Commodity({
  name: "Crooked Sign",
  interact: `\nA worn sign at the intersection of two paths.\nIt reads:\n    "Abandon hope all yee who enter here!\n     This forest are a living maze that you'll not want to be lost in.\n     There be deadly monsters within these trees."`,
  followUp: ()=>{},
});

let pointlessRock = new Commodity({
  name: "Pointless Rock",
  interact: "\nA simple rock that has no innate value.",
  followUp: ()=>{},
});

let letterbox = new Commodity({
  name: "Letterbox",
  interact: `\nA plain wooded box that is void of all letters.\nThe name "${secretName}" is carved into it.`,
  followUp: ()=>{},
});

let moundsOfGold = new Commodity({
  name: "Mounds Of Gold",
  interact: `\nYour eyes don't deceive you.  There are piles upon piles of Gold in this cave.\nIt is more wealth than you have ever dreamed of.\nCertainly enough to rebuild the town's broken bridge.\n\nYou daydream about the heroic feast the village will throw you.\n     The cooked meats assorted deserts.\n     The dancing into the night with an attractive villager.\n     Turns out that villager was your soulmate!\n     Eventually the two of you will be married\n     and have 3 children, 2 dogs and a hampster.\n     It was an incredibly wonderful life!\n\nOr it would have been...\nYou were so busy daydreaming about the Mounds Of Gold you did not realize\nthe Dragon had stirred from its slumber.\nIt attacked you while you were not paying attention...\n`,
  followUp: ()=>{
    hero.status = "Dead";
    locationUpdate("HERO-DEATH");},
});

let heapsOfSilver = new Commodity({
  name: "Heaps Of Silver",
  interact: `\nSilver!  You have never seen so many glittering coins.\nThere are heaps upon heaps of silver in this cave.\nIt is more wealth than you have ever dreamed of.\n\nYou daydream all that you could do with this silver.\n     Buy fancy armor and weapons.\n     Melt it down and have a statue crafted in your image.\n     You could make a large pile of coins and just go swimming in it!\n     There is nothing better than having all that silver in at your fingertips.\n     You will live like a king!\n\nOr you would have...\nSadly, you were so distracted by the Heaps Of Silver you did not realize\nthe Dragon had stirred from its slumber.\nIt attacked you while you were not paying attention...\n`,
  followUp: ()=>{
    hero.status = "Dead";
    locationUpdate("HERO-DEATH");},
});

let pileOfBones = new Commodity({
  name: "Pile Of Bones",
  interact: `\nAs you approach the back of the cave you see the massive Pile Of Bones littering the Dragon's Keep.\n  You look closely at the bones, and your heart starts to sink.\n     You get the feeling that you have been here before...\n     That you have tried to fight the Dragon and failed...\n     You realize that the bones on the floor are your bones!!!\n     You have gotten to this point so many times!!!\n     This is where you die!\n     Over and over again, as though your life is some twisted game\n\nYou push these thoughts out of your head.\n     "You are "${heroName} the Mighty" and you will succed!"\n Are your last thoughts as you turn to face the now awake Dragon.\nIt roars inches from your face.\nIts breath hot upon your face/\nThe roar was so loud and so sudden that you were scared to death...`, 
  followUp: ()=>{
    hero.status = "Dead (again)";
    locationUpdate("HERO-DEATH");},
});

let deathsScythe = new Commodity({
  name: "Death's Scythe",
  interact: "\nThe immortal weapon of the manifestation of Death.\nA single scratch would cause any creature to immediately perish.\nUse with caution.",
  followUp: ()=>{},
});

//All the Items you can interact with
let interactCommodity = {
  "Sword":sword,
  "Bucket":bucket,
  "Premium Horse Manure":premiumHorseManure,
  "A Warm Meal":aWarmMeal,
  "Bags Of Jewels":BagsOfJewels,
  "Town Map":townMap,
  "Warm Apple Pie":warmApplePie,
  "Damaged Lute":damagedLute,
  "Crooked Sign":crookedSign,
  "Pointless Rock":pointlessRock,
  "Letterbox":letterbox,
  "Mounds Of Gold":moundsOfGold,
  "Heaps Of Silver":heapsOfSilver,
  "Pile Of Bones":pileOfBones,
  "Death's Scythe":deathsScythe
}


titleScreen(); // Title Screen & Art

//! Function List
// This is the function that Plays the Game
async function start() {
  heroName = await introduction(); //The player will have to name themselves;
  //console.log(heroName, userInput, "Before Loop of Function\n"); //! TEST
  colorChangeWords(`\nYou, ${heroName} find yourself at the Beginning of a Grand Adventure!\nAnd it all starts right here in this quaint little village.\nIt is probably a good idea to "Look" around.\n(type "Help" to see a list of available actions.)`,highlightedWords);
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
    //console.log(`\nHELP\n`); //! Test
    helpMenu();
  } else if (action === "Move" || action === "M") {
    //console.log(`\nMOVE\n`); //! Test
    await locationMove();
  } else if (action === "Backpack" || action === "B") {
    // Displays inventory
    //console.log(`\nBACKPACK\n`); //! Test
    itemDisplay(hero.inventory);
  } else if (action === "Drop" || action === "D") {
    // Removes item from Backpack, Adds item to Current Room
    //console.log(`\nDROP\n`); //! Test
    let dropItem = await ask(`\nWhat would you like to drop?\n>_ `);
    droppingItem = capitalizePlayerInput(dropItem);
    if (hero.inventory.includes(droppingItem) === true) {
      itemExchange(
        hero.inventory,
        locations[currentLocation].inventory,
        droppingItem
      );
      colorChangeWords(`\nYou have dropped the ${droppingItem}.\n`,
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
    //console.log(`\nTAKE\n`); //! Test
    let takeItem = await ask(`\nWhat would you like to take?\n>_ `);
    tookenItem = capitalizePlayerInput(takeItem);
    if (locations[currentLocation].inventory.includes(tookenItem) === true) {
      itemExchange(
        locations[currentLocation].inventory,
        hero.inventory,
        tookenItem
      );
      colorChangeWords(
        `\nYou have picked up the ${tookenItem}.\n`,
        highlightedWords
      );
      }else if (locations[currentLocation].interact.includes(tookenItem) === true) { //Immovable Object example
        colorChangeWords(
          `\nWait ${heroName}!\nYou can't pick up the ${tookenItem}.\nWhat would the other townsfolk think if they saw you?\n`,
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
    //console.log(`\nINTERACT\n`); //! Test
    let interactObject = await ask(`\nWhat do you want to interact with?\n>_ `);
    interactableObject = capitalizePlayerInput(interactObject);
    if ((locations[currentLocation].inventory.includes(interactableObject) === true) ||(hero.inventory.includes(interactableObject))===true) {
      colorChangeWords(`\n${interactCommodity[interactableObject].interact}`, highlightedWords);
      interactCommodity[interactableObject].followUp();}
      else if ((locations[currentLocation].interact.includes(interactableObject) === true)) {
        colorChangeWords(`\n${interactPeople[interactableObject].interact}`, highlightedWords);
        interactPeople[interactableObject].followUp();}
        else {
          colorChangeWords(
            `\nSorry ${heroName}.  You can't interact with ${interactObject}.\n`,highlightedWords);
        }
  } else if (action === "Look" || action === "L") {
    //Let's player get a description of the area they are in
    //console.log(`\nLOOK\n`); //! Test
    colorChangeWords(
      `${locations[currentLocation].description}`,
      highlightedWords
    );
    if (locations[currentLocation].inventory.length > 0) {
      // checks to see if there is anything in the inventory in the room
      colorChangeWords(
        `Looking around, you see: ${locations[currentLocation].inventory.join(
          ", "
        )}\n`,
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
    //console.log(`\nSTATUS\n`); //! Test
    colorChangeWords(`Status: ${hero.status}\n`, highlightedWords);
  } else {
    unknownPrompt(action);
  }
}

// TODO Modify this function
// Response if the Player tries to take something they shouldn't

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
    `\nYour backpack contains the following items: ${player.join(", ")}`,
    highlightedWords
  );
}

// This is what allows "Take" and "Drop" to work with items
function itemExchange(giver, receiver, itemToBeExchanged) {
  //console.log("The Giver's Items before", giver); //! TEST
  //console.log("The Receiver's Items before", receiver); //! TEST
  let index = giver.indexOf(itemToBeExchanged);
  //console.log(`The ${itemToBeExchanged} is in position ${index}`); //! TEST
  if(index !== -1){
  giver.splice(index, 1);
  receiver.push(itemToBeExchanged);
  }
  //console.log("The Giver's Items after", giver); //! TEST
  //console.log("The Receiver's Items after", receiver); //! TEST
}

// This function allows the player to change locations
async function locationMove() {
  let newLocation = "";
  colorChangeWords(`You are currently standing in the ${currentLocation}.`,
    highlightedWords
  );
  newLocation = await ask(`Where would you like to go?\n>_ `);
  newLocation = capitalizePlayerInput(newLocation);
  locationUpdate(newLocation);
}

// This function keeps track of where the player has moved to
function locationUpdate(newLocation) {
  if(newLocation === "HERO-DEATH"){
    currentLocation = "Underworld";
    colorChangeWords(`\n${locations[currentLocation].description}`,highlightedWords); //Gives a description when you enter a new location.
    return currentLocation;
  }else{
  let possibleOptionsToUpdateLocation =
    locations[currentLocation].possibleLocations;
  if (possibleOptionsToUpdateLocation.includes(newLocation) === true) {// Found a match and we are able to update the state in the function "locationMove"
    if(locations[newLocation].doorLock === false){
    
    currentLocation = newLocation;
    //console.log("\nYou have moved state!\n"); //! TEST
    colorChangeWords(`\n${locations[currentLocation].description}`,highlightedWords); //Gives a description when you enter a new location.
    return currentLocation;
    }else{ //This is my Lock and Key Puzzle
      if(hero.inventory.includes("Sword")!==true){
        colorChangeWords(`\nYou venture into the darkness of the woodlands.\nTravelling around the forest without a weapon was a big mistake.\nYou quickly find yourself cornered by lions, tigers and bears in the woods.\n    "Oh My"\nIt doesn't take them long to gobble you up.\n\nIf only you had a Sword with you.`,
        highlightedWords
      );
      currentLocation = "Underworld";

      colorChangeWords(`\n${locations[currentLocation].description}`,highlightedWords); //Gives a description when you enter a new location.
      return currentLocation;
      }else{
      if(hero.inventory.includes("Town Map")===true){
        colorChangeWords(`\nYou follow the Town Map and find a hidden trail.`,
        highlightedWords
      );
      currentLocation = newLocation;
      colorChangeWords(`\n${locations[currentLocation].description}`,highlightedWords); //Gives a description when you enter a new location.
      return currentLocation;
      }else{
      colorChangeWords(`\nIn the darkness of the woods you get turned around...\n     Did you turn left or right?\n     What is that strange noise?\n     It sounds close!\nYou swing your Sword at a nearby bush!\n     It must have been the wind...\n     Haven't you already passed that skull-shaped rock five times?\n     You are lost in the woods!!!\n     And you end up right back where you began.\nA Town Map would be really useful in this situation.`,
        highlightedWords
      );
      return currentLocation;
    }
  }}
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
    `\nYou may perform any of the following actions:\n     Type "Move" or "m" = Move to a Nearby Location.\n     Type "Look" or "l" = Look around for Clues and Items.\n     Type "Interact" or "i" = Interact with a Person or Item\n     Type "Status" or "s" = Check your General Wellbeing \n     Type "Backpack" or "b" = Check your Backpack's Inventory\n     Type "Take" or "t" = Pick up an Item from this Location\n     Type "Drop" or "d" = Drop an Item to this Location\n     Type "Help" or "h" = Open the Help Screen\n     Type "Exit" or "e" = Exit the Game at any time`,
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