async function CreateNarrativeTextObject(){
    let object = {};
    object.narrative_array = [];
    object.AddNarrativeText = (text, console_type_speed, console_speed) => {
        console_speed = console_speed || 1000;
        console_type_speed = console_type_speed || 10;
        object.narrative_array.push({text:text, console_type_speed:console_type_speed, console_speed:console_speed});
    }
    object.PlayText = async function(){await PlayNarrativeTextObject(object)};
    return object;
}

async function PlayNarrativeTextObject(narrative_object){
    let narrative_array  =  narrative_object.narrative_array;
    for (let i = 0; i < narrative_array.length; i++){
        let narrative_hash = narrative_array[i];
        await consoleAddText(narrative_hash.text, narrative_hash.console_type_speed);
        await sleep(narrative_hash.console_speed);
     }
}

CreateLevelObject = function(level_int, game_state){
    let object = {};
    object.level_int = level_int;
    object.stages_array = [];
    object.AddAdvancementPredicate = (predicate) => {
        object.stages_array.push({predicate:predicate, stage_int:object.stages_array.length});
    }


}

function createButton(name,id, class_name){
    var button = document.createElement("button");
    button.innerHTML = name;
    button.id = id;
    button.className = "clicker";
    return button;
}

function removeAllEventListeners() {
    var all_buttons = document.getElementsByClassName("clicker");
    for (var i = 0; i < all_buttons.length; i++) {
        all_buttons[i].removeEventListener("click", function(){});
    }   
}

function callLevel(level_int,game_state){
    if (game_state === undefined) {
        alert('game_state is undefined');
        console.log("game_state is undefined");
        return -1;
    }
    removeAllEventListeners()
    document.getElementById("play_area").innerHTML = "";


    let level_array = []
    level_array.push(levelOne);
    if (level_int == 0){
        levelIntro(game_state)
        }else{
        let func = level_array[level_int - 1];
        func(game_state);
        }

}




async function levelIntro(game_state)
    {
    let play_area_div = document.getElementById("play_area");
    let text_object = await CreateNarrativeTextObject();
    text_object.AddNarrativeText("You ask yourself, \"What is the purpose of my life?\"");
    text_object.AddNarrativeText("And you decide it is to find truth.");
    text_object.AddNarrativeText("So you study science.");
    text_object.AddNarrativeText("First, biology.");
    text_object.AddNarrativeText("Then, physics.");
    text_object.AddNarrativeText("Then, computer science.");
    text_object.AddNarrativeText("Finally, AI.");
    text_object.AddNarrativeText("And you realize AI is the most important field in all of science.");
    text_object.AddNarrativeText("As AI is the study of intelligence, and it is intelligence that makes all sciences possible.");
    await text_object.PlayText();

    let essay_cnt = 1
    async function WriteApplication() {
        //remove the button with the id apply_to_grad
        let text_object = await CreateNarrativeTextObject();
        document.getElementById("apply_to_grad").removeEventListener('click',WriteApplication);
        document.getElementById("apply_to_grad").remove();
        let time = 10 * 10000;
        text_object.AddNarrativeText("You better start typing out your application.",null,1000);
        text_object.AddNarrativeText("You know how to type right?",null,1000);
        text_object.AddNarrativeText("You just have to keep hitting keys, it will come out fine.",null,1000);
        text_object.PlayText();
        let typer_object = createTyperObject(game_state);
        typer_object.OverridePaperTitle("How I overcame adversity and plan to change the world for the better with ML")
        typer_object.AddFinishedFunction(function(){essay_cnt++
            Rejection();
        });
        typer_object.AddTyper(game_state);
    }
    async function Rejection()
        {
        document.getElementById('console').innerHTML = "";
        let text_object = await CreateNarrativeTextObject();
        text_object.AddNarrativeText("Thank you for your interest in our program. We regret to inform you that imposter syndrome is not a syndrome if you are actually an imposter. Your academic record is an embarrassment, and, frankly, we feel you have not overcome enough adversity.")
        text_object.AddNarrativeText("We hope our firm rejection will be taken as a hardship you can overcome, and perhaps even mention in your application essays to other, lesser schools.");
        await text_object.PlayText();
        play_area_div.appendChild(createButton("Apply to different grad school", "apply_to_grad", "clicker"));
//        document.getElementById("write_gain").addEventListener('click',));
        }
    play_area_div.appendChild(createButton("Apply to grad school", "apply_to_grad", "clicker"));
    document.getElementById("apply_to_grad").addEventListener('click', WriteApplication);
    return;
    //play_area_div.appendChild();
    //startTime();
//    play_area_div.appendChild(createButton("Publish Paper", "publish_paper", "clicker"));
//    document.getElementById("publish_paper").addEventListener('click', publishPaper);
    //document.addEventListener("keydown", typing);
    let stages_array = [];

    let grad_school_test = {}
    grad_school.game_state = game_state;
    grad_school.AdvancementPredicate = function(){return game_state.papers_published == 10};
    text_object = CreateNarrativeTextObject();
    grad_school_test.text_object = text_object;
    stages_array.push(grad_school_test);


    return;

    let grad_school_text = await CreateNarrativeTextObject();
    text_object.AddNarrativeText("");

    index = 0;
 //   function NextText() {
 //       removeAllEventListeners()
 //       let text_hash = text_hash_array[index];
 //       let func_hash = text_hash.function;
 //       let func = func_hash.name;
 //       let func_args  = func_hash.args;
 //       console.log('func args',func_args);
 //       consoleAddText(text_hash.text)
 //       document.getElementById("level_one_click").addEventListener('click', func(func_args[0],func_args[1]));
 //   }

    play_area_div.appendChild(createButton("Apply to grad school", "level_one_click", "clicker"));
    document.getElementById("level_one_click").addEventListener('click', NextText);
    }

function levelOne(game_state){
    console.log("game_state line 86",game_state);
    game_state.level = 1;

    function publishPaper() {
        var num_cites_div = document.getElementById('num_cites');
    
        var num_papers_div = document.getElementById('num_papers');
        let message = "";

        if (Math.random() < 0.4) {
            let ran_cites = Math.floor(Math.random() * 20) + 1;
            game_state.num_cites = parseInt(game_state.num_cites) + parseInt(ran_cites);
            let time_or_times = "times";
            if (ran_cites == 1) {
                time_or_times = "time";
            }
            message = "Your paper (" + paper_name + ") was cited " + ran_cites +  " " + time_or_times + ".";
            }else {
                message = "Your paper (" + paper_name + ") was not cited.";
                }
            
        if (num_cites_div.getAttribute('total_cites') === 0){
            let paper_or_papers = "papers"
            if (num_cites.attributes.getNamedItem('total_clicks').value == 1)
                {
                paper_or_papers = "paper"
                }
            message = "No one cares about your papers yet"
            }
        else if (game_state.num_cites > 10){
            message = "Game over: DeepMind made AGI without you. Everyone you love is now dead, including you!!";
            document.getElementById("publish_paper").style.display = "none";
            consoleAddText(message);
            sleep(2000);
        }else{
            renderState(game_state);
            consoleAddText(message);
            }
        var paper_name = genPaperName()
        game_state.papers_published.list_of_papers.push(paper_name);
    }
    renderState(game_state);
}

function createStagesObject_remove(game_state, calling_stage) { 
    let stage_hash = {};
    stage_hash.calling_stage = calling_stage;
    stage_hash.sub_stages_array = [];
    stage_hash.game_state = game_state;
    stage_hash.default_console_speed = 1000;
    stage_hash.default_console_type_speed = 30;

    stage_hash.AddGamePlayFunction = function(function_name) {
        this.game_play_function = function_name;
    };

    stage_hash.SetDefaultConsoleSpeed = function(speed){
        this.default_console_speed = speed;
    };
    stage_hash.SetDefaultConsoleTypeSpeed = function(speed){
        //speed of delay as each character is typed
        this.default_console_type_speed = speed;
    };

    stage_hash.clicker_array = [];
    stage_hash.advancement_predicate_array = [];
    stage_hash.AddAdvancementPredicate = (predicate) => {
        stage_hash.advancement_predicate_array.push(predicate);
    };
    stage_hash.narrative_array = [];
    stage_hash.AddFuction = (func,args_array) => {
    stage_hash.title = title;
    stage_hash.function = func;
    stage_hash.args_array = args_array;
    };
    stage_hash.AddNarrativeText = (text,speed,type_speed) => {
        console_speed = speed || stage_hash.default_console_speed;
        console_type_speed = type_speed || stage_hash.default_console_type_speed;
        stage_hash.narrative_array.push({text:text,console_speed: console_speed,console_type_speed: console_type_speed,});
    };
    stage_hash.AddText = (text) => {stage_hash.text = text};
    stage_hash.sub_stages_array.push(stage_hash);
    stage_hash.stage_cnt = 0;
    stage_hash.AddStage = (title) => {
            let new_stage = createStagesObject(this.game_state)
            this.sub_stages_array.push(createStagesObject(this.game_state));
            return new_stage;
            };
    return stage_hash;
}