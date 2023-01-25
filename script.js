//All required div's
const play = document.getElementById('play');
const reset = document.getElementById('reset');
const p1Name = document.getElementById('p1Name');
const p2Name = document.getElementById('p2Name');
const p1Health = document.getElementById('p1Health');
const p2Health = document.getElementById('p2Health');
const result = document.getElementById('result');

// document.addEventListener('keydown',function(e){
//     //no need to put e, here but e represents the keyboard event.
//     console.log('HI');
//     if(e.key == 'q'){
//         console.log('You pressed Q');
//         document.getElementById('punch').play();
//     }
//     else{
//         console.log('Not Q')
//     }
// })

const updateGame = (p1,p2,gameState) =>{
    //here,p1 is object. So taking name property out of it...
    p1Name.innerText = p1.name;
    p2Name.innerText = p2.name;
    p1Health.innerText = p1.health;
    p2Health.innerText = p2.health;
    //health condition checking
    if(p1.health<=0 || p2.health<=0){
        game.isOver = true;
        gameState = game.isOver;
        result.innerText = game.declareWinner(game.isOver,p1,p2);
        return gameState;
    }
}

class Player{
    constructor(name,health,attackDamage){
        this.name = name;
        this.health = health;
        this.attackDamage = attackDamage;
    }
    strike(player,enemy,attackDamage){
        let attackDmg = Math.ceil(Math.random()*attackDamage);
        if(enemy.health>0){
            enemy.health -= attackDmg;
        }
        updateGame(p1,p2,game.isOver)
        return `${player.name} attacks ${enemy.name} for ${attackDmg} damage!`;
    }
    heal(player){
        let hpAmount = Math.ceil(Math.random()*5);
        if(player.health<100){
            player.health += hpAmount;
        }
       
        updateGame(p1,p2,game.isOver)
        return `${player.name} heals of amount ${hpAmount} HP!`;
    }
}

class Game{
    constructor(){
        this.isOver = false;
    }

    declareWinner(isOver,p1,p2){
        let message = "TIE!";
        if(isOver == true && p1.health <= 0){
            message = `${p2.name} WINS!`;
        }
        else if(isOver == true && p2.health <= 0){
            message = `${p1.name} WINS!`;
        }
        //play victory sound
        document.getElementById('victory').play();
        //return message this will get caught in update Game function
        return message;
    }
    reset(p1,p2){
        p1.health = 100
        p2.health = 100
        this.isOver = false
        result.innerText = ''
        updateGame(p1,p2,this.isOver)
    }

  // ** Simulates the whole match until one player runs out of health **
  play(p1, p2) {
    this.reset(p1, p2);
    // Make sure to take turns until isOver is TRUE
    //isOver will get update from update Game function
    while (!this.isOver) {
      console.log(p1.strike(p1,p2, p1.attackDamage));
      console.log(p2.heal(p2));
      console.log(p2.strike(p2,p1, p2.attackDamage));
      console.log(p1.heal(p1));
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(this.isOver,p1,p2);
  }
}
//creating p1,p2 objects
let player1 = new Player('Shyam',100,10);
let player2 = new Player('Kavya',100,10);
//storing original data in variables
let p1=player1;
let p2=player2;
//creating game object
let game = new Game();
//calling game update function
let gameState = game.isOver;
updateGame(p1,p2,gameState)

// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
play.onclick = () => result.innerText = game.play(p1,p2);

  
//Player1 Controls
//For Attack
document.addEventListener('keydown',function(e){
    //no need to put e, here but e represents the keyboard event.
        if(e.key == 'p' && p2.health>0 && game.isOver == false){
            p1.strike(p1,p2,p1.attackDamage)
            document.getElementById('p1attack').play();
        }
    })
//For Heal
document.addEventListener('keydown',function(e){
    //no need to put e, here but e represents the keyboard event.
        if(e.key == 'q' && p1.health<100 && game.isOver == false){
            p1.heal(p1)
            document.getElementById('p1heal').play();
        }
    })

//Player2 Controls
//For Attack
document.addEventListener('keydown',function(e){
    //no need to put e, here but e represents the keyboard event.
        if(e.key == 'm' && p1.health>0 && game.isOver == false){
            p2.strike(p2,p1,p2.attackDamage)
            document.getElementById('p2attack').play();
        }
    })
//For Heal
document.addEventListener('keydown',function(e){
    //no need to put e, here but e represents the keyboard event.
        if(e.key == 'n' && p2.health<100 && game.isOver == false){
            p2.heal(p2)
            document.getElementById('p2heal').play();
        }
    })
