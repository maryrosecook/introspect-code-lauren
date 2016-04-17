// model

function State(initialState) {
  var state = {};

  this.set = function(key, value) {
    state[key] = value;
    updateView(this);
  };

  this.get = function(key) {
    return state[key];
  };

  var self = this;
  Object.keys(initialState).forEach(function(key) {
    self.set(key, initialState[key]);
  });
};

var annotations = {
  b: { text: "The name given to the thing on the right of the ':'" },
  c: { text: "Creates a circle and names it 'black-circle'", highlight: "a" },
  d: { text: "Creates a circle" },
  e: { text: "x coordinate of the circle" },
  f: { text: "y coordinate of the circle" },
  g: { text: "Radius of the circle" },
  h: { text: "Draw a thing" },
  i: { text: "The thing to draw" },
};

// view

function updateView(state) {
  updateButtonView(state)
  updateCodeView(state);
  updateExplanationView(state);
};

function updateButtonView(state) {
  if (state.get("isExplaining") === true) {
    $("#explain").addClass("on");
  } else {
    $("#explain").removeClass("on");
  }
};

function updateCodeView(state) {
  clearCodeHighlight();

  var hoveringOver = state.get("hoveringOver");
  var isExplaining = state.get("isExplaining");
  if (isExplaining && hoveringOver !== undefined) {
    var annotation = annotations[hoveringOver];
    if (annotation !== undefined) {
      var highlight = annotation.highlight || hoveringOver;
      $('html,body').css('cursor', 'default');
      $("#" + highlight).addClass("annotation-extremities");
      $("#" + hoveringOver).addClass("annotation-hot-area");
    }
  }
};

function clearCodeHighlight() {
  $("#code span").removeClass("annotation-extremities");
  $("#code span").removeClass("annotation-hot-area");
};

function updateExplanationView(state) {
  var hoveringOver = state.get("hoveringOver");
  var isExplaining = state.get("isExplaining");

  if (isExplaining && hoveringOver !== undefined) {
    $("#explanation").text(annotations[hoveringOver].text);
  } else if (isExplaining) {
    $("#explanation").text("Hover your mouse over something to see an explanation");
  } else {
    $("#explanation").text("");
  }
};

// event handler functions

function clickExplain() {
  if (state.get("isExplaining") === true) {
    state.set("isExplaining", false);
  } else {
    state.set("isExplaining", true);
  }
};

function setupHovering() {
  $("body").mousemove(function(e) {
    state.set("hoveringOver", undefined);
  });

  Object.keys(annotations).forEach(function(key) {
    $("#" + key).mousemove(function(e) {
      state.set("hoveringOver", this.id);
      e.stopPropagation();
    });
  });
};

function setupButtonClicking() {
  $("#explain").click(clickExplain);
};

// setup app

var state = new State({ isExplaining: false, hoveringOver: undefined });
setupHovering();
setupButtonClicking();
