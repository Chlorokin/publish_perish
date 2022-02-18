function sampleArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function genAIterm() {
  let terms = [
    "Goose",
    "A/B testing",
    "Accuracy",
    "actions",
    "activation functions",
    "active learning",
    "AdaGrad",
    "agents",
    "agglomerative clustering",
    "anomaly detection",
    "AR",
    "artificial general intelligence",
    "artificial intelligence",
    "artificial goose intelligence",
    "attention",
    "attributes",
    "AUC (Area under the ROC Curve)",
    "augmented reality",
    "automation bias",
    "average precision",
    "backpropagation",
    "bag of words",
    "baselines",
    "batches",
    "batch normalization",
    "batch sizes",
    "Bayesian neural networks",
    "Bayesian optimization",
    "Bellman equations",
    "BERT (Bidirectional Encoder Representations from Transformers)",
    "bias (ethics/fairness)",
    "bias (math)",
    "bigrams",
    "bidirectional encoders",
    "bidirectional language models",
    "large language models",
    "language models",
    "Parameters",
    "Money",
    "the aaaaaapill",
    "binary classification",
    "binning",
    "BLEU (Bilingual Evaluation Understudy)",
    "boosting",
    "bounding box",
    "broadcasting",
    "bucketing",
    "C",
    "calibration layers",
    "candidate generation",
    "candidate sampling",
    "categorical data",
    "causal language models",
    "centroid",
    "centroid-based clustering",
    "checkpoints",
    "classes",
    "classification models",
    "classification thresholds",
    "Cloud TPUs",
    "clustering",
    "convex functions",
    "devices",
    "empirical risk minimization (ERM)",
    "encoders",
    "fairness constraints",
    "false positives (FP)",
    "feature vectors",
    "generative adversarial networks (GAN)",
    "gradient clipping",
    "hinge loss",
    "inference",
    "in-group bias",
    "IoU",
    "labeled example",
    "LaMDA (Language Model for Dialogue Applications)",
    "lambda",
    "linear regression",
    "logistic regression",
    "Log Loss",
    "nodes (neural network)",
    "one-shot learning",
    "one-vs.-all",
    "catgirls",
    "a catgirl",
    "geese",
    "goosegirls",
    "recurrent neural networks",
    "LSTM networks",
    "evolutionary algorithms",
    "transformers",
    "Nonsense AI paper titles",
    "parameters",
    "metaoptimizers",
    "random forest autoencoders",
    "crowdsourced annotated datasets",
    "3e-4 as a learning rate",
    "humans",
    "crabs",
    "random seed optimization",
    "agent-based modelling",
    "Maxwell's Demon",
  ];
  return sampleArray(terms);
}

function genProblemName() {
  let problems = [
    "Magic: The Gathering",
    "tic-tac-toe",
    "chess",
    "go",
    "the N-queens problem",
    "natural language processing",
    "catgirls",
    "planetary accretion",
    "the elongated orbits of Kuiper belt objects",
    "the Sun's magnetic field",
    "goose breed classification",
    "world hunger",
    "systemic risks",
    "space weather",
    "p-nuclei",
    "the Higgs Boson",
    "the internal structure of black holes",
    "goosegirls",
    "AI waifus",
    "the Final Parsec Problem",
    "dark matter",
    "dark energy",
    "the size of the universe",
    "the shape of the universe",
    "the Horizon Problem",
    "extraterrestrial life",
    "cosmic inflation",
    "the origin of life",
    "the origin of viruses",
    "the development of the brain",
    "the Golgi apparatus",
    "protein folding",
    "the mechanism action of drugs",
    "protein design",
    "gene editing",
    "the origin of blood types",
    "the existence of human sex pheromones",
    "the biological function of sleep",
    "the plastic nature of the brain",
    "the reward functions of the brain",
    "free will",
    "consciousness",
    "language",
    "the storage of memories in the brain",
    "the origin of goose",
    "flocking",
    "goose migration",
    "the ovaries of basking sharks",
    "biosynthesis of molecules",
    "P versus NP",
    "one-way functions",
    "the halting problem",
    "polynomial integer factorization",
    "clustered planar drawings",
    "parity games",
    "X + Y sorting",
    "linear programming",
    "the Cambridge capital controversy",
    "revealed preference",
    "the Equity premium puzzle",
    "the Dividend puzzle",
    "the Black-Scholes model",
    "the Formalist-substantivist debate",
    "the Enigma code",
    "the capacity of a Network",
    "the capacity of the broadcast channel",
    "quantum capacity",
    "the capacity of a two-way channel",
    "Hilbert's problems",
    "Landau's problems",
    "Taniyama's problems",
    "Millenium Prize problems",
    "the Navier-Stokes existence and smoothness",
    "the Riemman hypothesis",
    "Lehmer's conjecture",
    "the convergence of Flint Hills series",
    "sudoku",
    "Conway's 99-graph problem",
    "the Fermat-Catalan conjecture",
    "the Goldbach conjecture",
    "systematic errors",
    "Meta-analysis",
    "Multiple comparsions",
    "Bayesian statistics",
    "the Doomsday argument",
    "Anthropic arguments",
    "quantum gravity",
    "the Vacuum catastrophe",
    "Supersymmetry",
    "self-driving",
    "object detection",
    "object classification",
    "computer vision",
    "AI boxing",
    "robotics",
    "weather forecasting",
    "market predictions",
    "high frequency trading",
    "nomadic goat herders",
    "fashion design",
    "metaoptimization",
    "unsupervised learning",
    "shape rotation capabilities",
    "automated code generation",
    "AI-assisted writing",
    "automated theorem proving",
    "face recognition",
    "style transfer",
    "art generation",
    "Maxwell's Demon",
  ];
  return sampleArray(problems);
}

function genPaperName() {
  let papernameGenerators = [
    () => {
      return "An investigation into " + genAIterm();
    },
    () => {
      return (
        "An investigation into " +
        genAIterm() +
        " as a way to solve " +
        genProblemName()
      );
    },
    () => {
      return "Scaling laws for " + genAIterm();
    },
    () => {
      return (
        "Scaling laws for " +
        genAIterm() +
        " in the context of " +
        genProblemName()
      );
    },
    () => {
      return "A study of " + genAIterm() + " in " + genProblemName();
    },
    () => {
      return "Prediction of the optimal " + genAIterm();
    },
    () => {
      return (
        "Prediction of the optimal " +
        genAIterm() +
        " applied to " +
        genProblemName()
      );
    },
    () => {
      return "Transfer learning for " + genAIterm();
    },
    () => {
      return (
        "Transfer learning for " + genAIterm() + " derived from " + genAIterm()
      );
    },
    () => {
      return "On the unreasonable effectiveness of " + genAIterm();
    },
    () => {
      return (
        "On the unreasonable effectiveness of " +
        genAIterm() +
        " for solving " +
        genProblemName()
      );
    },
    () => {
      return "Anomaly detection using " + genAIterm();
    },
    () => {
      return (
        "Anomaly detection using " +
        genAIterm() +
        " in the context of " +
        genProblemName()
      );
    },
    () => {
      return "A comparative analysis of " + genAIterm();
    },
    () => {
      return (
        "A comparative analysis of " +
        genAIterm() +
        " within the " +
        genProblemName() +
        " framework"
      );
    },
    () => {
      return "On the impossibility of " + genAIterm();
    },
    () => {
      return (
        "Optimizing the " + genAIterm() + " by treating it as " + genAIterm()
      );
    },
    () => {
      return (
        "Optimizing the " + genAIterm() + " for solving " + genProblemName()
      );
    },
    () => {
      return "Distributed training of " + genAIterm();
    },
    () => {
      return (
        "Distributed training of " +
        genAIterm() +
        " for solving " +
        genProblemName()
      );
    },
    () => {
      return "Optimal results for " + genProblemName();
    },
    () => {
      return "A theoretical framework for " + genAIterm();
    },
    () => {
      return "Ending world hunger with " + genAIterm();
    },
    () => {
      return (
        "Ending world hunger with " +
        genAIterm() +
        " by using the lessons learned from solving " +
        genProblemName()
      );
    },
    () => {
      return "A survey of the " + genAIterm();
    },
    () => {
      return (
        "Making " + genAIterm() + " go brrrrr: A First Principles Approach"
      );
    },
    () => {
      return (
        genProblemName() +
        " and why " +
        genAIterm() +
        " is the best way to solve it"
      );
    },
    () => {
      return (
        genProblemName() +
        " and why " +
        genAIterm() +
        " is not enough to solve it"
      );
    },
    () => {
      return "From reinforcement learning to " + genAIterm();
    },
    () => {
      return "The use of " + genAIterm() + " to solve " + genProblemName();
    },
    () => {
      return "Designing resilient architectures with " + genAIterm();
    },
    () => {
      return "Trancending the " + genAIterm();
    },
    () => {
      return "Trancending from " + genAIterm() + " to " + genAIterm();
    },
    () => {
      return "A philosophical treatise on " + genAIterm();
    },
    () => {
      return "Predicting the optimal solution for " + genProblemName();
    },
    () => {
      return "Network analysis of " + genAIterm();
    },
    () => {
      return "Training " + genAIterm() + " for solving " + genProblemName();
    },
    () => {
      return "Learning to recognize " + genAIterm();
    },
    () => {
      return "Improving performance in " + genProblemName();
    },
    () => {
      return "Anomaly detection in " + genProblemName();
    },
    () => {
      return genAIterm() + " is all you need";
    },
    () => {
      return genAIterm() + " considered harmful";
    },
    () => {
      return genAIterm() + " is a new way to solve " + genProblemName();
    },
    () => {
      return genAIterm() + ": is more parameters always better?";
    },
    () => {
      return genAIterm() + ": is it the best we can do?";
    },
    () => {
      return (
        genAIterm() +
        ": is it really the best way to solve " +
        genProblemName() +
        "?"
      );
    },
    () => {
      return genAIterm() + ": is too many layers actually a good thing?";
    },
    () => {
      return "On the impossibility of solving " + genProblemName();
    },
    () => {
      return genAIterm() + ": a biologically-inspired model";
    },
    () => {
      return genAIterm() + " as a model of " + genProblemName();
    },
    () => {
      return "The " + genAIterm() + " technique is turing-complete?";
    },
    () => {
      return "We can do better than " + genAIterm();
    },
    () => {
      return "Generating malware with " + genAIterm();
    },
    () => {
      return "A literature review of " + genAIterm();
    },
  ];
  result = sampleArray(papernameGenerators)();
  // make first letter uppercase
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}
