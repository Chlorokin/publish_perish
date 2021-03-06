"use strict";

async function levelOneOpening() {
  let text_object = await createNarrativeTextObject(10, 10);
  text_object.addClearText();
  // now let's write a for loop that alerts on each loop
  let text_block =
    "You arrive at the school and talk to various potential advisors.";
  text_object.addNarrativeText(text_block);

  text_block =
    "\nYou find it odd that they don't talk about finding truth or understanding intelligence. They talk only of getting citations.";
  text_object.addNarrativeText(text_block);
  text_object.addNarrativeText("");
  text_block =
    " Now in conversation with a potential advisor, who explained what topics are hot right now and apt to get you cited, you ask the following:";
  text_object.addNarrativeText(text_block);
  text_object.addNarrativeText("");
  text_object.addNarrativeText(
    '"You keep talking about citations, and I understand they are important, but they are just a means to an end, right?"'
  );
  text_object.addNarrativeText("", 0, 0);
  text_object.addNarrativeText(
    "He looks at you, bemused, like one does at child asking why adults enjoy all that kissing business."
  );
  text_object.addNarrativeText("", 0, 0);
  text_object.addNarrativeText(
    '"You\'ll understand when you get your first citation," he says.'
  );
  sleep(100);
  if (debug == false) {
    await text_object.playText();
  } else {
    //await text_object.playText();
  }
}

async function levelOne(game_state) {
  await levelOneOpening(game_state);
  let level_loop_object = createLevelGameLoopObject(game_state);
  let level_object = level_loop_object.getLevelObject();
  let tasks_object = level_object.getTasksObject();

  let task_1 = tasks_object.addTask();
  task_1.addTitle("Publish at least 3 papers");
  task_1.addCompletionPredicate(() => {
    if (game_state.papers_published.length >= 3) {
      return true;
    } else {
      false;
    }
  });

  let task_2 = tasks_object.addTask();
  task_2.addTitle("Get at least 4 citations");
  task_2.addCompletionPredicate(() => {
    if (game_state.num_cites >= 4) {
      return true;
    } else {
      false;
    }
  });

  level_loop_object.addButtonObject("List tasks", tasks_object.listTasks);
  let cond_predicate = () => {
    if (game_state.novel_data_sets > 0) {
      return true;
    } else {
      false;
    }
  };
  let click_func = () => {
    alert("CLICK FUNC TEST");
  };
  level_loop_object.addConditionalButton("Train", cond_predicate, click_func);

  const buildDataset = async () => {
    if (game_state.storage_used < game_state.total_storage) {
      game_state.storage_used = game_state.storage_used + 1;
      changeDisplayAllClickers("none");
      game_state.novel_data_sets = game_state.novel_data_sets + 1;
      document.getElementById("myCanvas").style.display = "";
      document.getElementById("console").style.display = "none";
      let plot_object = await createPlotObject();
      await plot_object.gatherData();
      document.getElementById("myCanvas").style.display = "none";
      document.getElementById("console").style.display = "";
      renderState(game_state);
      if (game_state.data_sets == 1) {
        play_area_div.appendChild(createButton("Gather data", "build_dataset"));
      }
      changeDisplayAllClickers("inline");
    } else {
      clearConsole();
      let text_object = await createNarrativeTextObject();
      text_object.addNarrativeText(
        "You have no more storage. Maybe it's time to train?"
      );
      text_object.playText();
    }
  };
  level_loop_object.addButtonObject("Gather data", buildDataset);
}