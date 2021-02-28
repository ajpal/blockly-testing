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
