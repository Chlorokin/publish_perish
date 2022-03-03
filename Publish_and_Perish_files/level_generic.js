
function CreateTasksObject(title){
  let object = {};
  object.title = title;
  object.tasks = []
  object.GetTaskList = function(){
  return object.tasks;
  }
  object.AddTask = function(){
    task_object = {};
    task_object.complete = false;
    task_object.completion_predicate = false;
    task_object.AddCompletionPredicate = function(func){
      console.assert(typeof func === 'function')
      task_object.advancement_predicate = func;
    }
    task_object.type = false;
    task_object.AddTitle = function(title){
    task_object.title = title;
    }
    object.tasks.push(task_object);
    return task_object;
  }
  return object;
}

async function CreateNarrativeTextObject(default_console_speed, default_type_speed) {
  let object = {};
  object.default_console_speed = default_console_speed || 100
  object.default_type_speed = default_type_speed || 35;
  object.narrative_array = [];
  //sent no_br=true in params, if you want to skip line break
  //useful for creating pauses in sentances
  object.AddNarrativeText = (text, params) => {
    params = params || {};
    let console_type_speed = object.default_type_speed;
    let delay = params.delay;
    let no_br = params.no_br;
    object.narrative_array.push({
      text: text,
      console_type_speed: console_type_speed,
      delay: delay,
      no_br: no_br
    });
  };
  object.AddClearText = () => {
    object.narrative_array.push({ clear: true });
  };
  object.PlayText = async function () {
    changeDisplayAllClickers("none");
    await PlayNarrativeTextObject(object);
    changeDisplayAllClickers("inline");
  };
  return object;
}


async function PlayNarrativeTextObject(narrative_object) {
  let narrative_array = narrative_object.narrative_array;
  for (let i = 0; i < narrative_array.length; i++) {
    let narrative_hash = narrative_array[i];
    let delay = narrative_hash.delay * 100 || 100;
    if (narrative_hash.clear == true) {
      document.getElementById("console").innerHTML = "";
    } else {
      await consoleAddText(
        narrative_hash.text,
        {speed:narrative_hash.console_type_speed,no_br:narrative_hash.no_br,delay:delay}
      );
      await sleep(delay);
    }
  }
}

CreateLevelObject = function (level_int, game_state) {
  let object = {};
  object.level_int = level_int;
  object.stages_array = [];
  object.AddAdvancementPredicate = (predicate) => {
    object.stages_array.push({
      predicate: predicate,
      stage_int: object.stages_array.length,
    });
  };
};


function createButton(name, id, class_name) {
  var button = document.createElement("button");
  button.innerHTML = name;
  button.id = id;
  button.className = "clicker";
  return button;
}

function removeAllEventListeners() {
  var all_buttons = document.getElementsByClassName("clicker");
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].removeEventListener("click", function () {});
  }
}

function callLevel(level_int, game_state) {
  if (game_state === undefined) {
    alert("game_state is undefined");
    console.log("game_state is undefined");
    return -1;
  }
  removeAllEventListeners();
  document.getElementById("play_area").innerHTML = "";

  let level_array = [];
  level_array.push(levelOne);
  if (level_int == 0) {
    levelIntro(game_state);
  } else {
    let func = level_array[level_int - 1];
    func(game_state);
  }
}

async function levelIntro(game_state) {
  document.getElementById("stats_table").style.display = 'none';
  let play_area_div = document.getElementById("play_area");
  let text_object = await CreateNarrativeTextObject();
  text_object.AddNarrativeText(
    'You ask yourself, "What is the purpose of my life?"'
  );
  text_object.AddNarrativeText("And you decide it is to find truth.");
  text_object.AddNarrativeText("So you study science.");
  text_object.AddNarrativeText("First, biology.");
  text_object.AddNarrativeText("Then, physics.");
  text_object.AddNarrativeText("Then, computer science.");
  text_object.AddNarrativeText("Finally, AI.");
  text_object.AddNarrativeText(
    "And you realize AI is the most important field in all of science."
  );
  text_object.AddNarrativeText(
    "As AI is the study of intelligence, and it is intelligence that makes all sciences possible."
  );
  await text_object.PlayText();


  //document.getElementById("goosele_scholar_div").style.display = 'none';
  play_area_div.appendChild(
    createButton("Apply to grad school", "apply_to_grad", "clicker")
  );
  document
    .getElementById("apply_to_grad")
    .addEventListener("click", WriteApplication);

  async function WriteApplication() {
    //remove the button with the id apply_to_grad
    let text_object = await CreateNarrativeTextObject();
    document
      .getElementById("apply_to_grad")
      .removeEventListener("click", WriteApplication);
    document.getElementById("apply_to_grad").remove();
    text_object.AddClearText();
    text_object.AddNarrativeText(
      "You better start typing out your application letter.",
      null,
      10
    );
    text_object.AddNarrativeText("You know how to type right?", null, 10);
    text_object.AddNarrativeText(
      "You just have to keep hitting keys, it will come out fine.",
      null,
      1000
    );
    text_object.PlayText();
    let typer_object = createTyperObject(game_state);
    typer_object.OverridePaperTitle(
      "How I overcame adversity and plan to change the world for the better with ML"
    );
    typer_object.AddFinishedFunction(function () {
      Rejection();
    });
    typer_object.AddTyper(game_state);
  }
  const Rejection = async () => {
    document.getElementById("console").innerHTML = "";
    let text_object = await CreateNarrativeTextObject();
    text_object.AddClearText();
    text_object.AddNarrativeText(
      "You finish your application letter and apply to your dream school and your backup.",
      null,
      10
    );
    text_object.AddNarrativeText("Your dream school responds first:", null, 3);
    text_object.AddNarrativeText(" ", null, 0.1);
    text_object.AddNarrativeText("Thank you for your interest in our program.", null, 10);
    text_object.AddNarrativeText("We regret to inform you that",{delay:8});
    text_object.AddNarrativeText(
      " one cannot have imposter syndrome if you are actually an imposter. Your academic record is an embarrassment, and, frankly, we feel you have not overcome enough adversity.",
    {no_br:true});
    text_object.AddNarrativeText(" ", null, 0.1);
    text_object.AddNarrativeText(
      "We hope our firm rejection will be taken as a hardship you can overcome, and perhaps even mention in your application letters to other, lesser schools."
    );
    //text_object.AddNarrativeText("We hope our firm rejection will be taken as a hardship you can overcome, and perhaps even mention in your application letters to other, lesser schools.");
    await text_object.PlayText();
    play_area_div.appendChild(
      createButton(
        "Read reply from your backup school",
        "write_again",
        "clicker"
      )
    );
    document
      .getElementById("write_again")
      .addEventListener("click", WriteAgain);
  }

  async function WriteAgain() {
    document
      .getElementById("write_again")
      .removeEventListener("click", WriteApplication);
    document.getElementById("write_again").remove();
    document.getElementById("console").innerHTML = "";
    let text_object = await CreateNarrativeTextObject();
    text_object.AddClearText();
    text_object.AddNarrativeText(
      "We are happy to inform you that we have accepted you into our program.",{delay:3});
    text_object.AddNarrativeText("Your academic record is adequate, and, frankly, impressive given all the adversity you have so bravely overcome.",{no_br:true})
    await text_object.PlayText();
    play_area_div.appendChild(
      createButton("Start next level", "next_level", "clicker")
    );
    document.getElementById("next_level").addEventListener("click", CallLevelOne);
  }
  function CallLevelOne() {
  document
    .getElementById("next_level")
    .removeEventListener("click", CallLevelOne);
  document
    .getElementById("next_level")
    .remove();
    levelOne(game_state);
  }
}

async function levelOne(game_state) {
  let play_area_div = document.getElementById("play_area");
  let [first_name, last_name] = game_state.player_name;
  let text_object = await CreateNarrativeTextObject(10,10);
  text_object.AddClearText();
  // now let's write a for loop that alerts on each loop
  let text_block = "You arrive at the school and talk to various potential advisors." 
  text_object.AddNarrativeText(text_block);

  text_block = "\nYou find it odd that they don't talk about finding truth or understanding intelligence. They talk only of getting citations.";
  text_object.AddNarrativeText(text_block);
  text_object.AddNarrativeText('');
  text_block = " Now in conversation with a potential advisor, who explained what topics are hot right now and apt to get you cited, you ask the following:";
  text_object.AddNarrativeText(text_block);
  text_object.AddNarrativeText('');
  text_object.AddNarrativeText('"You keep talking about citations, and I understand they are important, but they are just a means to an end, right?"');
  text_object.AddNarrativeText('', 0, 0);
  text_object.AddNarrativeText('He looks at you, bemused, like one does at child asking why adults enjoy all that kissing business.');
  text_object.AddNarrativeText('', 0, 0);
  text_object.AddNarrativeText('"You\'ll understand when you get your first citation," he says.');
  sleep(100);
  if (debug == false){
  await text_object.PlayText();
  }
  else{
    //await text_object.PlayText();
    //text_object.PlayText();
  }
  
  document.getElementById("stats_table").style.display = 'inline';
  let tasks_object = CreateTasksObject("Graduate:");
  let task_1 = tasks_object.AddTask();


  task_1.AddTitle('Publish at least 3 papers');
  task_1.AddCompletionPredicate(()=>{if (game_state.papers_published.length >= 3){return true}else{false}});
  game_state.tasks_object = tasks_object;

  let task_2 = tasks_object.AddTask();
  task_2.AddTitle('Get at least 4 citations');
  task_2.AddCompletionPredicate(()=>{if (game_state.num_cites >= 4){return true}else{false}});

async function showJobsClick(){
  alert('test');
  }
const listTasks = async (game_state) => {
      document.getElementById("console").innerHTML = "";
      let tasks_object = game_state.tasks_object;
      await consoleAddText(tasks_object.title,10);
      let task_list = tasks_object.GetTaskList();
      for (let i = 0; i < task_list.length; i++){
        task = task_list[i];
        await consoleAddText( (i+1) + ". " + task.title,10);
        }
  } 

  const listTasksClick = () => {
    listTasks(game_state);
   }

  play_area_div.appendChild(
    createButton("Show jobs", "show_jobs")
  );
  document
    .getElementById("show_jobs")
    .addEventListener("click", showJobsClick);

  play_area_div.appendChild(
    createButton("List tasks", "list_tasks", listTasksClick)
  );

  document
    .getElementById("list_tasks")
    .addEventListener("click", listTasksClick);


  const  buildDataset = async () => {
      document.getElementById('myCanvas').style.display= "";
      document.getElementById("console").style.display= "none";

      let plot_object = await CreatePlotObject();
      await plot_object.GatherData();
      document.getElementById('myCanvas').style.display= "none";
      document.getElementById("console").style.display= "";

  }

  play_area_div.appendChild(
    createButton("Gather data", "build_dataset")
  );

  document
    .getElementById("build_dataset")
    .addEventListener("click", buildDataset)



//  let text_object = await CreateNarrativeTextObject();
//  text_object.AddClearText();
//  await text_object.PlayText();
//  document.getElementById("goosele_scholar").style.display = "inline";
//  game_state.level = 1;
//
//  function publishPaper() {
//    var num_cites_div = document.getElementById("num_cites");
//
//    var num_papers_div = document.getElementById("num_papers");
//    let message = "";
//
//    if (Math.random() < 0.4) {
//      let ran_cites = Math.floor(Math.random() * 20) + 1;
//      game_state.num_cites =
//        parseInt(game_state.num_cites) + parseInt(ran_cites);
//      let time_or_times = "times";
//      if (ran_cites == 1) {
//        time_or_times = "time";
//      }
//      message =
//        "Your paper (" +
//        paper_name +
//        ") was cited " +
//        ran_cites +
//        " " +
//        time_or_times +
//        ".";
//    } else {
//      message = "Your paper (" + paper_name + ") was not cited.";
//    }
//
//    if (num_cites_div.getAttribute("total_cites") === 0) {
//      let paper_or_papers = "papers";
//      if (num_cites.attributes.getNamedItem("total_clicks").value == 1) {
//        paper_or_papers = "paper";
//      }
//      message = "No one cares about your papers yet";
//    } else if (game_state.num_cites > 10) {
//      message =
//        "Game over: DeepMind made AGI without you. Everyone you love is now dead, including you!!";
//      document.getElementById("publish_paper").style.display = "none";
//      consoleAddText(message);
//      sleep(2000);
//    } else {
//      renderState(game_state);
//      consoleAddText(message);
//    }
//    var paper_name = genPaperName();
//    game_state.papers_published.list_of_papers.push(paper_name);
//  }
}

function createStagesObject_remove(game_state, calling_stage) {
  let stage_hash = {};
  stage_hash.calling_stage = calling_stage;
  stage_hash.sub_stages_array = [];
  stage_hash.game_state = game_state;
  stage_hash.default_console_speed = 1000;
  stage_hash.default_console_type_speed = 30;

  stage_hash.AddGamePlayFunction = function (function_name) {
    this.game_play_function = function_name;
  };

  stage_hash.SetDefaultConsoleSpeed = function (speed) {
    this.default_console_speed = speed;
  };
  stage_hash.SetDefaultConsoleTypeSpeed = function (speed) {
    //speed of delay as each character is typed
    this.default_console_type_speed = speed;
  };

  stage_hash.clicker_array = [];
  stage_hash.advancement_predicate_array = [];
  stage_hash.AddAdvancementPredicate = (predicate) => {
    stage_hash.advancement_predicate_array.push(predicate);
  };
  stage_hash.narrative_array = [];
  stage_hash.AddFuction = (func, args_array) => {
    stage_hash.title = title;
    stage_hash.function = func;
    stage_hash.args_array = args_array;
  };
  stage_hash.AddNarrativeText = (text, speed, type_speed) => {
    console_speed = speed || stage_hash.default_console_speed;
    console_type_speed = type_speed || stage_hash.default_console_type_speed;
    stage_hash.narrative_array.push({
      text: text,
      console_speed: console_speed,
      console_type_speed: console_type_speed,
    });
  };
  stage_hash.AddText = (text) => {
    stage_hash.text = text;
  };
  stage_hash.sub_stages_array.push(stage_hash);
  stage_hash.stage_cnt = 0;
  stage_hash.AddStage = (title) => {
    let new_stage = createStagesObject(this.game_state);
    this.sub_stages_array.push(createStagesObject(this.game_state));
    return new_stage;
  };
  return stage_hash;
}
