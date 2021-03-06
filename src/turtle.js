import * as utils from "./utils";

export default class Turtle {
  init() {
    this.HEIGHT = 400;
    this.WIDTH = 400;
    this.visible = true;

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
    testResults = [];
    this.x = this.HEIGHT / 2;
    this.y = this.WIDTH / 2;
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
  }

  executeProgram() {
    this.reset();
    var code = "var stacks = {};\n";
    code += "var tests = [];\n";
    code += Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    console.log(code);
    eval(code);
  }

  executeTests() {
    var code = "var stacks = {};\n";
    code += "var tests = [];\n";
    code += Blockly.JavaScript.workspaceToCode(
      Blockly.mainWorkspace,
      true /* forTest */
    );
    code += "showTestResults(tests);\n";
    console.log(code);
    eval(code);
  }

  move(distance) {
    if (distance) {
      this.ctxScratch.beginPath();
      this.ctxScratch.moveTo(this.x, this.y);
      var radians = Blockly.utils.math.toRadians(this.angleDegrees);
      this.x += distance * Math.sin(radians);
      this.y -= distance * Math.cos(radians);
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

var testResults = [];
var showTestResults = function (tests) {
  tests.forEach((testFn) => testFn());
  console.log(testResults);
  testResults.forEach((result) =>
    $("#testResults").append(`<li>${result}</li>`)
  );
};

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
