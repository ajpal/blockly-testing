import * as utils from "./utils";

export default class Turtle {
  init() {
    this.HEIGHT = 400;
    this.WIDTH = 400;
    this.visible = true;
    this.turtleLog = [];

    this.visualization = document.getElementById("visualization");
    this.ctxDisplay = document.getElementById("display").getContext("2d");
    this.ctxScratch = document.getElementById("scratch").getContext("2d");

    Blockly.JavaScript.addReservedWords(
      "moveForward,moveBackward," +
        "turnRight,turnLeft,penUp,penDown,penWidth,penColour," +
        "hideTurtle,showTurtle"
    );

    Blockly.JavaScript.addReservedWords("stacks,tests");

    utils.bindClick("runProgramButton", this.runProgramButtonClick.bind(this));
    utils.bindClick(
      "resetProgramButton",
      this.resetProgramButtonClick.bind(this)
    );

    utils.bindClick("runTestsButton", this.runTestsButtonClick.bind(this));
    utils.bindClick("resetTestsButton", this.resetTestsButtonClick.bind(this));
    this.reset();
  }

  reset() {
    this.x = this.HEIGHT / 2;
    this.y = this.WIDTH / 2;
    this.turtleLog = [
      new Blockly.utils.Coordinate(Math.round(this.x), Math.round(this.y)),
    ];
    this.angleDegrees = 0;
    this.isPenDown = true;
    this.visible = true;

    this.ctxScratch.canvas.width = this.ctxScratch.canvas.width;
    this.ctxScratch.strokeStyle = "#ffffff";
    this.ctxScratch.fillStyle = "#ffffff";
    this.ctxScratch.lineWidth = 5;
    this.ctxScratch.lineCap = "round";

    this.display();
  }

  display() {
    this.ctxDisplay.beginPath();
    this.ctxDisplay.rect(
      0,
      0,
      this.ctxDisplay.canvas.width,
      this.ctxDisplay.canvas.height
    );
    this.ctxDisplay.fillStyle = "#000000";
    this.ctxDisplay.fill();

    // Draw the user layer.
    this.ctxDisplay.globalCompositeOperation = "source-over";
    this.ctxDisplay.drawImage(this.ctxScratch.canvas, 0, 0);

    // Draw the turtle.
    if (this.visible) {
      this.ctxDisplay.strokeStyle = "#ffffff";
      this.ctxDisplay.fillStyle = "#ffffff";
      // Draw the turtle body.
      var radius = 10;
      this.ctxDisplay.beginPath();
      this.ctxDisplay.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
      this.ctxDisplay.lineWidth = 3;
      this.ctxDisplay.stroke();

      // Draw the turtle head.
      var WIDTH = 0.3;
      var HEAD_TIP = 10;
      var ARROW_TIP = 4;
      var BEND = 6;
      var radians = Blockly.utils.math.toRadians(this.angleDegrees);
      var tipX = this.x + (radius + HEAD_TIP) * Math.sin(radians);
      var tipY = this.y - (radius + HEAD_TIP) * Math.cos(radians);
      radians -= WIDTH;
      var leftX = this.x + (radius + ARROW_TIP) * Math.sin(radians);
      var leftY = this.y - (radius + ARROW_TIP) * Math.cos(radians);
      radians += WIDTH / 2;
      var leftControlX = this.x + (radius + BEND) * Math.sin(radians);
      var leftControlY = this.y - (radius + BEND) * Math.cos(radians);
      radians += WIDTH;
      var rightControlX = this.x + (radius + BEND) * Math.sin(radians);
      var rightControlY = this.y - (radius + BEND) * Math.cos(radians);
      radians += WIDTH / 2;
      var rightX = this.x + (radius + ARROW_TIP) * Math.sin(radians);
      var rightY = this.y - (radius + ARROW_TIP) * Math.cos(radians);
      this.ctxDisplay.beginPath();
      this.ctxDisplay.moveTo(tipX, tipY);
      this.ctxDisplay.lineTo(leftX, leftY);
      this.ctxDisplay.bezierCurveTo(
        leftControlX,
        leftControlY,
        rightControlX,
        rightControlY,
        rightX,
        rightY
      );
      this.ctxDisplay.closePath();
      this.ctxDisplay.fill();
    }
  }

  runProgramButtonClick(e) {
    var runButton = document.getElementById("runProgramButton");
    var resetButton = document.getElementById("resetProgramButton");
    runButton.style.display = "none";
    resetButton.style.display = "inline";
    this.executeProgram();
  }

  resetProgramButtonClick(e) {
    var runButton = document.getElementById("runProgramButton");
    var resetButton = document.getElementById("resetProgramButton");
    resetButton.style.display = "none";
    runButton.style.display = "inline";
    this.reset();
  }

  runTestsButtonClick(e) {
    var runButton = document.getElementById("runTestsButton");
    var resetButton = document.getElementById("resetTestsButton");
    runButton.style.display = "none";
    resetButton.style.display = "inline";
    this.executeTests();
  }

  resetTestsButtonClick(e) {
    var runButton = document.getElementById("runTestsButton");
    var resetButton = document.getElementById("resetTestsButton");
    resetButton.style.display = "none";
    runButton.style.display = "inline";
    this.reset();
    $("#testResults").empty();
    testResults = [];
  }

  executeProgram() {
    this.reset();
    var code = "var stacks = {};\n";
    code += "var tests = [];\n";
    code += "var mocks = [];\n";
    code += Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    eval(code);
  }

  executeTests() {
    var code = "var stacks = {};\n";
    code += "var tests = [];\n";
    code += "var mocks = {};\n";
    code += Blockly.JavaScript.workspaceToCode(
      Blockly.mainWorkspace,
      true /* forTest */
    );
    code += "showTestResults(tests);\n";
    eval(code);
  }

  move(distance) {
    if (distance) {
      this.ctxScratch.beginPath();
      this.ctxScratch.moveTo(this.x, this.y);
      var radians = Blockly.utils.math.toRadians(this.angleDegrees);
      this.x += distance * Math.sin(radians);
      this.y -= distance * Math.cos(radians);
      this.turtleLog.push(
        new Blockly.utils.Coordinate(Math.round(this.x), Math.round(this.y))
      );
      if (this.isPenDown) {
        this.ctxScratch.lineTo(this.x, this.y);
        this.ctxScratch.stroke();
      }
    }
    this.display();
  }

  turn(angle) {
    this.angleDegrees = utils.normalizeAngle(this.angleDegrees + angle);
    this.display();
  }

  setPenDown(isPenDown) {
    this.isPenDown = isPenDown;
    this.display();
  }

  penWidth(width) {
    this.ctxScratch.lineWidth = width;
    this.display();
  }

  penColour(colour) {
    this.ctxScratch.strokeStyle = colour;
    this.ctxScratch.fillStyle = colour;
    this.display();
  }

  setVisible(isVisible) {
    this.isVisible = isVisible;
    this.display();
  }
}

// Turtle API
const turtle = new Turtle();
turtle.init();

var moveForward = function (distance) {
  turtle.move(distance);
};

var moveBackward = function (distance, i) {
  turtle.move(-distance);
};

var turnRight = function (angle) {
  turtle.turn(angle);
};

var turnLeft = function (angle) {
  turtle.turn(-angle);
};

var penUp = function () {
  turtle.setPenDown(false);
};

var penDown = function () {
  turtle.setPenDown(true);
};

var penWidth = function (width) {
  turtle.penWidth(width);
};

var penColour = function (colour) {
  turtle.penColour(colour);
};

var hideTurtle = function () {
  turtle.setVisible(false);
};

var showTurtle = function () {
  turtle.setVisible(true);
};

// DSL API
var assertEqual = function (val1, val2) {
  if (val1 == val2) {
    testResults.push(`pass: ${val1} == ${val2}`);
  } else {
    testResults.push(`fail: expected ${val1} to equal ${val2}`);
  }
};

var testResults = [];
var showTestResults = function (tests) {
  tests.forEach((testFn) => {
    turtle.reset();
    testFn();
  });
  console.log(testResults);
  testResults.forEach((result) =>
    $("#testResults").append(`<li>${result}</li>`)
  );
};

var assertTurtleStart = function (x, y) {
  const actualStart = turtle.turtleLog[0];
  if (
    Blockly.utils.Coordinate.equals(
      new Blockly.utils.Coordinate(x, y),
      actualStart
    )
  ) {
    testResults.push(`pass: turtle starts at (${x}, ${y})`);
  } else {
    testResults.push(
      `fail: turtle started at (${actualStart.x}, ${actualStart.y}), not at (${x}, ${y})`
    );
  }
};

var assertTurtleEnd = function (x, y) {
  const actualEnd = turtle.turtleLog[turtle.turtleLog.length - 1];
  if (
    Blockly.utils.Coordinate.equals(
      new Blockly.utils.Coordinate(x, y),
      actualEnd
    )
  ) {
    testResults.push(`pass: turtle ended at (${x}, ${y})`);
  } else {
    testResults.push(
      `fail: turtle ended at (${actualEnd.x}, ${actualEnd.y}), not at (${x}, ${y})`
    );
  }
};

var assertTurtleThrough = function (x, y) {
  var expected = new Blockly.utils.Coordinate(x, y);
  var current = turtle.turtleLog[0];
  var result = `fail: turtle did not go through (${x}, ${y})`;
  for (var i = 0; i < turtle.turtleLog.length; i++) {
    var d1 = Blockly.utils.Coordinate.distance(current, turtle.turtleLog[i]);
    var d2 =
      Blockly.utils.Coordinate.distance(current, expected) +
      Blockly.utils.Coordinate.distance(expected, turtle.turtleLog[i]);
    // for three points a, b, c: If distance a->b + b->c == distance a->c, then b is along the line defined by a and c
    // Add a small buffer region so that you can mostly use integer values
    if (Math.abs(d1 - d2) < 0.1) {
      result = `pass: turtle went through (${x}, ${y})`;
      break;
    }
    current = turtle.turtleLog[i];
  }
  testResults.push(result);
};

var calls = {};
var assertCalled = function (fnName, times) {
  var actual = calls[fnName] || 0;
  if (actual === times) {
    testResults.push(`pass: "${fnName}" was called ${times} times.`);
  } else {
    testResults.push(
      `fail: "${fnName}" was called ${actual} times, but was expected to be called ${times} times.`
    );
  }
};
