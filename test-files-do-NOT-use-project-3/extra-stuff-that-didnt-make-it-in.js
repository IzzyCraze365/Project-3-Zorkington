/*


//! Text Art
//I found this art at https://ascii.co.uk/art/skulls
// The spacing made it hard to add this into the game.

const skull1=`
     _;~)                  (~;_
    (   |                  |   )
     ~', ',    ,''~'',   ,' ,'~
         ', ','       ',' ,'
           ',: {'} {'} :,'
             ;   |^|   ;
              ~|  ~  |~
            ,' ,~~~~~, ',
          ,' ,' ;~~~; ', ',
        ,' ,'    '''    ', ',
      (~  ;               ;  ~)
       -;_)               (_;-`;

console.log(skull1);


function tryAgain()
{console.log(`
████████╗██████╗░██╗░░░██╗
╚══██╔══╝██╔══██╗╚██╗░██╔╝
░░░██║░░░██████╔╝░╚████╔╝░
░░░██║░░░██╔══██╗░░╚██╔╝░░
░░░██║░░░██║░░██║░░░██║░░░
░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░

░█████╗░░██████╗░░█████╗░██╗███╗░░██╗
██╔══██╗██╔════╝░██╔══██╗██║████╗░██║
███████║██║░░██╗░███████║██║██╔██╗██║
██╔══██║██║░░╚██╗██╔══██║██║██║╚████║
██║░░██║╚██████╔╝██║░░██║██║██║░╚███║
╚═╝░░╚═╝░╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚══╝\n\n\n\n\n`)};

tryAgain();



//! The Musician's song
//This function lets the musican sing after the Damaged Lute is returned

followUp: async ()=>{if(hero.inventory.includes("Damaged Lute")===true){
  colorChangeWords(`\nYou reach into your backpack and pull out the Musician's Damaged Lute.\nTears of joy appear in the Musician's eyes.\n\nMusician With A Broken Arm.\n    "My Broke Lute!\n    I never thought I would see it again!\n    Thank you so much, ${heroName}.\n    I shall use the power of music to fight against the darkness."\n\nThe musician plucks the one string on the lute that hasn't snapped.\nAn an eerie sound resonates through the room.\n\n    "I should tell you, one of the foul beasts from the woods has infiltrated out humble hamlet.\n    A creature of darkness has possessed the Sleeping Child.\n     But it will only make itself know to people like myself whom have been injured.\n`, highlightedWords);
  itemExchange(hero.inventory, musicianWithABrokenArm.inventory, "Damaged Lute");
  musicianWithABrokenArm.interact = `\nMusician With A Broken Arm.\n    "Thank you so much, ${heroName} for returning my Damaged Lute to me.\n     I should tell you, a creature of darkness has possessed the Sleeping Child.\n     But it will only make itself know to people like myself whom have been injured.\n`
}else if(musicianWithABrokenArm.inventory.includes("Damaged Lute")===true){
  colorChangeWords(`\n\nMusician With A Broken Arm\n    "Would you like to hear the new song I am working on?\n     I am sure it will be a smash hit."\n`,highlightedWords);
  let playMusic = musicianSong();
  if (playMusic === "Yes" || playMusic === "Y") {
    colorChangeWords(
      `\n     We're no strangers to love
      \n     You know the rules and so do I (do I)
      \n     A full commitment's what I'm thinking of
      \n     You wouldn't get this from any other guy
      \n\n     I just wanna tell you how I'm feeling
      \n     Gotta make you understand
      \n\n     Never gonna give you up
      \n     Never gonna let you down
      \n     Never gonna run around and desert you
      \n     Never gonna make you cry
      \n     Never gonna say goodbye
      \n     Never gonna tell a lie and hurt you\n`,
      highlightedWords
            );
    }else if (playMusic === "No" || playMusic === "N") {
      colorChangeWords(
        `\n    "Maybe next time, ${heroName}."\n`,highlightedWords
      );
    } else {
      colorChangeWords(
        `\n    "Sorry ${heroName}, I don't know what you're talking about.\n`,
        highlightedWords
      );
}
}},
status: "Normal"
});

async function musicianSong(){
  const hearSong = `Yes (y) or No (n)\n>_ `;
    let playSong = await ask(hearSong);
    playSong = capitalizePlayerInput(playSong);
    return playSong;
   }



   */