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
  return (
    block.getFieldValue("DIR") +
    "(" +
    value +
    ", 'block_id_" +
    block.id +
    "');\n"
  );
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
  return (
    block.getFieldValue("DIR") +
    "(" +
    value +
    ", 'block_id_" +
    block.id +
    "');\n"
  );
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
  return "penWidth(" + width + ", 'block_id_" + block.id + "');\n";
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
  return block.getFieldValue("PEN") + "('block_id_" + block.id + "');\n";
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
  return block.getFieldValue("VISIBILITY") + "('block_id_" + block.id + "');\n";
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
  return "penColour(" + colour + ", 'block_id_" + block.id + "');\n";
};
