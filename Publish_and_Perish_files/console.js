var gobal_papers = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeWriter(txt, speed_ms) {
  txt = "     " + txt;
  if (speed_ms === undefined) {
    speed_ms = 1;
  }
  for (let i = 0; i < txt.length; i++) {
    document.getElementById("console").innerHTML += txt.charAt(i);
    await sleep(speed_ms);
  }
  return 1;
}

function changeDisplayAllClickers(display_type) {
  let clickers = document.getElementsByClassName("clicker");
  for (i = 0; i < clickers.length; i++) {
    clickers[i].style.display = display_type;
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function CreatePlotObject(){
  object = {};
  object.rotate_seed = Math.round(Math.random() * 180);
  console.log(object.rotate_seed);
  
  let seed = Math.random() * 10;
    const randomG =  (seed_override) => { 
      v = seed_override || seed;
      var r = 0;
      for(var i = seed; i > 0; i --){
          r += Math.random();
      }
      return r / seed;
    }
    object.GatherData = async () =>{
      console.log(seed);
      let canvas = document.getElementById("myCanvas");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ranY = () =>{ return Math.random() * 1000};
      const ranX = () =>{ return randomG() *  400};
      ctx.fillStyle = "white";
      const rotate = (cx, cy, x, y, angle) => {
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
      }

      for (let i = 0; i < 1000; i++){
        let x = ranX()
        let y = ranY();
        [x, y] =  rotate(200,200, x, y,object.rotate_seed);
        await sleep (1);
        ctx.fillRect(Math.round(x),Math.round(y),3,3);
      }
    }
  await sleep (1000);

  return object;
}



  //alert(ranX());
  //ctx.strokeStyle = "white";
  //ctx.stroke(); 
 // ctx.textAlign = "left";
// ctx.fillText(txt, canvas.width/2, canvas.height/2);
 // ctx.clearRect(0, 0, canvas.width, canvas.height);

async function consoleAddText(txt,params) {
  params = params || {};
  console.log(params);
  console.log(params);
  let hide_clickers = params.hide_clickers || false;
  let no_br = params.no_br || false;
  let speed_ms = params.speed;

  console.assert(typeof(hide_clickers) === "boolean")
  console.assert(typeof(no_br) === "boolean")
  console.assert(
    hide_clickers === undefined || typeof hide_clickers === "boolean"
  );
  let break_or_not = no_br === false ? "<br>": ""
  //alert(break_or_not)
  document.getElementById("console").innerHTML =
    document
      .getElementById("console")
      .innerHTML.split("<br>")
      .slice(-6)
      .join("<br>") + break_or_not;

  if (hide_clickers === true) {
    changeDisplayAllClickers("none");
  }
  await typeWriter(txt, speed_ms);
  if (hide_clickers === true) {
    changeDisplayAllClickers("inline");
  }
}

function createTyperObject(game_state) {
  console.assert(game_state !== undefined, "game_state is undefined");
  let object = {};

  object.fast = false;
  object.allow_typing = true;
  object.game_state = game_state;
  object.finished_function = undefined;
  object.AddFinishedFunction = function (func) {
    object.finished_function = func;
  };
  object.override_paper_title = undefined;
  object.OverridePaperTitle = function (title) {
    object.override_paper_title = title;
  };

  object.RemoveTyper = () => {
    document.getElementById("typer").innerHTML = "";
    document.getElementById("typer_title").innerHTML = "";
    typer_title.setAttribute("paper_name", "");
    document
      .getElementById("body_main")
      .removeEventListener("keyup", object.typingFast);
    object.allow_typing = false;
  };

  object.typingSlow = async function () {
    object.fast = false;
    let game_state = object.game_state;
    await typing(game_state, object);
  };
  object.typingFast = async function () {
    let game_state = object.game_state;
    object.fast = true;
    console.assert(game_state !== undefined, "game_state is undefined");
    let remove_function = object.RemoveTyper;
    console.assert(
      typeof remove_function === "function",
      "remove_function is not a function"
    );
    await typing(game_state, object);
  };
  object.AddTyper = (fast_or_slow) => {
    let game_state = object.game_state;
    console.assert(game_state !== undefined, "game_state is undefined");
    let typer_title = document.getElementById("typer_title");
    let pending_paper_name = object.override_paper_title
      ? object.override_paper_title
      : genPaperName();
    game_state.pending_paper = pending_paper_name;
    typer_title.setAttribute("paper_name", pending_paper_name);
    if (fast_or_slow === "slow") {
      document
        .getElementById("body_main")
        .addEventListener("keyup", object.typingSlow);
    } else {
      document
        .getElementById("body_main")
        .addEventListener("keyup", object.typingFast);
    }
  };
  return object;
}

async function typing(game_state, typer_object) {
  let allow_typing = typer_object.allow_typing;
  let remove_function = typer_object.RemoveTyper;
  let finished_function = typer_object.finished_function;
  console.assert(game_state !== undefined, "game_state is undefined");
  console.assert(
    typeof remove_function !== "undefined",
    "remove_function is undefined"
  );
  console.assert(
    typeof remove_function === "function",
    "remove_function is not a function"
  );
  console.assert(
    typeof allow_typing === "boolean",
    "allow_typing is not a boolean"
  );
  console.assert(
    typeof finished_function === "undefined" ||
      typeof finished_function === "function",
    "finished_function is not a function"
  );
  console.log(allow_typing);
  if (allow_typing === false) {
    remove_function();
    return;
  }

  async function RemoveTyperInternal() {
    remove_function();
    if (finished_function !== undefined) {
      finished_function();
    }
    game_state.finished_paper = game_state.pending_paper;
    game_state.pending_paper = "";
    renderState(game_state);
  }

  length = document.getElementById("typer_title").innerHTML.length;
  let typer_title = document.getElementById("typer_title");

  if (typer_title.getAttribute("paper_name") == "") {
    typer_title.setAttribute("paper_name", game_state.writing_paper);
  }
  let paper_name = typer_title.getAttribute("paper_name");

  if (length != paper_name.length) {
    document.getElementById("typer_title").innerHTML += paper_name[length];
  } else {
    distributions = [
      0, 0.018562456385205862, 0.1282707622298066, 0.16737357259380098,
      0.1469435736677116, 0.1720257234726688, 0.15173370319001386,
      0.2119032047089601, 0.23775933609958505, 0.22972237343494828,
      0.24028268551236748, 0.2855813953488372, 0.2760416666666667,
      0.22302158273381295, 0.23148148148148148, 0.286144578313253,
      0.2489451476793249, 0.21910112359550563, 0.302158273381295,
      0.23711340206185566, 0.35135135135135137, 0.3125, 0.36363636363636365,
      0.5714285714285714, 0.5555555555555556, 1.0,
    ];
    commas = [
      0.0, 0.0, 0.0, 0.045454545454545456, 0.027210884353741496,
      0.0979020979020979, 0.12403100775193798, 0.13274336283185842,
      0.16326530612244897, 0.25609756097560976, 0.19672131147540983,
      0.14285714285714285, 0.19047619047619047, 0.2647058823529412, 0.32,
      0.17647058823529413, 0.14285714285714285, 0.25, 0.2222222222222222,
      0.14285714285714285, 0.16666666666666666, 0.8, 1.0,
    ];

    function distro_stuff() {
      doc = document.getElementById("typer").innerHTML;

      text = doc.replace(/\./g, "");
      last = text.length - text.lastIndexOf(" ") - 1;

      if (Math.random() < distributions[last]) {
        text = doc.replace(/[^ \.]/g, "");

        last = text.length - text.lastIndexOf(".");

        char = Math.random() < commas[last] ? ". " : " ";
      } else {
        char = "-";
      }
    }
    if (document.getElementById("typer").innerHTML.length > 1000) {
      typer_object.allow_typing = false;
      await RemoveTyperInternal();
    } else if (
      typer_object.fast == true &&
      document.getElementById("typer").innerHTML.length < 950
    ) {
      for (let i = 0; i < 10; i++) {
        await sleep(10);
        distro_stuff();
        document.getElementById("typer").innerHTML += char;
      }
    } else {
      distro_stuff();
      document.getElementById("typer").innerHTML += char;
    }
  }
}
