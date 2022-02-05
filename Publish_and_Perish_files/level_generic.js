function createButton(name,id, class_name){
    var button = document.createElement("button");
    button.innerHTML = name;
    button.id = id;
    button.className = "clicker";
    return button;
}

function callLevel(level_int){
    let level_array = []
    level_array.push(levelOne);
    let func = level_array[level_int - 1];
    func();
}

function levelOne(){
    function publishPaper() {
        document.getElementById("console").innerHTML = "";
        var num_cites_div = document.getElementById('num_cites');
    
        var num_papers_div = document.getElementById('num_papers');
        num_papers_div.attributes.getNamedItem('total_clicks').value++;
    
        let message = "";
        if (Math.random() < 0.4) {
            let ran_cites = Math.floor(Math.random() * 5) + 1;
            let old_val = num_cites_div.attributes.getNamedItem('total_cites').value
            num_cites_div.attributes.getNamedItem('total_cites').value = parseInt(old_val) + parseInt(ran_cites);
            let time_or_times = "times";
            if (ran_cites == 1) {
                time_or_times = "time";
            }
            message = "Your paper (" + paperNameGen() + ") was cited " + ran_cites +  " " + time_or_times + ".";
            }else {
                message = "Your paper (" + paperNameGen() + ") was not cited.";
                }
            
        if (num_cites_div.getAttribute('total_cites') === 0){
            let paper_or_papers = "papers"
            if (num_cites.attributes.getNamedItem('total_clicks').value == 1)
                {
                paper_or_papers = "paper"
                }
            message = "No one cares about your papers yet"
            }
        else if (num_cites_div.getAttribute('total_cites') > 10){
            message = "Game over: DeepMind made AGI without you. Everyone you love is now dead, including you!!";
            document.getElementById("publish_paper").style.display = "none";
             typeWriter(message);
        }else{
            num_cites_div.innerHTML = num_cites_div.getAttribute('total_cites');;
            num_papers_div.innerHTML = num_papers.attributes.getNamedItem('total_clicks').value;
            console_add_text(message)
            }
        }

    let play_area_div = document.getElementById("play_area");
    play_area_div.appendChild(createButton("Publish Paper", "publish_paper", "clicker"));
    document.getElementById("publish_paper").addEventListener('click', publishPaper);
}




function paperNameGen(){
    let noun_array = GetTermList();
    function titleCase(str) {
        const lowerCase = str.toLowerCase();
    
        return lowerCase.replace(/\w\S*/g, x => x.charAt(0).toUpperCase() + x.substr(1).toLowerCase());
      }
    let paper_name = noun_array[Math.floor(Math.random() * noun_array.length)]
    return titleCase(paper_name) + ",  All You Need";
    }

function GetTermList(){
    return ['Did You Know?', 'A', ' A/B testing', ' accuracy', ' Click the icon for additional notes. ', 'action', 'activation function', 'active learning', ' AdaGrad', ' agent', ' agglomerative clustering', ' anomaly detection', ' AR', ' area under the PR curve', ' area under the ROC curve', ' artificial general intelligence', ' artificial intelligence', ' attention', ' attribute', ' AUC (Area under the ROC Curve)', ' augmented reality', ' automation bias ', ' average precision ', 'B', ' backpropagation', ' bag of words', ' baseline', ' batch', ' batch normalization', ' batch size', ' Bayesian neural network', ' Bayesian optimization', ' Bellman equation', ' BERT (Bidirectional Encoder Representations from Transformers)', ' bias (ethics/fairness)', ' bias (math)', ' bigram', ' bidirectional', ' bidirectional language model', ' binary classification', ' binning', ' BLEU (Bilingual Evaluation Understudy)', ' boosting', ' bounding box', ' broadcasting', ' bucketing', 'C', ' calibration layer', ' candidate generation', ' candidate sampling', ' categorical data', ' causal language model', 'centroid', ' centroid-based clustering', ' checkpoint', ' class', ' classification model', ' classification threshold', ' Cloud TPU ', 'clustering', ' convex function', ' device', ' empirical risk minimization (ERM)', ' encoder', 'F', ' fairness constraint', ' false positive (FP)', ' feature vector', ' generative adversarial network (GAN)', ' gradient clipping', ' hinge loss', ' inference', ' in-group bias ', 'IoU', ' labeled example', ' LaMDA (Language Model for Dialogue Applications)', ' lambda', ' linear regression', ' logistic regression', ' Log Loss', ' node (neural network)', ' one-shot learning', ' one-vs.-all']
}

