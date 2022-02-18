import {HmiComponent} from "../../hmi";
import {Polygon} from "@svgdotjs/svg.js";

export let PolygonComponent: HmiComponent = {
  uuid: "polygon",
  name: "折线",
  icon: "/assets/hmi/components/polygon.svg",
  group: "基础组件",
  type: "polygon",

  setup(element: Polygon, properties: any): void {

  }
}
