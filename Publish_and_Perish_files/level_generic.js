
function createStagesObject(game_state, calling_stage) {
    let object_main = {};
    object_main.calling_stage = calling_stage;
    object_main.sub_stages_array = [];
    object_main.game_state = game_state;
    object_main.default_console_speed = 1000;
    object_main.default_console_type_speed = 30;
    object_main.AddWinCondition = function(win_condition_function){
        this.win_condition_function = win_condition_function;
    }
    object_main.SetDefaultConsoleSpeed = function(speed){
        this.default_console_speed = speed;
    };
    object_main.SetDefaultConsoleTypeSpeed = function(speed){
        //speed of delay as each character is typed
        this.default_console_type_speed = speed;
    };

    object_main.AddStage = (title) => {
        let stage_hash = {};
        stage_hash.sub_stages_array = [];
        stage_hash.AddSubStage = () => {
            stage_hash.sub_stages_array.push(createStagesObject(this.game_state));
        };
        stage_hash.clicker_array = [];
        stage_hash.advancement_predicate_array = [];
        stage_hash.PushAdvancementPredicate = (predicate) => {
            stage_hash.advancement_predicate_array.push(predicate);
        };
        stage_hash.narrative_array = [];
        stage_hash.AddFuction = (func,args_array) => {
        stage_hash.title = title;
        stage_hash.function = func;
        stage_hash.args_array = args_array;
        };
        stage_hash.AddNarrativeText = (text,speed,type_speed) => {
        console_speed = speed || object_main.default_console_speed;
        console_type_speed = type_speed || object_main.default_console_type_speed;
        stage_hash.narrative_array.push({text:text,console_speed: console_speed,console_type_speed: console_type_speed,});
        };
        stage_hash.AddText = (text) => {stage_hash.text = text};
        object_main.sub_stages_array.push(stage_hash);
        return stage_hash;
        }
    object_main.stage_cnt = 0;
    return object_main;
}

async function PlayStagesObject(stage_object){
    for (let i = 0; i < stage_object.sub_stages_array.length; i++) {  
        let sub_stage = stage_object.sub_stages_array[i];
        for (let i = 0; i < sub_stage.narrative_array.length; i++){
            let narrative_hash = sub_stage.narrative_array[i];
            await consoleAddText(narrative_hash.text, narrative_hash.console_type_speed);
            await sleep(narrative_hash.console_speed);
        }
    }
 }

function createButton(name,id,class_name){
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
    console.log("18",game_state);
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
    game_state.level = 0;
    let text_array = [];

    let stages_object = createStagesObject();
    let intro = stages_object.AddStage("Intro");
    intro.AddNarrativeText('You ask yourself, "What is the most important thing to me?"');
    intro.AddNarrativeText("And you think it is truth.");
    intro.AddNarrativeText("So you study science.");
    intro.AddNarrativeText("First, biology.");
    intro.AddNarrativeText("Then, physics.");
    intro.AddNarrativeText("Then, computer science.");
    intro.AddNarrativeText("Finally, AI.");
    intro.AddNarrativeText("And you realize AI is the most important field in all of science.");
    intro.AddNarrativeText("As AI is the study of intelligence, and it is intelligence that makes all sciences possible.");

    await PlayStagesObject(stages_object);


    return;
    let apply_to_grad_school = stages_object.AddStage('Intro');

    return;
    for (let i = 0; i < text_array.length; i++) {
        await console_add_text(text_array[i]);
        await sleep(1200);
    }

    startTime()
    let text_hash_array = [];

    let last_hash = {};
    last_hash.text = "[Bunch of stuff before this] \"Why don't you try to publish it?\" she asks you. \"You can do it!\"";
    last_hash.function = {name:callLevel,args:[1,game_state]};

    let get_into_grad_school = createStage();
    get_into_grad_school.AddText("[Bunch of stuff before this] \"Why don't you try to publish it?\" she asks you. \"You can do it!\"");
    get_into_grad_school.AddFuction(callLevel,[1,game_state]);
    console.log(text_hash_array);

    index = 0;
    function NextText() {
        removeAllEventListeners()
        let text_hash = text_hash_array[index];
        let func_hash = text_hash.function;
        let func = func_hash.name;
        let func_args  = func_hash.args;
        console.log('func args',func_args);
        consoleAddText(text_hash.text, game_state)
        document.getElementById("level_one_click").addEventListener('click', func(func_args[0],func_args[1]));
    }

    let play_area_div = document.getElementById("play_area");
    play_area_div.appendChild(createButton("Apply to grad school", "level_one_click", "clicker"));
    document.getElementById("level_one_click").addEventListener('click', NextText);
    }

function levelOne(game_state){
    console.log("game_state line 86",game_state);
    game_state.level = 1;

    function publishPaper() {
        let paper_name = genPaperName()
        game_state.papers_published.list_of_papers.push(paper_name);
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
            renderState(game_state);
            message = "Game over: DeepMind made AGI without you. Everyone you love is now dead, including you!!";
            document.getElementById("publish_paper").style.display = "none";
            console_add_text(message);
        }else{
            renderState(game_state);
            console_add_text(message)
            }
        }

    let play_area_div = document.getElementById("play_area");
    play_area_div.appendChild(createButton("Publish Paper", "publish_paper", "clicker"));
    document.getElementById("publish_paper").addEventListener('click', publishPaper);
    renderState(game_state);
}

function sampleArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function genAIterm(){
    let terms = ['Goose','A/B testing', 'Accuracy', 'actions', 'activation functions', 'active learning', 'AdaGrad', 'agents', 'agglomerative clustering', 'anomaly detection', 'AR', 'artificial general intelligence', 'artificial intelligence', 'artificial goose intelligence', 'attention', 'attributes', 'AUC (Area under the ROC Curve)', 'augmented reality', 'automation bias', 'average precision', 'backpropagation', 'bag of words', 'baselines', 'batches', 'batch normalization', 'batch sizes', 'Bayesian neural networks', 'Bayesian optimization', 'Bellman equations', 'BERT (Bidirectional Encoder Representations from Transformers)', 'bias (ethics/fairness)', 'bias (math)', 'bigrams', 'bidirectional encoders', 'bidirectional language models', 'large language models', 'language models', 'Parameters', 'Money','the aaaaaapill', 'binary classification', 'binning', 'BLEU (Bilingual Evaluation Understudy)', 'boosting', 'bounding box', 'broadcasting', 'bucketing', 'C', 'calibration layers', 'candidate generation', 'candidate sampling', 'categorical data', 'causal language models', 'centroid', 'centroid-based clustering', 'checkpoints', 'classes', 'classification models', 'classification thresholds', 'Cloud TPUs', 'clustering', 'convex functions', 'devices', 'empirical risk minimization (ERM)', 'encoders', 'fairness constraints', 'false positives (FP)', 'feature vectors', 'generative adversarial networks (GAN)', 'gradient clipping', 'hinge loss', 'inference', 'in-group bias', 'IoU', 'labeled example', 'LaMDA (Language Model for Dialogue Applications)', 'lambda', 'linear regression', 'logistic regression', 'Log Loss', 'nodes (neural network)', 'one-shot learning', 'one-vs.-all', 'catgirls', 'a catgirl', 'geese', 'goosegirls','recurrent neural networks','LSTM networks','evolutionary algorithms','transformers','Nonsense AI paper titles','parameters','metaoptimizers','random forest autoencoders','crowdsourced annotated datasets','3e-4 as a learning rate','humans','crabs','random seed optimization','agent-based modelling',"Maxwell's Demon"];
    return sampleArray(terms);
}

function genProblemName(){
    let problems = ['Magic: The Gathering','tic-tac-toe','chess','go','the N-queens problem','natural language processing','catgirls','planetary accretion','the elongated orbits of Kuiper belt objects',"the Sun's magnetic field",'goose breed classification','world hunger','systemic risks','space weather','p-nuclei','the Higgs Boson','the internal structure of black holes','goosegirls','AI waifus','the Final Parsec Problem','dark matter','dark energy','the size of the universe','the shape of the universe','the Horizon Problem','extraterrestrial life','cosmic inflation','the origin of life','the origin of viruses','the development of the brain','the Golgi apparatus','protein folding','the mechanism action of drugs','protein design','gene editing','the origin of blood types','the existence of human sex pheromones','the biological function of sleep','the plastic nature of the brain','the reward functions of the brain','free will','consciousness','language','the storage of memories in the brain','the origin of goose','flocking','goose migration','the ovaries of basking sharks','biosynthesis of molecules','P versus NP','one-way functions','the halting problem','polynomial integer factorization','clustered planar drawings','parity games','X + Y sorting','linear programming','the Cambridge capital controversy','revealed preference','the Equity premium puzzle','the Dividend puzzle','the Black-Scholes model','the Formalist-substantivist debate','the Enigma code','the capacity of a Network','the capacity of the broadcast channel','quantum capacity','the capacity of a two-way channel',"Hilbert's problems","Landau's problems","Taniyama's problems","Millenium Prize problems","the Navier-Stokes existence and smoothness",'the Riemman hypothesis',"Lehmer's conjecture",'the convergence of Flint Hills series','sudoku',"Conway's 99-graph problem","the Fermat-Catalan conjecture",'the Goldbach conjecture','systematic errors','Meta-analysis','Multiple comparsions','Bayesian statistics','the Doomsday argument','Anthropic arguments','quantum gravity','the Vacuum catastrophe','Supersymmetry','self-driving','object detection','object classification','computer vision','AI boxing','robotics','weather forecasting','market predictions','high frequency trading','nomadic goat herders','fashion design','metaoptimization','unsupervised learning','shape rotation capabilities','automated code generation','AI-assisted writing','automated theorem proving','face recognition','style transfer','art generation',"Maxwell's Demon"]
    return sampleArray(problems);
}

function genPaperName(){
    let papernameGenerators = [
        () => { return "An investigation into " + genAIterm() },
        () => { return "An investigation into " + genAIterm() + " as a way to solve " + genProblemName() },
        () => { return "Scaling laws for " + genAIterm() },
        () => { return "Scaling laws for " + genAIterm() + " in the context of " + genProblemName() },
        () => { return "A study of " + genAIterm() + " in " + genProblemName() },
        () => { return "Prediction of the optimal " + genAIterm() },
        () => { return "Prediction of the optimal " + genAIterm() + " applied to " + genProblemName() },
        () => { return "Transfer learning for " + genAIterm() },
        () => { return "Transfer learning for " + genAIterm() + " derived from " + genAIterm() },
        () => { return "On the unreasonable effectiveness of " + genAIterm() },
        () => { return "On the unreasonable effectiveness of " + genAIterm() + " for solving " + genProblemName() },
        () => { return "Anomaly detection using " + genAIterm() },
        () => { return "Anomaly detection using " + genAIterm() + " in the context of " + genProblemName() },
        () => { return "A comparative analysis of " + genAIterm() },
        () => { return "A comparative analysis of " + genAIterm() + " within the " + genProblemName() + " framework" },
        () => { return "On the impossibility of " + genAIterm() },
        () => { return "Optimizing the " + genAIterm() + " by treating it as " + genAIterm() },
        () => { return "Optimizing the " + genAIterm() + " for solving " + genProblemName() },
        () => { return "Distributed training of " + genAIterm() },
        () => { return "Distributed training of " + genAIterm() + " for solving " + genProblemName() },
        () => { return "Optimal results for " + genProblemName() },
        () => { return "A theoretical framework for " + genAIterm() },
        () => { return "Ending world hunger with " + genAIterm() },
        () => { return "Ending world hunger with " + genAIterm() + " by using the lessons learned from solving " + genProblemName() },
        () => { return "A survey of the " + genAIterm() },
        () => { return "Making " + genAIterm() + " go brrrrr: A First Principles Approach" },
        () => { return genProblemName() + " and why " + genAIterm() + " is the best way to solve it" },
        () => { return genProblemName() + " and why " + genAIterm() + " is not enough to solve it" },
        () => { return "From reinforcement learning to " + genAIterm() },
        () => { return "The use of " + genAIterm() + " to solve " + genProblemName() },
        () => { return "Designing resilient architectures with " + genAIterm() },
        () => { return "Trancending the " + genAIterm() },
        () => { return "Trancending from " + genAIterm() + " to " + genAIterm() },
        () => { return "A philosophical treatise on " + genAIterm() },
        () => { return "Predicting the optimal solution for " + genProblemName() },
        () => { return "Network analysis of " + genAIterm() },
        () => { return "Training " + genAIterm() + " for solving " + genProblemName() },
        () => { return "Learning to recognize " + genAIterm() },
        () => { return "Improving performance in " + genProblemName() },
        () => { return "Anomaly detection in " + genProblemName() },
        () => { return genAIterm() + " is all you need" },
        () => { return genAIterm() + " considered harmful" },
        () => { return genAIterm() + " is a new way to solve " + genProblemName() },
        () => { return genAIterm() + ": is more parameters always better?" },
        () => { return genAIterm() + ": is it the best we can do?" },
        () => { return genAIterm() + ": is it really the best way to solve " + genProblemName() + "?" },
        () => { return genAIterm() + ": is too many layers actually a good thing?" },
        () => { return "On the impossibility of solving " + genProblemName() },
        () => { return genAIterm() + ": a biologically-inspired model" },
        () => { return genAIterm() + " as a model of " + genProblemName() },
        () => { return "The " + genAIterm() + " technique is turing-complete?" },
        () => { return "We can do better than " + genAIterm()  },
        () => { return "Generating malware with " + genAIterm() },
        () => { return "A literature review of " + genAIterm() },
    ]
    result = sampleArray(papernameGenerators)();
    // make first letter uppercase
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}