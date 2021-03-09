export function bindClick(el, func) {
  if (!el) {
    throw TypeError("Element not found: " + el);
  }
  if (typeof el == "string") {
    el = document.getElementById(el);
  }
  el.addEventListener("click", func, true);
  el.addEventListener("touchend", func, true);
}

export function normalizeAngle(angle) {
  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

export function getFuncName(func) {
  if (func[0] === "'" && func[func.length - 1] === "'") {
    func = func.substring(1, func.length - 1);
  }
  if (func === "window.prompt" || func === "window.alert") {
    return func;
  }
  var funcName = Blockly.JavaScript.variableDB_.getName(
    func,
    Blockly.PROCEDURE_CATEGORY_NAME
  );
  return funcName;
}
