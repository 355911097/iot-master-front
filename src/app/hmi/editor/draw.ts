import {Element, Svg} from "@svgdotjs/svg.js";

export function draw(container: Svg): Element {
  let elem: Element;
  // @ts-ignore
  switch (this.type) {
    case 'basic':
      throw new Error('Please implement draw()');
    case 'control':
      // @ts-ignore
      elem = container.nested(this.template);
      break;
    case 'object':
      elem = container.foreignObject(0, 0);
      break;
    default:
      throw new Error('Unknown type');
  }
  return elem;
}

export function edit(container: Svg, element: Element) {
  //缩放


}
