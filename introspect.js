function highlight(key) {
  clear();

  var annotation = annotations[key];
  if (annotation !== undefined) {
    $('html,body').css('cursor', 'default');
    $("#" + annotation.highlight).addClass("annotation-extremities");
    setExplanation(annotation.text);
  }
};

function unhighlight(key) {
  $('html,body').css('cursor', 'text');
  var annotation = annotations[key];

};

function clearHighlight() {
  $("#code span").removeClass("annotation-extremities");
};

function clear() {
  clearExplanation();
  clearHighlight();
};

function setExplanation(explanation) {
  $("#explanation").text(explanation);
  $("#explanation").addClass("explanation-on");
};

function clearExplanation() {
  $("#explanation").text("woo");
  $("#explanation").removeClass("explanation-on");
};

var annotations = {
  c: { text: "Creates a circle and names it 'ball'", highlight: "a" },
  d: { text: "Creates a circle", highlight: "d" },
  e: { text: "x coordinate of the circle", highlight: "e" },
  f: { text: "y coordinate of the circle", highlight: "f" },
  g: { text: "Radius of the circle", highlight: "g" },
};

(function setupHovering() {
  Object.keys(annotations).forEach(function(key) {
    $("#" + key).mousemove(function(e) {
      highlight(key);
      e.stopPropagation();
    });

    $("#code").mousemove(function(e) {
      clear();
    });
  });
})();
