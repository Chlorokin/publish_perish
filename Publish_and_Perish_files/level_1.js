"use strict";
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
	      let task = task_list[i];
	      await consoleAddText( (i+1) + ". " + task.title,10);
	      }
	} 
      
	const listTasksClick = () => {
	  listTasks(game_state);
	 }
      
	play_area_div.appendChild(
	  createButton("Short-term goals", "list_tasks", listTasksClick)
	);
      
	play_area_div.appendChild(
	  createButton("Long-term goals", "show_jobs")
	);
	document
	  .getElementById("show_jobs")
	  .addEventListener("click", showJobsClick);
      
      
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