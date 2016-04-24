var annotations = {
  a: { text: ["Creates a circle and names it 'black-circle' so it can be referred to later. "] },
  c: { text: ["Creates a circle"] },
  d: { text: ["An action that creates a circle when run"] },
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

var stepToAnnotation = [
  "e", "f", "g", "d", "c", "a", "i", "h"
];

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
  updateCodeView(state);
  updateButtonView(state);
  updateExplanationView(state);
};

function updateCodeView(state) {
  clearCodeAnnotation();

  if (state.get("paused") === true) {
    var id = annotationId(stepToAnnotation, state.get("step"));
    if (id !== undefined) {
      $("#" + id).addClass("annotation");
    }
  }
};

function updateButtonView(state) {
  updateRewindButton(state);
  updateStepBackwardsButton(state);
  updateStepForwardsButton(state);
  updatePlayPauseButton(state);
};

function updateRewindButton(state) {
  if (state.get("step") === 0) {
    $("#rewind-button").addClass("disabled");
  } else {
    $("#rewind-button").removeClass("disabled");
  }
};

function updateStepBackwardsButton(state) {
  if (state.get("step") === 0) {
    $("#step-backwards-button").addClass("disabled");
  } else {
    $("#step-backwards-button").removeClass("disabled");
  }
};

function updateStepForwardsButton(state) {
  if (state.get("step") === stepToAnnotation.length - 1) {
    $("#step-forwards-button").addClass("disabled");
  } else {
    $("#step-forwards-button").removeClass("disabled");
  }
};

function updatePlayPauseButton(state) {
  if (state.get("paused") === true) {
    $("#play-pause-button")
      .removeClass("pause-button")
      .addClass("play-button");
  } else if (state.get("paused") === false) {
    $("#play-pause-button")
      .removeClass("play-button")
      .addClass("pause-button");
  }
};

function annotationId(stepToAnnotation, step) {
  return stepToAnnotation[step];
};

function clearCodeAnnotation() {
  $("#code span").removeClass("annotation")
};

function explanationToHtml(text) {
  return text.map(function(item) { return "* " + item; }).join("<br />");
};

function updateExplanationView(state) {
  var id = annotationId(stepToAnnotation, state.get("step"));
  if (id !== undefined) {
    $("#explanation").html(explanationToHtml(annotations[id].text));
  }
};

// event handler setup functions

function setStep(state, newStep) {
  if (newStep >= 0 && newStep < stepToAnnotation.length) {
    state.set("step", newStep);
  }
};

function setupButtonClicking(state) {
  $("#rewind-button").click(function() {
    setStep(state, 0);
  });

  $("#step-backwards-button").click(function() {
    state.set("paused", true);
    setStep(state, state.get("step") - 1);
  });

  $("#step-forwards-button").click(function() {
    state.set("paused", true);
    setStep(state, state.get("step") + 1);
  });

  $("#play-pause-button").click(function() {
    state.set("paused", !state.get("paused"));
  });
};

// setup app

var state = new State({ paused: true, step: 0 });
setupButtonClicking(state);
