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
    "\nThe Town Triangle\nThe center of a rustic hamlet of Placeholder Village in the shape of a triangle.\nIt is usually a vibrant hub of activity, but most people are still asleep. \nThe only inhabitants, presently present, are the Simple Villager and the Retired Adventurer.\n\nFrom here you can go to the Idiot's Inspiring Inn or travel into the Forlorn Forest Of Fatality.\n",
});

let idiotsInspiringInn = new Room({
  name: "Idiot's Inspiring Inn",
  doorLock: false,
  inventory: ["Bags Of Jewels"],
  interact: ["Inkeeper", "Obnoxious Patron", "Musician With A Broken Arm"], //"Black Eye" from interaction puzzle
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
    `\nYou could feel your consciousness leave your body.\nThen suddenly without warning you were here.\nYou know without a shadow of a doubt that you are in the Underworld.\n\nInside a dark cavern.  The only source of light...\na flickering torch held by a robed figure\nwhom you instinctually know is the personification of death, the Grim Reaper.`,
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

//All the Person's you can interact with
let interactPeople = {
  "Retired Adventurer": retiredAdventurer,
  "Simple Villager": simpleVillager,
  "Inkeeper": inkeeper,
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
});

let bucket = new Commodity({
  name: "Bucket",
  interact: "highlightedWords",
});

let premiumHorseManure = new Commodity({
  name: "Premium Horse Manure",
  interact: "\nIf it looks like shit,\nsmells like shit,\nand tastes like shit...\nIt'll make the crops grow tall!"
});

let aWarmMeal = new Commodity({
  name: "A Warm Meal",
  interact: "\nThe meal consists of a plain gruel.\nTasteless but still comforting."
});

let BagsOfJewels = new Commodity({
  name: "Bags Of Jewels",
  interact: "\n Event Goes here"//TODO
});

let townMap = new Commodity({
  name: "Town Map",
  interact: "\nA Map of Placeholder Village and the surrounding forest.\nYou can't get lost with this in hand."
});

let warmApplePie = new Commodity({
  name: "Warm Apple Pie",
  interact: "\nFresh baked pie is the best.\nEveryone loves apple pie.\nAnd people do crazy, death-defying things when they are in love."
});

let damagedLute = new Commodity({
  name: "Damaged Lute",
  interact: "\nA musical instrument that has seen better days."
});

let crookedSign = new Commodity({
  name: "Crooked Sign",
  interact: `\nA worn sign at the intersection of two paths.\nIt reads:\n    "Abandon hope all yee who enter here!\n     This forest are a living maze that you'll not want to be lost in.\n     There be deadly monsters within these trees."`
});

let pointlessRock = new Commodity({
  name: "Pointless Rock",
  interact: "\nA simple rock that has no innate value."
});

let letterbox = new Commodity({
  name: "Letterbox",
  interact: function(){if(this.name === "Letterbox"){console.log(`\nA plain wooded box that is void of all letters.\nThe name  is carved into it.`);}else{}
}});

let moundsOfGold = new Commodity({
  name: "Mounds Of Gold",
  interact: `\nYour eyes don't deceive you.  There are piles upon piles of Gold in this cave.\nIt is more wealth than you have ever dreamed of.\nCertainly enough to rebuild the town's broken bridge.\n\nYou daydream about the heroic feast the village will throw you.\n     The cooked meats assorted deserts.\n     The dancing into the night with an attractive villager.\n     Turns out that villager was your soulmate!\n     Eventually the two of you will be married\n     and have 3 children, 2 dogs and a hampster.\n     It was an incredibly wonderful life!\n\nOr it would have been...\nYou were so busy daydreaming you did not realize\nthe Dragon had stirred from its slumber.\nIt attacked you while you were not paying attention...\n\n`
});

let heapsOfSilver = new Commodity({
  name: "Heaps Of Silver",
  interact: "\nA simple rock that has no innate value."//TODO no if statement just end
});

let pileOfBones = new Commodity({
  name: "Pile Of Bones",
  interact: "\nA simple rock that has no innate value."//TODO no if statement just end
});

let deathsScythe = new Commodity({
  name: "Death's Scythe",
  interact: "\nThe immortal weapon of the manifestation of Death.\nA single scratch would cause any creature to immediately perish.\nUse with caution."
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

letterbox.interact;
console.log(sword.interact);

//letterbox.interact;