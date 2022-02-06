
function CreateNode(name){
    let node = {};
    node.name = name;
    node.degree = 1;
    node.cited_by = [];
    node.is_citing = [];
    return node;
}

function AddNewNode(node_list){
    let new_node = CreateNode(paperNameGen());
    if (node_list.length === 0)
        {
        node_list.push(new_node);
        }

    num_edges = Math.floor(Math.random() * 10) + 1;
    if (num_edges > node_list.length)
        {
        num_edges = node_list.length;
        }

    let degree_sum = 0;
    node_list.forEach(function(node){
        degree_sum += node.degree;
        });

    let cumulative_probability_array = [];
    let probability_to_node_hash = {};
    node_list.forEach(function(node){
        degree_sum += node.degree;
        let probability = (node.degree + 1) / degree_sum;
        node.probablity = probability 
        probability_to_node_hash[node.probablity] = node;
        cumulative_probability_array.push(probability);
        });


    for (let i = 0; i < num_edges; i++){
        let ran_num = Math.random();
        cumulative_probability_array.forEach(function(probability){
        if (ran_num < probability){
            let node_to_add = probability_to_node_hash[probability];
            node_to_add.cited_by.push(new_node);
            new_node.is_citing.push(node_to_add);
            node_to_add.degree++;
            }
        });
    }
    node_list.push(new_node);
    return node_list;
}

function GenerateNodeList(){
    let paper_node_list = [];
    for (let i = 0; i < 2; i++){
        paper_node_list.push(CreateNode(paperNameGen()));
    }

    for (let i = 0; i < 9998 ; i++){
        paper_node_list = AddNewNode(paper_node_list);
    }
    return paper_node_list;
}

async function PaperCiteSimTest(game_state){
    if (game_state.all_papers_in_word === undefined){
        game_state.all_papers_in_word = GenerateNodeList();
        console.log('game_state.all_papers_in_word',game_state.all_papers_in_word);
    }   
    game_state.all_papers_in_word = AddNewNode(game_state.all_papers_in_word);
    let sorted_test_arrray = game_state.all_papers_in_word.sort(function(a,b){
        return b.degree - a.degree;
    });
    // take the to first 40 elements in the array and console.log them
    first_forty = sorted_test_arrray.slice(0,40);
    first_forty.forEach(function(node){
        console.log(node);
    });

}