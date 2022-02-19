import {Container, ElementAlias, Line} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";
import {drawLine} from "../draw";

export let LineComponent: HmiComponent = {
  uuid: "line",
  name: "直线",
  icon: "/assets/hmi/components/line.svg",
  group: "基础组件",
  type: "line",
  basicProperties: {border: true, fill: true},

  setup(element: Line, properties: any): void {

  }
}
