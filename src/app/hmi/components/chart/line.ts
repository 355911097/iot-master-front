import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let LineChartComponent: HmiComponent = {
  uuid: "line-chart",
  name: "折线图",
  icon: "/assets/hmi/components/chart-line.svg",
  group: "图表",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
