import {Circle} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let CircleComponent: HmiComponent = {
  uuid: "circle",
  name: "圆形",
  icon: "/assets/hmi/components/circle.svg",
  group: "基础组件",
  type: "circle",
  basicProperties: {border: true, fill: true},

  setup(element: Circle, properties: any): void {

  }
}
