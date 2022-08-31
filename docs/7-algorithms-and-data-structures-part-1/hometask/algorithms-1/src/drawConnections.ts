const drawConnections = (c: Element): void => {
  const keyFrom = c.getAttribute('data-from');
  const keyTo = c.getAttribute('data-to');
  const fromElem = document.querySelector(`#id_${keyFrom}`);
  const toElem = document.querySelector(`#id_${keyTo}`);
  const {x: x1, y: y1} = fromElem?.getBoundingClientRect() || {x: 0, y: 0};
  const {x: x2, y: y2} = toElem?.getBoundingClientRect() || { x:0, y:0 };
  const isFromTopLeftX = x2 > x1;
  const isFromTopLeftY= y2 > y1;
  const width = isFromTopLeftX  ? x2 - x1 : x1 - x2;
  const left = (isFromTopLeftX ? x1 : x2) + 20;
  const top = (isFromTopLeftY ? y1 : y2) + 20;
  const height = Math.abs(y2 - y1) + 1
  c.setAttribute('style', `width: ${width}px; height: ${height}px; left: ${left}px; top:${top}px`);
  c.classList.toggle('fromTopLeft', isFromTopLeftX);
  c.classList.toggle('fromBottomRight', !isFromTopLeftX);
}

export default drawConnections;
