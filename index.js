var annotations = {
  b: { text: ["The name given to the thing on the right of the ':'"] },
  c: { text: ["Creates a circle and names it 'black-circle' so it can be referred to later. "],
       highlight: "a" },
  d: { text: ["Creates a circle"] },
  e: { text: ["A number",
              "x coordinate of a circle"] },
  f: { text: ["A number",
              "y coordinate of a circle"] },
  g: { text: ["A number",
              "Radius of a circle"] },
  h: { text: ["Draw a thing"] },
  i: { text: ["A thing called 'black-circle'",
              "A thing to draw"] },
};

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
  $("#code span")
    .removeClass("annotation-extremities")
    .removeClass("annotation-hot-area");
};

function explanationToHtml(text) {
  return text.map(function(item) { return "* " + item; }).join("<br />");
};

function updateExplanationView(state) {
  var hoveringOver = state.get("hoveringOver");
  var isExplaining = state.get("isExplaining");

  if (isExplaining && hoveringOver !== undefined) {
    $("#explanation").html(explanationToHtml(annotations[hoveringOver].text));
  } else if (isExplaining) {
    $("#explanation").text("Hover your mouse over something to see an explanation");
  } else {
    $("#explanation").text("");
  }
};

// event handler setup functions

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

function setExplaining() {
  var newIsExplainingState = state.get("isExplaining") === true ? false : true;
  state.set("isExplaining", newIsExplainingState);
  $("#code").attr("contenteditable", !newIsExplainingState);
};

function setupButtonClicking() {
  $("#explain").click(setExplaining);
};

// setup app

var state = new State({ isExplaining: false, hoveringOver: undefined });
setupHovering();
setupButtonClicking();
