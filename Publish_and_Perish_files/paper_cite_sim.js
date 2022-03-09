"use strict";

function createNode(name) {
  let node = {};
  node.name = name;
  node.degree = 1;
  node.cited_by = [];
  node.is_citing = [];
  return node;
}

function addNewNode(node_list) {
  num_edges = Math.floor(Math.random() * 30) + 1;
  if (num_edges > node_list.length) {
    num_edges = node_list.length;
  }

  let degree_sum = 0;
  node_list.forEach(function (node) {
    degree_sum += node.degree;
  });

  let highest_probability = 0;
  let cumulative_probability_array = [];
  let probability_to_node_hash = {};
  node_list.forEach(function (node) {
    degree_sum += node.degree;
    let probability = node.degree / degree_sum;
    node.probablity = probability;
    probability_to_node_hash[node.probablity] = node;
    cumulative_probability_array.push(probability);
    if (probability > highest_probability) {
      highest_probability = probability;
    }
  });

  let new_node = createNode(genPaperName());

  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  for (var i = 0; i < num_edges; i++) {
    let ran_num = randomFloat(0, highest_probability);
    for (let i = 0; i < cumulative_probability_array.length; i++) {
      let probability = cumulative_probability_array[i];
      if (parseFloat(ran_num) >= parseFloat(probability)) {
        let node_to_add = probability_to_node_hash[probability];
        node_to_add.cited_by.push(new_node);
        node_to_add.degree++;
        new_node.is_citing.push(node_to_add);
        break;
      }
    }
  }
  node_list.push(new_node);
  return node_list;
}

async function generateNodeList() {
  let paper_node_list = [];
  paper_node_list.push(createNode(genPaperName()));
  for (let i = 0; i < 1000; i++) {
    paper_node_list = addNewNode(paper_node_list);
  }
  return paper_node_list;
}
