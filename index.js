function highlight(key) {
  clear();

  var annotation = annotations[key];
  if (annotation !== undefined) {
    $('html,body').css('cursor', 'default');
    $("#" + annotation.highlight).addClass("annotation-extremities");
    $("#" + key).addClass("annotation-hot-area");
    setExplanation(annotation.text);
  }
};

function clearHighlight() {
  $("#code span").removeClass("annotation-extremities");
  $("#code span").removeClass("annotation-hot-area");
};

function clear() {
  clearExplanation();
  clearHighlight();
};

function setExplanation(explanation) {
  $("#explanation").text(explanation);
  $("#explanation").addClass("on");
};

function clearExplanation() {
  $("#explanation").text("");
  $("#explanation").removeClass("on");
};

var annotations = {
  c: { text: "Creates a circle and names it 'black-circle'", highlight: "a" },
  d: { text: "Creates a circle", highlight: "d" },
  e: { text: "x coordinate of the circle", highlight: "e" },
  f: { text: "y coordinate of the circle", highlight: "f" },
  g: { text: "Radius of the circle", highlight: "g" },
};

function setupHovering() {
  $("body").mousemove(function(e) {
    clear();
  });

  Object.keys(annotations).forEach(function(key) {
    $("#" + key).mousemove(function(e) {
      if (state.get("explainingSyntax") === true)
      highlight(key);
      e.stopPropagation();
    });
  });
};

function teardownHovering() {
  $("#code").unbind("mousemove");

  Object.keys(annotations).forEach(function(key) {
    $("#" + key).unbind("mousemove");
  });
};

function State(initialState) {
  var state = {};

  this.set = function(key, value) {
    state[key] = value;
    updateButtonView(this);
  };

  this.get = function(key) {
    return state[key];
  };

  var self = this;
  Object.keys(initialState).forEach(function(key) {
    self.set(key, initialState[key]);
  });
};

function updateButtonView(state) {
  if (state.get("explainingSyntax") === true) {
    $("#explain-syntax").addClass("on");
  } else {
    $("#explain-syntax").removeClass("on");
  }
};

function clickExplainSyntax() {
  if (state.get("explainingSyntax") === true) {
    state.set("explainingSyntax", false);
  } else {
    state.set("explainingSyntax", true);
  }
};

(function setupButtonClicking() {
  $("#explain-syntax").click(clickExplainSyntax);
})();

var state = new State({ explainingSyntax: false });
setupHovering();
