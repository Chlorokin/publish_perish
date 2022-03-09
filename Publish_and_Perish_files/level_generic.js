"use strict";

function CreateTasksObject(title){
  let object = {};
  object.title = title;
  object.AddTitle = (title_name) => {
  object.title = title_name;
  };
  object.tasks = []
  object.GetTaskList = function(){
  return object.tasks;
  }
  object.AddTask = function(){
    let task_object = {};
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
  //useful for creating pauses without creating new line
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

function CreateLevelObject(game_state){ 
  let object = {};
  object.game_state = game_state;
  object.tasks_object = CreateTasksObject()
  object.ReturnTaskObject  = () =>{ 
    return object.tasks_object;
  }
  object.next_level_func = () => {alert('Error:No next level defined');}
  object.AddNextLevelFunc = (next_level_func) => {
  console.assert(typeof next_level_func == 'function', "next_level_func must be a function")
  object.next_level_func = next_level_func;
  }
  object.ShouldIAdvance = () =>{ 
    let task_object = object.tasks_object;
    let task_list = task_object.GetTaskList();
    let filter_func = (task_object) =>{
      if (task.completion_predicate()){
        return;
        }
      else {
        return task;
      }
    }
  let incomplete_tasks = task_object.filter(filter_func);
  if (incomplete_tasks.length > 0){
    return incomplete_tasks;
    }
  else {
  object.next_level_func();
  }
  };
  object
}


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