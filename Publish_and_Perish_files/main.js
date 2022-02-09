
function renderState(game_state){
    document.getElementById("num_papers").innerHTML = game_state.papers_published.list_of_papers.length;
    document.getElementById("num_cites").innerHTML = game_state.num_cites;
    game_state.time_step++;
}


async function main(){
    let game_state = {};
    game_state.citations = 0;
    game_state.level = 0;
    game_state.num_cites = 0;
    game_state.papers_published = {list_of_papers:[]};
    game_state.console_window_array = [];
    game_state.time_step = 0
    //let papers = await generateNodeList();
    //papers = papers.sort(function(a,b){
    //    return b.degree - a.degree;
    //});
    //game_state.all_papers_in_world = papers; 
    callLevel(0,game_state);
}


