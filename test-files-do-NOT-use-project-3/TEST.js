
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


let sleepingChild = new Person({
  name: "Sleeping Child",
  inventory: ["Warm Apple Pie"], //Reward for Solving Puzzle
  interact: "A motionless child lays asleep on an oversized bed.",
  //Locked Door & puzzle challenge threshold
  followUp: ()=>{
    if (sleepingChild.status === "Freed"){
      colorChangeWords(`It looks as though the Sleeping Child is finally resting peacfully.`, highlightedWords
      );
    }
    else if (sleepingChild.status === "Possessed"){
      colorChangeWords(`Suddenly, the child's body snaps upright!\nThe head of the Sleeping Child begins to spin in a circle as vomit is spewed in every direction.\n\nDemonic Voice\n    "Look who's back!\n     Let me guess, ${heroName}.\n     You think you know what my name is.`,highlightedWords
        );
    }
    else if(hero.status === "Black Eye"){
      colorChangeWords(`Your Black Eye begins to throb as you look upon the still form of the Sleeping Child.\nSuddenly, the child's body snaps upright, eyes flashing wide open!\nThe Sleeping Child opens their mouth makes an otherworldly sound!\n\nDemonic Voice\n    "Well, well well,\n     What have we here?\n     Its little ${heroName}, pretending to be an Adventurer.\n     You simple fool, you have no idea how powerful names are.\n     And I will stay locked inside this Sleeping Child unless you say my name.`,highlightedWords
        );
        sleepingChild.status = "Possessed";
    }else{}
  },
  status: "Normal" //Options Normal, Possessed, Freed
});
let i = 0;

let interactPeople = {
  "Sleeping Child":sleepingChild,
}



sleepingChild.status = "Possessed";
while( i < 10 ){
  if(sleepingChild.status === "Possessed"){
    console.log("Test 1");
    console.log(sleepingChild.interact);
    sleepingChild.followUp;  
    console.log("Test 2");
    sleepingChild.status = "Body";
    i++
}else{
  console.log("Test 3");
  console.log(sleepingChild.interact);
  sleepingChild.followUp;
  console.log("Test 4");
  sayMyName();
  console.log("Test 5");
  i++
  }
}
// Password Name Gane
async function sayMyName() {
  let nameGuess = await ask(`\n     Come on,\n     Say my name!\n>_ `);
  nameGuess = capitalizePlayerInput(nameGuess);
  //highlightedWords.push(nameGuess);
  if (secretName === nameGuess) {
    colorChangeWords(
      `\nDemonic Voice\n     "What?!\n     No!!!!\n     How could you possibly know that my name is ${secretName}.\nThe body of the Sleeping Child contorts\nas the Demonic Voice screams in agony.\n\nSleeping Child\n    "Than you for freeing my spirit, ${heroName}.\n     Now I can finally get some much needed rest.\n     Please, accept this small token of my appreciation."\n\nThe Sleeping Child reaches under the bedsheets and presents you with a freshly-baked Warm Apple Pie,\nplacing it on the foot of the bed before returning to a peaceful sleep.`,highlightedWords
      );
      itemExchange(sleepingChild.inventory, locations[currentLocation].inventory, "Warm Apple Pie");
      sleepingChild.status = "Freed";
  } else {
    colorChangeWords(`\nDemonic Voice\n    "Hahahahahahaha\n     Wrong!!!\n     You are a fool ${heroName}.\n     My name is not ${nameGuess}.\n     I will remain inside this Sleeping Child until the end of days.\n     Mwahahahahahaha.\n\nThe Demonic Voice mocks you as the body of the Sleeping Child goes rigid\nand returns to its peaceful state.`,highlightedWords);
    sleepingChild.status = "Possessed";
  }
}