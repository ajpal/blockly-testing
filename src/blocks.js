const HUE = 160;
Blockly.Blocks["turtle_move"] = {
  /**
   * Block for moving forward or backwards.
   * @this {Blockly.Block}
   */
  init: function () {
    var DIRECTIONS = [
      ["move forward", "moveForward"],
      ["move backward", "moveBackward"],
    ];
    this.setColour(HUE);
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), "DIR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.JavaScript["turtle_move"] = function (block) {
  // Generate JavaScript for moving forward or backwards.
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  return `${block.getFieldValue("DIR")}(${value});\n`;
};

Blockly.Blocks["turtle_turn"] = {
  /**
   * Block for turning left or right.
   * @this {Blockly.Block}
   */
  init: function () {
    var DIRECTIONS = [
      ["turn right", "turnRight"],
      ["turn left", "turnLeft"],
    ];

    this.setColour(HUE);
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), "DIR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.JavaScript["turtle_turn"] = function (block) {
  // Generate JavaScript for turning left or right.
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  return `${block.getFieldValue("DIR")}(${value});\n`;
};

Blockly.Blocks["turtle_width"] = {
  /**
   * Block for setting the width.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(HUE);
    this.appendValueInput("WIDTH")
      .setCheck("Number")
      .appendField("set width to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.JavaScript["turtle_width"] = function (block) {
  // Generate JavaScript for setting the width.
  var width =
    Blockly.JavaScript.valueToCode(
      block,
      "WIDTH",
      Blockly.JavaScript.ORDER_COMMA
    ) || "1";
  return `penWidth(${width});\n`;
};

Blockly.Blocks["turtle_pen"] = {
  /**
   * Block for pen up/down.
   * @this {Blockly.Block}
   */
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "PEN",
          options: [
            ["pen up", "penUp"],
            ["pen down", "penDown"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: HUE,
    });
  },
};

Blockly.JavaScript["turtle_pen"] = function (block) {
  // Generate JavaScript for pen up/down.
  return `${block.getFieldValue("PEN")}();\n`;
};

Blockly.Blocks["turtle_visibility"] = {
  /**
   * Block for changing turtle visiblity.
   * @this {Blockly.Block}
   */
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "VISIBILITY",
          options: [
            ["hide turtle", "hideTurtle"],
            ["show turtle", "showTurtle"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: HUE,
    });
  },
};

Blockly.JavaScript["turtle_visibility"] = function (block) {
  // Generate JavaScript for changing turtle visibility.
  return `${block.getFieldValue("VISIBILITY")}();\n`;
};

Blockly.Blocks["turtle_colour"] = {
  /**
   * Block for setting the colour.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(Blockly.Msg["COLOUR_HUE"]);
    this.appendValueInput("COLOUR")
      .setCheck("Colour")
      .appendField("set colour to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.JavaScript["turtle_colour"] = function (block) {
  // Generate JavaScript for setting the colour.
  var colour =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOUR",
      Blockly.JavaScript.ORDER_COMMA
    ) || "'#000000'";
  return `penColour(${colour});\n`;
};

Blockly.Blocks["mock"] = {
  init: function () {
    this.appendValueInput("func").setCheck(null).appendField("mock function");
    this.appendValueInput("ret").setCheck(null).appendField("and return");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["mock"] = function (block) {
  var func = Blockly.JavaScript.valueToCode(
    block,
    "func",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var ret = Blockly.JavaScript.valueToCode(
    block,
    "ret",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `mocks[${func}] = function() {\ncalls[${func}] ||= 0;\ncalls[${func}]++;\nreturn ${ret}\n};\n`;
};

// Override to check if we should call the mock instead of the real function
Blockly.JavaScript["procedures_callreturn"] = function (block) {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.PROCEDURE_CATEGORY_NAME
  );
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] =
      Blockly.JavaScript.valueToCode(
        block,
        "ARG" + i,
        Blockly.JavaScript.ORDER_NONE
      ) || "null";
  }
  var modifiedCode = `(mocks['${funcName}'] ? mocks['${funcName}'](${args.join(
    ", "
  )}) : ${funcName}(${args.join(", ")}))`;
  return [modifiedCode, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Override to check if we should call the mock instead of the real function
Blockly.JavaScript["text_print"] = function (block) {
  // Print statement.
  var msg =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_NONE
    ) || "''";
  return (
    "(mocks['window.alert'] ? mocks['window.alert']() : window.alert(" +
    msg +
    "));\n"
  );
};

Blockly.Blocks["name_stack"] = {
  init: function () {
    this.appendValueInput("NAME").setCheck("String").appendField("name");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["name_stack"] = function (block) {
  var name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `stacks[${name}] = function() {\n${Blockly.JavaScript.blockToCode(
    block.childBlocks_[1]
  )}\n}\n`;
};

Blockly.Blocks["invoke_stack"] = {
  init: function () {
    this.appendValueInput("NAME").setCheck("String").appendField("call");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["invoke_stack"] = function (block) {
  var name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `if (typeof stacks[${name}] == "function") {
    stacks[${name}]();
  }\n`;
};

Blockly.Blocks["test"] = {
  init: function () {
    this.appendDummyInput().appendField("Test");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["test"] = function (block) {
  return `tests.push(function() {\n//Scope mocks and calls to single test\nmocks={};calls={};\n${Blockly.JavaScript.blockToCode(
    block.childBlocks_[0]
  )}}\n);\n`;
};

Blockly.Blocks["turtle_start"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turtle starts at (")
      .appendField(new Blockly.FieldNumber(0), "x")
      .appendField(",")
      .appendField(new Blockly.FieldNumber(0), "y")
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["turtle_start"] = function (block) {
  var x = block.getFieldValue("x");
  var y = block.getFieldValue("y");
  return `assertTurtleStart(${x}, ${y});\n`;
};

Blockly.Blocks["turtle_end"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turtle ends at (")
      .appendField(new Blockly.FieldNumber(0), "x")
      .appendField(",")
      .appendField(new Blockly.FieldNumber(0), "y")
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["turtle_end"] = function (block) {
  var x = block.getFieldValue("x");
  var y = block.getFieldValue("y");
  return `assertTurtleEnd(${x}, ${y});\n`;
};

Blockly.Blocks["turtle_through"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turtle goes through (")
      .appendField(new Blockly.FieldNumber(0), "x")
      .appendField(",")
      .appendField(new Blockly.FieldNumber(0), "y")
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["turtle_through"] = function (block) {
  var x = block.getFieldValue("x");
  var y = block.getFieldValue("y");
  return `assertTurtleThrough(${x}, ${y});\n`;
};

Blockly.Blocks["assertequal"] = {
  init: function () {
    this.appendValueInput("val11").appendField("assert");
    this.appendValueInput("val2").appendField("equals");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["assertequal"] = function (block) {
  var val1 = Blockly.JavaScript.valueToCode(
    block,
    "val11",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var val2 = Blockly.JavaScript.valueToCode(
    block,
    "val2",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `assertEqual(${val1}, ${val2});\n`;
};

Blockly.Blocks["assertcalled"] = {
  init: function () {
    this.appendValueInput("funcName")
      .setCheck("String")
      .appendField("assert function");
    this.appendDummyInput().appendField("was called");
    this.appendValueInput("times").setCheck("Number");
    this.appendDummyInput().appendField("times");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["assertcalled"] = function (block) {
  var funcName =
    Blockly.JavaScript.valueToCode(
      block,
      "funcName",
      Blockly.JavaScript.ORDER_ATOMIC
    ) || '""';
  var times =
    Blockly.JavaScript.valueToCode(
      block,
      "times",
      Blockly.JavaScript.ORDER_ATOMIC
    ) || 0;
  return `assertCalled(${funcName}, ${times});\n`;
};

const blockToCode = Blockly.Generator.prototype.blockToCode.bind(
  Blockly.JavaScript
);
// Override so that test blocks are not part of the top-level code.
Blockly.Generator.prototype.blockToCode = function (
  block,
  opt_thisOnly,
  forTest
) {
  if (block && block.type === "test") {
    opt_thisOnly = true;
  }
  if (forTest && block && block.type === "name_stack") {
    opt_thisOnly = true;
  }
  return blockToCode(block, opt_thisOnly);
};

// Override so that when running tests, we only generate the code needed for the test
Blockly.Generator.prototype.workspaceToCode = function (workspace, forTest) {
  if (!workspace) {
    // Backwards compatibility from before there could be multiple workspaces.
    console.warn("No workspace specified in workspaceToCode call.  Guessing.");
    workspace = Blockly.getMainWorkspace();
  }
  var allowedForTest = ["procedures_defreturn", "name_stack", "test"];
  var code = [];
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true);
  for (var i = 0, block; (block = blocks[i]); i++) {
    if (forTest && !allowedForTest.includes(block.type)) {
      console.log(block.type);
      continue;
    }
    var line = this.blockToCode(block, false /* opt_thisOnly */, forTest);
    if (Array.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = this.scrubNakedValue(line);
        if (this.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
          line = this.injectId(this.STATEMENT_PREFIX, block) + line;
        }
        if (this.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
          line = line + this.injectId(this.STATEMENT_SUFFIX, block);
        }
      }
      code.push(line);
    }
  }
  code = code.join("\n"); // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, "");
  code = code.replace(/\n\s+$/, "\n");
  code = code.replace(/[ \t]+\n/g, "\n");
  return code;
};
