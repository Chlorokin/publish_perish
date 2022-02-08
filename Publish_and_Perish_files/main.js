
function renderState(game_state){
    let total_papers = game_state.papers_published.list_of_papers.length;
    document.getElementById("num_papers").innerHTML = total_papers;
    let num_cites = game_state.num_cites;
    document.getElementById("num_cites").innerHTML = num_cites;

    let top_forty = game_state.all_papers_in_world.slice(0,20);
    let table = document.createElement('table');
    for (let i = 0; i < top_forty.length; i++) {
        // create a row
        let row = table.insertRow(i);
        // create a cell
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        // add the text to the cell
        let paper = top_forty[i];
        console.log('paper is',paper);
        cell1.innerHTML = 1 + i;
        cell2.innerHTML = paper.name;
        let num_cites = paper.cited_by.length;
        cell3.innerHTML = num_cites;
    }
    document.getElementById("cite_table").innerHTML = '';
    document.getElementById("cite_table").appendChild(table);


}


async function main(){
    let game_state = {};
    game_state.citations = 0;
    game_state.level = 0;
    game_state.num_cites = 0;
    game_state.papers_published = {list_of_papers:[]};
    let papers = await generateNodeList();
    papers = papers.sort(function(a,b){
        return b.degree - a.degree;
    });
    game_state.all_papers_in_world = papers; 
    callLevel(0,game_state);


}


