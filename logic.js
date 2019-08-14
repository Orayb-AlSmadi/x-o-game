$(document).ready();
var clic = 1; // initializing the click counter to 1
var n = [];
var z = [true, true, true, true, true, true, true, true, true]; // initializing the x-o divs to be pressable
var names = ["player 1", "player 2"]; // initializing the players name defaults 
var xwin = 0; // initializing x wins counter to 0
var owin = 0;// initializing o wins counter to 0
var gameFinish = false; // initializing the variable that indicates if the games finsihed or not
var u = 0; // this is a variable indacates if its mutliplayer or single player ( single player, u =1), (multiplayer, u = 0)

$("#next").click(function() {
  clic = 1; //reinitializing click counter to 1
  var n = [];
  z = [true, true, true, true, true, true, true, true, true]; //reinitializing the x-o divs to be pressable
  $("#turn").text(names[0]); // reinitializing the turn name to player 1's name
  $("#n0, #n1, #n2, #n3 , #n4, #n5, #n6, #n7, #n8").css("color", "white"); // reinitializing the css of x-o divs to default 
  for (var i = 0; i < 9; i++) {
    document.getElementById("n" + i).innerHTML = ""; // reinitializing the divs content to empty
  }
  if (u === 1) { //to reset the computer variables and to put x on the middle
    
    clic = 0;//to prevent the player to put O before the computer put x on mid
    setTimeout(xOnMid,700); // time out for putting x on mid (to make it more realistic)
    z[4] = false; // make the middle div of x-o unpressable
    scenario1 = 0; // to make all scenarioes 0 to recheck which scenario to enter
    scenario2 = 0;
    scenario3 = 0;
    scenario4 = 0;
    scenario5 = 0;
    
  }
  gameFinish = false; // initializing the variable that indicates if the games finsihed or not
});

$("#reset").click(function() { // another way to reset (we actually used the reload function)
  clic = 1; 
  var n = [];
  z = [true, true, true, true, true, true, true, true, true];
  $("#turn").text("player 1");
  $("#n0, #n1, #n2, #n3 , #n4, #n5, #n6, #n7, #n8").css("color", "white");
  for (var i = 0; i < 9; i++) {
    document.getElementById("n" + i).innerHTML = "";
  }
  xwin = 0;
  owin = 0;
  $("#xwin").text(xwin);
  $("#owin").text(owin);
});

function reloadPage() { // this function to reload the page
  location.reload(true);
}

$("#singleplayer").click(function() {
  u = 1; // make u = 1 to let the computer use the comuter algorithim function to play with
  clic = 0; //to prevent the player to put O before the computer put x on mid
  $("#page1").css("display", "none"); // to hide the introduction page
  $("#page2").fadeIn(1000); // to display the game page in a specific duration
  if ($("#singlePlayerName").val() !== "") names[1] = $("#singlePlayerName").val(); // to take the players name if he input it else he take the default name (player)
  names[0] = "Computer"; // take the computer name
  $("#name1").text(names[0]); // to display the player 1 name (computer)

  $("#name2").text(names[1]); // to display the player 2 name
  $("#turn").text(names[0]); // to display the player name in turn box
  setTimeout(xOnMid,700); // time out for putting x on mid (to make it more realistic)
//   $("#turn").text(names[1]);//(CHANGE ON CODE) delete this statement; we added it in function xOnMid, to let the turn changes to player's turn after the computer put x on the middle
  z[4] = false; // to make the middle div in x-o unpressable
});

function xOnMid () // function to put x on the middle
{
    $("#n4").text("X"); // to put x on the middle as the first move for the computer
    $("#turn").text(names[1]); // to change the turn for the player 2 (which is the human)
    clic++; // after the computer put x on mid, the player now can put O
}

$("#multiplayer").click(function() { //same process as the singleplayer's process
  u = 0;
  $("#page1").css("display", "none"); 
  $("#page2").fadeIn(1000);
  if ($("#p1n").val() !== "") names[0] = $("#p1n").val();
  if ($("#p2n").val() !== "") names[1] = $("#p2n").val();

  $("#name1").text(names[0]);
  $("#name2").text(names[1]);
  $("#turn").text(names[0]);
});

$("#main").click(function() { // this function to change the players turn depending on the clic value
  if (z.indexOf(true) == -1) {
    return;
  }
  if (u === 0) {
    if (clic % 2 === 0) {
      $("#turn").text(names[1]);
    } else $("#turn").text(names[0]);
  } else {
    $("#turn").text(names[0]);
  }
});

function clickchange(container) { // this function to put x or o in the x-o divs and changing the clic value (and checking before if the div can be pressable or not)
  if (u === 0) {
    if (z[container.currentTarget.id] === true) {
      if (clic % 2 === 0) {
        document.getElementById("n" + container.currentTarget.id).innerHTML = "O";
        clic++;
      } else {
        document.getElementById("n" + container.currentTarget.id).innerHTML = "X";
        clic++;
      }
      z[container.currentTarget.id] = false; // after he chise a div .. it make the value to false .. so it will be unpressable
    }
    check(); // implement the function (check) to check if anyone wins. depending on if its single player or mutiplayer
  } else if (z[container.currentTarget.id] === true) {
    if (clic % 2 !== 0) {
      document.getElementById("n" + container.currentTarget.id).innerHTML = "O";
      check(); //to check if the player wins before the computer do the next move
      clic = clic + 1; //change clic value by adding 1 (clic + 1) and the other +1 is inside the computer function .. and like this the player cant click untill the computer function ends.
    //   setTimeout(clicplus, 1000);
      if(gameFinish === false) // to prevent the computer to put x if the game finish
      setTimeout(computer, 1000);
      z[container.currentTarget.id] = false; //(CHANGE ON CODE) moved this inside the if to fix the bug to make the div unclickable
    }
    
  }
}
// function clicplus()
// {
//     clic = clic + 1;
// }

var scenario1 = 0; //this variable is for computer turns number based on the scenario
var scenario2 = 0;
var scenario3 = 0;
var scenario4 = 0;
var scenario5 = 0;
function computer() { // this function is the algorithim to play vs computer (single player)
  for (var i = 0; i < 9; i++) {
    var s = "#n" + i;
    n[i] = $(s).text();
  }
  //scenario 1
  if ((n[1] === "O" || n[3] === "O" || n[7] === "O" || n[5] === "O") && scenario1 === 0) {
    document.getElementById("n2").innerHTML = "X";
    scenario1++;
    scenario2 = -1;
    scenario3 = -1;
    scenario4 = -1;
    scenario5 = -1;
    z[2] = false;
  } else if (n[6] !== "O" && scenario1 === 1) {
    document.getElementById("n6").innerHTML = "X";
    scenario1++;
    z[6] = false;
  } else if (n[8] !== "O" && scenario1 === 1) {
    document.getElementById("n8").innerHTML = "X";
    scenario1++;
    z[8] = false;
  } else if (n[5] !== "O" && scenario1 === 2) {
    document.getElementById("n5").innerHTML = "X";
    scenario1++;
    z[5] = false;
  } else if (n[0] !== "O" && scenario1 === 2) {
    document.getElementById("n0").innerHTML = "X";
    scenario1++;
    z[0] = false;
  } else if (n[3] !== "O" && scenario1 === 2) {
    document.getElementById("n3").innerHTML = "X";
    scenario1++;
    z[3] = false;
  } else if (n[1] !== "O" && scenario1 == 3) {
    document.getElementById("n1").innerHTML = "X";
    scenario1++;
    z[1] = false;
  } else if (n[7] !== "O" && scenario1 == 3) {
    document.getElementById("n7").innerHTML = "X";
    scenario1++;
    z[7] = false;
  } // scenario 2
  else if (n[2] === "O" && scenario2 === 0) {
    document.getElementById("n8").innerHTML = "X";
    scenario2++;
    scenario1 = -1;
    scenario3 = -1;
    scenario4 = -1;
    scenario5 = -1;
    z[8] = false;
  } else if (n[0] !== "O" && scenario2 === 1) {
    document.getElementById("n0").innerHTML = "X";
    scenario2++;
    z[0] = false;
  } else if (n[1] !== "O" && scenario2 === 1) {
    document.getElementById("n1").innerHTML = "X";
    scenario2++;
    z[1] = false;
  } else if (n[7] !== "O" && scenario2 === 2) {
    document.getElementById("n7").innerHTML = "X";
    scenario2++;
    z[7] = false;
  } else if (n[5] !== "O" && scenario2 === 2) {
    document.getElementById("n5").innerHTML = "X";
    scenario2++;
    z[5] = false;
  } else if (n[3] !== "O" && scenario2 === 3) {
    document.getElementById("n3").innerHTML = "X";
    scenario2++;
    z[3] = false;
  } else if (n[6] !== "O" && scenario2 === 3) {
    document.getElementById("n6").innerHTML = "X";
    scenario2++;
    z[6] = false;
  } //scenario 3
  else if (n[0] === "O" && scenario3 === 0) {
    document.getElementById("n2").innerHTML = "X";
    scenario3++;
    scenario1 = -1;
    scenario2 = -1;
    scenario4 = -1;
    scenario5 = -1;
    z[2] = false;
  } else if (n[6] !== "O" && scenario3 === 1) {
    document.getElementById("n6").innerHTML = "X";
    scenario3++;
    z[6] = false;
  } else if (n[3] !== "O" && scenario3 === 1) {
    document.getElementById("n3").innerHTML = "X";
    scenario3++;
    z[3] = false;
  } else if (n[5] !== "O" && scenario3 === 2) {
    document.getElementById("n5").innerHTML = "X";
    scenario3++;
    z[5] = false;
  } else if (n[7] !== "O" && scenario3 === 2) {
    document.getElementById("n7").innerHTML = "X";
    scenario3++;
    z[7] = false;
  } else if (n[1] !== "O" && scenario3 === 3) {
    document.getElementById("n1").innerHTML = "X";
    scenario3++;
    z[1] = false;
  } else if (n[8] !== "O" && scenario3 === 3) {
    document.getElementById("n8").innerHTML = "X";
    scenario3++;
    z[8] = false;
  } // scenario 4
  else if (n[6] === "O" && scenario4 === 0) {
    document.getElementById("n8").innerHTML = "X";
    scenario4++;
    scenario1 = -1;
    scenario2 = -1;
    scenario3 = -1;
    scenario5 = -1;
    z[8] = false;
  } else if (n[0] !== "O" && scenario4 === 1) {
    document.getElementById("n0").innerHTML = "X";
    scenario4++;
    z[0] = false;
  } else if (n[3] !== "O" && scenario4 === 1) {
    document.getElementById("n3").innerHTML = "X";
    scenario4++;
    z[3] = false;
  } else if (n[5] !== "O" && scenario4 === 2) {
    document.getElementById("n5").innerHTML = "X";
    scenario4++;
    z[5] = false;
  } else if (n[1] !== "O" && scenario4 === 2) {
    document.getElementById("n1").innerHTML = "X";
    scenario4++;
    z[1] = false;
  } else if (n[7] !== "O" && scenario4 === 3) {
    document.getElementById("n7").innerHTML = "X";
    scenario4++;
    z[7] = false;
  } else if (n[2] !== "O" && scenario4 === 3) {
    document.getElementById("n2").innerHTML = "X";
    scenario4++;
    z[2] = false;
  } // scenario 5
  else if (n[8] === "O" && scenario5 === 0) {
    document.getElementById("n2").innerHTML = "X";
    scenario5++;
    scenario1 = -1;
    scenario2 = -1;
    scenario3 = -1;
    scenario4 = -1;
    z[2] = false;
  } else if (n[6] !== "O" && scenario5 === 1) {
    document.getElementById("n6").innerHTML = "X";
    scenario5++;
    z[6] = false;
  } else if (n[7] !== "O" && scenario5 === 1) {
    document.getElementById("n7").innerHTML = "X";
    scenario5++;
    z[7] = false;
  } else if (n[1] !== "O" && scenario5 === 2) {
    document.getElementById("n1").innerHTML = "X";
    scenario5++;
    z[1] = false;
  } else if (n[5] !== "O" && scenario5 === 2) {
    document.getElementById("n5").innerHTML = "X";
    scenario5++;
    z[5] = false;
  } else if (n[3] !== "O" && scenario5 === 3) {
    document.getElementById("n3").innerHTML = "X";
    scenario5++;
    z[3] = false;
  } else if (n[0] !== "O" && scenario5 === 3) {
    document.getElementById("n0").innerHTML = "X";
    scenario5++;
    z[0] = false;
  }
  if (!gameFinish) {
    $("#turn").text(names[1]);
  }
  check();
  clic = clic + 1; //(CHANGE ON CODE) we discussed why we add this statetemnt above
}

for (var i = 0; i < 9; i++) { // to make the x-o divs instead of making this in the html file
  var divelement = document.createElement("div");
  divelement.id = i;
  var parg = document.createElement("p");
  var pargId = "n" + i;
  parg.id = pargId;
  divelement.appendChild(parg);
  divelement.onclick = clickchange;
  document.getElementById("main").appendChild(divelement);
}

function finalwin() { //this function to show and display the final winner
  $("#page2").css("display", "none");
  $("#page3").fadeIn(1500);
  if (xwin === 2) {
    $("#winner").text("Congratulations "+ names[0] + " you are the WINNER");
  } else if (owin === 2) {
    $("#winner").text("Congratulations "+ names[1] + " you are the WINNER");
  }
}

function check() { // this funtion to check who wins and display the winner on turn box and change the line of o or x to y that wins to yellow
  if (gameFinish) {
    return;
  }

  for (var i = 0; i < 9; i++) {
    var s = "#n" + i;
    n[i] = $(s).text();
  }

  {
    if (n[0] === n[1] && n[0] === n[2] && n[0] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[0] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n0, #n1, #n2").css("color", "yellow");
      gameFinish = true;
    } else if (n[3] === n[4] && n[4] === n[5] && n[3] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[3] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n3, #n4, #n5").css("color", "yellow");
      gameFinish = true;
    } else if (n[6] === n[7] && n[6] === n[8] && n[6] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[6] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n6, #n7, #n8").css("color", "yellow");
      gameFinish = true;
    } else if (n[0] === n[3] && n[0] === n[6] && n[0] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[0] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n0, #n3, #n6").css("color", "yellow");
      gameFinish = true;
    } else if (n[1] === n[4] && n[1] === n[7] && n[1] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[4] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n4, #n1, #n7").css("color", "yellow");
      gameFinish = true;
    } else if (n[2] === n[5] && n[2] === n[8] && n[2] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[2] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n5, #n8, #n2").css("color", "yellow");
      gameFinish = true;
    } else if (n[2] === n[4] && n[2] === n[6] && n[2] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[2] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n4, #n6, #n2").css("color", "yellow");
      gameFinish = true;
    } else if (n[0] === n[4] && n[0] === n[8] && n[0] !== "") {
      z = [false, false, false, false, false, false, false, false, false];
      if (n[0] === "X") {
        $("#turn").text(names[0] + " is the winner");
        xwin++;
        $("#xwin").text(xwin);
      } else {
        $("#turn").text(names[1] + " is the winner");
        owin++;
        $("#owin").text(owin);
      }
      $("#n0, #n4, #n8").css("color", "yellow");
      gameFinish = true;
    } else if (z.indexOf(true) === -1) {
      $("#turn").text("Draw!");
      gameFinish = true;
    }
  }
  if (xwin === 2 || owin === 2) {
    finalwin();
  }
}
