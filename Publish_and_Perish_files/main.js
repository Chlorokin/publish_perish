let total_papers_published_global = 0;
let time_is_a_global_variable = Math.round(new Date().getTime() / 1000);
let pause_time_is_a_global_variable = 0;
function startTime() {
  pause_time_is_a_global_variable = 1;
}

function stopTime() {
  pause_time_is_a_global_variable = 0;
}

function easterEgg() {
  /// add a call to a easter egg, unix rollover  level
}

function turnOnTimeInterval() {
  var myInterval = setInterval(function () {
    if (pause_time_is_a_global_variable == 1) {
      time_is_a_global_variable += 600;
    }
    if (time_is_a_global_variable >= 2147483647) {
      easterEgg();
      clearInterval(myInterval);
    }
    let date_object = new Date(time_is_a_global_variable * 1000);
    //Now we get the month, day, and year from the date_object
    let month = date_object.getUTCMonth() + 1; //months from 1-12
    let day = date_object.getUTCDate();
    let year = date_object.getUTCFullYear();
    //Now we make a nice formatted string for the month, day, and year
    let new_date = month + "/" + day + "/" + year;
    // now we get the hour and minutes from the date_object
    let hour = date_object.getUTCHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = date_object.getUTCMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    let clock_string = hour + ":" + minute;
    document.getElementById("date_display").innerHTML = new_date;
    document.getElementById("time_display").innerHTML = clock_string;
  }, 1);
}

function renderState(game_state) {
  console.log(game_state);
  document.getElementById("num_papers").innerHTML =
    game_state.papers_published.length;
  document.getElementById("num_cites").innerHTML = game_state.num_cites;
  //if (game_state.pending_paper_name != ""){
  //    document.getElementById("writing_paper").innerHTML = game_state.pending_paper_name;
  //}
}

async function main() {
  turnOnTimeInterval();
  let game_state = {};
  game_state.citations = 0;
  game_state.level = 0;
  game_state.num_cites = 0;
  game_state.papers_published = [];
  game_state.console_window_array = [];
  game_state.time_step = 0;
  game_state.finished_paper = "";
  game_state.writing_paper = "";
  callLevel(0, game_state);
}
