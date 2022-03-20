//
//  addWriterLoop(level_loop_object);
//  let kill_after_first_click = () => {return true}
//  let submitToJournal = () => {
//    alert('Replace with animation or mini-game or something');
//    changeDisplayAllClickers("inline");
//  }
//
//  let writePaper = async () => {
//    changeDisplayAllClickers("none");
//    let text_object = await createNarrativeTextObject(10, 10);
//    text_object.addClearText();
//    // now let's write a for loop that alerts on each loop
//    let text_block =
//      "Work's done and the results seem great. Now it's time to start typing!";
//    text_object.addNarrativeText(text_block);
//    text_block = "Start hitting those keys.";
//    text_object.addNarrativeText(text_block);
//    await text_object.playText();
//
//
//
//    let typer_object = createTyperObject(game_state);
//    let finish_func = () => {
//      text_object.addClearText();
//      let click_func = () =>{
//        alert('Replace with animation or mini-game or something');
//        changeDisplayAllClickers("inline");
//      }
//      let button = level_loop_object.addButtonObject("Submit to journals", click_func);
//      button.addKillPredicate(kill_after_first_click);
//    };
//    typer_object.AddFinishedFunction(finish_func);
//    typer_object.AddTyper(game_state);
//
//  }
//
//  let startTraining = () => {
//    let button = level_loop_object.addButtonObject("Write paper", writePaper);
//    alert('Replace with animation or mini-game or something');
//    button.addKillPredicate(kill_after_first_click);
//
//
//  }
//  let buildNetwork = async () => {
//    let button = level_loop_object.addButtonObject("Start training", startTraining);
//    alert('Replace with animation or mini-game or something');
//    button.addKillPredicate(kill_after_first_click);
//
//  };
//
//  let cleanData = async () => {
//    let button = level_loop_object.addButtonObject("Build network", buildNetwork);
//    alert('Replace with animation or mini-game or something');
//    button.addKillPredicate(kill_after_first_click);
//
//  };
//
////  level_loop_object.addConditionalButton("Clean data", cond_predicate,cleanData,{"kill_predicate":kill_after_first_click});
//
//  const buildDataset = async () => {
//    if (game_state.storage_used < game_state.total_storage) {
//
//      let button = level_loop_object.addButtonObject("Clean data", cleanData);
//      button.addKillPredicate(kill_after_first_click);
//      if (game_state.data_sets > 1) {
//        let gather_button = createButton("Gather data", "build_dataset");
//        await play_area_div.appendChild(gather_button);
//      }
//      changeDisplayAllClickers("none");
//      game_state.storage_used = game_state.storage_used + 1;
//      game_state.novel_data_sets = game_state.novel_data_sets + 1;
//      document.getElementById("myCanvas").style.display = "";
//      document.getElementById("console").style.display = "none";
//      let plot_object = await createPlotObject();
//      await plot_object.gatherData();
//      document.getElementById("myCanvas").style.display = "none";
//      document.getElementById("console").style.display = "";
//      renderState(game_state);
//      changeDisplayAllClickers("none");
//      changeDisplayAllClickers("inline");
//    } else {
//      clearConsole();
//      let text_object = await createNarrativeTextObject();
//      text_object.addNarrativeText(
//        "You have no more storage. Maybe it's time to design your network?"
//      );
//      text_object.playText();
//    }
//  };
//  level_loop_object.addButtonObject("Gather data", buildDataset);
//