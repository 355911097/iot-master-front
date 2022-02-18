import {HmiComponent} from "../../hmi";
import {Rect} from "@svgdotjs/svg.js";

export let RectComponent: HmiComponent = {
  uuid: "rect",
  name: "矩形",
  icon: "/assets/hmi/components/rect.svg",
  group: "基础组件",
  type: "rect",

  setup(element: Rect, properties: any): void {

  }
}
