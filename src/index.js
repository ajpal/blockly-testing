import "./blocks";
import Turtle from "./turtle";

const workspace = Blockly.inject("blockly", {
  toolbox: document.getElementById("toolbox"),
  media: "./node_modules/blockly/media/",
});

Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"), workspace);
