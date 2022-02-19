import {HmiComponent} from "../../hmi";
import {Polygon} from "@svgdotjs/svg.js";

export let PolygonComponent: HmiComponent = {
  uuid: "polygon",
  name: "折线",
  icon: "/assets/hmi/components/polygon.svg",
  group: "基础组件",
  type: "polygon",
  basicProperties: {border: true, fill: true},

  setup(element: Polygon, properties: any): void {

  }
}
