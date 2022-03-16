"use strict";

function clearConsole() {
  document.getElementById("console").innerHTML = "";
}

function createTasksObject(title) {
  let object = {};
  object.title = title;
  object.addTitle = (title_name) => {
    object.title = title_name;
  };
  object.tasks = [];
  object.getTaskList = function () {
    return object.tasks;
  };
  object.addTask = function () {
    let task_object = {};
    task_object.complete = false;
    task_object.completion_predicate = () => {
      return true;
    };
    task_object.addCompletionPredicate = function (func) {
      console.assert(typeof func === "function");
      task_object.completion_predicate = func;
    };
    task_object.type = false;
    task_object.addTitle = function (title) {
      task_object.title = title;
    };
    object.tasks.push(task_object);
    return task_object;
  };
  object.listTasks = async () => {
    document.getElementById("console").innerHTML = "";
    changeDisplayAllClickers("none");
    if (object.title !== undefined) {
      await consoleAddText(object.title,{speed:30});
    }
    let task_list = object.getTaskList();
    for (let i = 0; i < task_list.length; i++) {
      let task = task_list[i];
      await consoleAddText(i + 1 + ". " + task.title,{speed:30});
    }
    changeDisplayAllClickers("inline");
  };
  return object;
}

async function createNarrativeTextObject(
  default_console_speed,
  default_type_speed
) {
  let object = {};
  object.default_console_speed = default_console_speed || 100;
  object.default_type_speed = default_type_speed || 35;
  object.narrative_array = [];
  //set no_br=true in params, if you want to skip line break
  //useful for creating pauses without creating new line
  object.addNarrativeText = (text, params) => {
    params = params || {};
    let console_type_speed = object.default_type_speed;
    let delay = params.delay;
    let no_br = params.no_br;
    object.narrative_array.push({
      text: text,
      console_type_speed: console_type_speed,
      delay: delay,
      no_br: no_br,
    });
  };
  object.addClearText = () => {
    object.narrative_array.push({ clear: true });
  };
  object.playText = async function () {
    changeDisplayAllClickers("none");
    await playNarrativeTextObject(object);
    changeDisplayAllClickers("inline");
  };
  return object;
}

async function playNarrativeTextObject(narrative_object) {
  let narrative_array = narrative_object.narrative_array;
  for (let i = 0; i < narrative_array.length; i++) {
    let narrative_hash = narrative_array[i];
    let delay = narrative_hash.delay * 100 || 100;
    if (narrative_hash.clear == true) {
      document.getElementById("console").innerHTML = "";
    } else {
      await consoleAddText(narrative_hash.text, {
        speed: narrative_hash.console_type_speed,
        no_br: narrative_hash.no_br,
        delay: delay,
      });
      await sleep(delay);
    }
  }
}

function createLevelGameLoopObject(game_state) {
  let object = {};
  object.game_state = game_state;
  game_state.level_loop_object = object;
  object.level_object = createLevelObject(game_state);
  object.getLevelObject = () => {
    return object.level_object;
  };
  object.clickCheck = () => {
    let [check_bool, result] = object.level_object.advanceCheck();
    if (check_bool == true) {
      true, result();
    } else {
      let conditional_funcs_that_returned_false = [];
      object.conditional_functions.forEach((func) => {
        let predicate_return_value = func();
        if (predicate_return_value === false) {
          conditional_funcs_that_returned_false.push(func);
        }
      });
      renderState(game_state);
      object.conditional_functions = conditional_funcs_that_returned_false;
      return result;
    }
  };
  object.buttons = [];
  object.addButtonObject = (name, func, params) => {
    console.assert(typeof func == "function", "This needs to be a function");
    let button_object = {}
    let button = createButton(name, uuidv4());
    button_object.button = button;
    button_object.kill_predicate = () => {return false};
    button_object.addKillPredicate = (func) => { 
    button_object.kill_predicate = func;
    }
    button.onclick = async () => {
      await func();
      renderState(object.game_state);
      object.clickCheck(object.game_state);
      if (button_object.kill_predicate())
        { 
        button.remove();
        }
    };
    object.buttons.push(button);
    renderState(object.game_state);
    return button_object;
  };
  object.conditional_functions = [];
  object.addConditionalFunction = (func) => {
    object.conditional_functions.push(func);
  };
  object.addConditionalButton = (name, predicate,click_func,params) => {
    //predicate must return a bool, or everything will get fucked up;
    params = params || {};
    console.assert(
      typeof predicate == "function",
      "This needs to be a function"
    );
    let addButtonConditionalFunc = (self, new_array) => {
      let return_false = () => {return false};
      console.log("parms",params);
      let kill_predicate = params['kill_predicate'] || return_false;
      if (predicate()) {
      let button = object.addButtonObject(name, click_func);
      button.addKillPredicate(kill_predicate);
        return true;
      } else {
        return false;
      }
    };
    object.addConditionalFunction(addButtonConditionalFunc);
  };

  return object;
}

function createLevelObject(game_state) {
  let object = {};
  object.game_state = game_state;
  object.tasks_object = createTasksObject();
  object.getTasksObject = () => {
    return object.tasks_object;
  };
  object.next_level_func = () => {
    alert("Error:No next level defined");
  };
  object.addNextLevelFunc = (next_level_func) => {
    console.assert(
      typeof next_level_func == "function",
      "next_level_func must be a function"
    );
    object.next_level_func = next_level_func;
  };
  object.advanceCheck = () => {
    let task_object = object.tasks_object;
    let task_list = task_object.getTaskList();
    let filter_func = (task_object) => {
      //console.log(task_object.completion_predicate());
      if (task_object.completion_predicate()) {
        return;
      } else {
        return task_object;
      }
    };
    //    Array.prototype.filter()

    let incomplete_tasks = task_list.filter(filter_func);
    //console.log('tasks', task_list, 'incomplete',incomplete_tasks);
    if (incomplete_tasks.length > 0) {
      return [false, incomplete_tasks];
    } else {
      object.next_level_func();
      return [true, object.next_level_func];
    }
  };
  return object;
}

function createButton(name, id, class_name) {
  var button = document.createElement("button");
  button.innerHTML = name;
  button.id = id;
  button.className = "clicker";
  return button;
}

function createButtonWithListenerObject(name, params) {}

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

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
