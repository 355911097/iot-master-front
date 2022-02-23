import {
  Circle,
  Container,
  Ellipse,
  ForeignObject,
  Image,
  Line,
  Polygon,
  Polyline,
  Rect,
  Svg,
  Text
} from "@svgdotjs/svg.js";
import {HmiComponent, HmiEntity} from "../hmi";

function editPoints(container: Container, element: Line | Polygon | Polyline, properties: any) {
  let points = element.array() //.toArray()
  let draw = container.group()
  points.forEach((p, i) => {
    let pt = draw.circle(8).fill('#7be').center(p[0], p[1]).css('cursor', 'pointer').draggable();
    pt.on("dragmove", () => {
      p[0] = pt.cx()
      p[1] = pt.cy()
      element.plot(points)
    })
  })
}

function editRect(container: Container, element: Rect | Ellipse | Text | Image | Svg | ForeignObject, properties: any) {

}

function editCircle(container: Container, element: Circle, properties: any) {

}


export function EditComponent(container: Container, entity: HmiEntity) {
  let elem = entity.$element
  const type = entity.$component.type || "svg"
  switch (type) {
    case "rect" :
    case "ellipse" :
    case "image" :
    case "text" :
    case "svg" :
    case "object":
      // @ts-ignore
      editRect(container, entity.$element, entity.properties)
      break
    case "circle" :
      // @ts-ignore
      editCircle(container, entity.$element, entity.properties)
      break
    case "line" :
    case "polyline" :
    case "polygon" :
      // @ts-ignore
      editPoints(container, entity.$element, entity.properties)
      break
    case "path" :
    default:
      throw new Error("不支持的控件类型：" + type)
  }
}
