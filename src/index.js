import "./blocks";
import Turtle from "./turtle";

Blockly.inject("blockly", {
  toolbox: document.getElementById("toolbox"),
  media: "./node_modules/blockly/media/",
});
