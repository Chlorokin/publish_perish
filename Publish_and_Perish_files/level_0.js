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