//  By: Gary Chen
//      Christopher Gentibano
//

var current_player = "X"
var winner = false;
var aiMode = false;
var aiTurn = false;
var x_score = 0
var o_score = 0
var turn_count = 0
var game_board = {
    '7': ' ', '8': ' ', '9': ' ',
    '4': ' ', '5': ' ', '6': ' ',
    '1': ' ', '2': ' ', '3': ' ',
}
document.querySelectorAll('.row').forEach(cell => cell.addEventListener('click', cellClicked))
document.querySelector('.reset').addEventListener('click', resetClicked);
document.querySelector('.new_game').addEventListener('click', newGameClicked);
document.querySelector('.ai').addEventListener('click', aiClicked);

displayed_msg = document.getElementById("display_player")
displayed_msg.innerHTML = current_player
x_msg = document.getElementById("x_sc")
x_msg.innerHTML = x_score
o_msg = document.getElementById("o_sc")
o_msg.innerHTML = o_score


/* All beginning variables above */

function player_change(){
    console.log("changing player")
    if (current_player == "X")
        current_player = "O";
    else
        current_player = "X";
    displayed_msg.innerHTML = current_player
}

function player_scores(){
    x_msg.innerHTML = x_score
    o_msg.innerHTML = o_score
}

function submit_move(event){
        game_board[event.target.id] = current_player;
        turn_count += 1

        console.log("turn count is "+ turn_count)

        if (turn_count > 3 && turn_count < 10){
            if (game_board['7'] != ' ' && game_board['7'] === game_board['8'] && game_board['8'] === game_board['9'])
            {
              console.log("winner!")
              winner = true;
            }
            else if (game_board['7'] != ' ' && game_board['7'] === game_board['8'] && game_board['8'] === game_board['9'])
            {
               console.log("winner!")
               winner = true;
            }
            else if (game_board['3'] != ' ' && game_board['3'] === game_board['6'] && game_board['6'] === game_board['9'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['4'] != ' ' && game_board['4'] === game_board['5'] && game_board['5'] === game_board['6'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['1'] != ' ' && game_board['1'] === game_board['2'] && game_board['2'] === game_board['3'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['2'] != ' ' && game_board['2'] === game_board['5'] && game_board['5'] === game_board['8'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['1'] != ' ' && game_board['1'] === game_board['4'] && game_board['4'] === game_board['7'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['1'] != ' ' && game_board['1'] === game_board['5'] && game_board['5'] === game_board['9'])
            {
                console.log("winner!")
                winner = true;
            }
            else if (game_board['3'] != ' ' && game_board['3'] === game_board['5'] && game_board['5'] === game_board['7'])
            {
                console.log("winner!")
                winner = true;
            }
        }
        if(turn_count >= 9 || winner)
        {
            if (winner)
            {
                console.log("winner is: " + current_player);
                if (current_player === "X")
                    x_score += 1;
                else
                    o_score += 1;
                player_scores();
            }
            else{
                console.log("tie");
                player_scores();
            }
        }
    
    console.log("Move made at: " + event.target.id);
    // Move is done
    player_change(current_player)

    if( aiMode && aiTurn ){
        ai();
    }
}

function cellClicked (event) {
    console.log("win check" + winner)
    if (winner || turn_count > 9 || game_board[event.target.id] != ' ')
    {
        console.log("stop game, and/or can't move there")
        console.log("win check " + winner)
        console.log("turn ctr = " + turn_count)
        console.log("board = " + game_board[event.target.id] != ' ')
    }
    else
    {
        console.log("Player made a move");
        document.getElementById(event.target.id).style.backgroundColor = "rgb(238, 121, 140)";
        document.getElementById(event.target.id).innerHTML = current_player;
        aiTurn = !aiTurn;
        submit_move(event)  
    }    
}

function ai(){
    console.log("Ai is making a move.");
    let aiMove = Math.floor(Math.random() * 9) + 1;
    while( game_board[aiMove] != ' ' ){
        aiMove = Math.floor(Math.random() * 9) + 1;
    }
    document.getElementById(aiMove).click();
}

function newGameClicked(){
    for( let key in game_board ){
        game_board[key] = document.getElementById(key).innerHTML = ' '
        document.getElementById(key).style.backgroundColor = "pink";
    }
    turn_count = 0;
    winner = false;
    current_player = "X"
    aiTurn = false;
}

function resetClicked(){
    console.log("reset clicked")
    location.reload()
}

function aiClicked(){
    aiMode = !aiMode;
    console.log("You're now playing " + (aiMode? "with AI.": "in 2 player mode.") );
}