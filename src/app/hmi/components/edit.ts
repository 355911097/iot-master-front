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
import {HmiComponent} from "../hmi";

function editPoints(container:Container, element: Line | Polygon | Polyline) {

}

function editRect(container:Container, element: Rect | Ellipse | Text | Image | Svg | ForeignObject) {

}

function editCircle(container:Container, element: Circle) {

}


export function EditComponent(container: Container, component: HmiComponent) {
  const type = component.type || "svg"
  switch (type) {
    case "rect" :
    case "ellipse" :
    case "image" :
    case "text" :
    case "svg" :
    case "object":
      // @ts-ignore
      editRect(container, elem)
      break
    case "circle" :
      // @ts-ignore
      editCircle(container, elem)
      break
    case "line" :
    case "polyline" :
    case "polygon" :
      // @ts-ignore
      editPoints(container, elem)
      break
    case "path" :
    default:
      throw new Error("不支持的控件类型：" + type)
  }
}
