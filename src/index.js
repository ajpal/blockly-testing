import "./blocks";
import Turtle from "./turtle";

Blockly.inject("blockly", {
  toolbox: document.getElementById("toolbox"),
  media: "./node_modules/blockly/media/",
});
const turtle = new Turtle();
turtle.init();
