import {Container, ElementAlias, Line} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";
import {drawLine} from "../draw";

export let LineComponent: HmiComponent = {
  uuid: "line",
  name: "直线",
  icon: "/assets/hmi/components/line.svg",
  group: "基础组件",

  factory(container: Container) {
    return container.line()
  },

  setup(element: Line, properties: any): void {

  },

  draw: drawLine,

  edit() {

  }

}
