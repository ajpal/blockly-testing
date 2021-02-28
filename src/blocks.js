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
  return `mock(${func}, ${ret});\n`;
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
  return `tests.push(function() {\n${Blockly.JavaScript.blockToCode(
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
    this.appendValueInput("val11").setCheck("String").appendField("assert");
    this.appendValueInput("val2").setCheck("String").appendField("equals");
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
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["assertcalled"] = function (block) {
  var funcName = Blockly.JavaScript.valueToCode(
    block,
    "funcName",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `assertCalled(${funcName});\n`;
};
