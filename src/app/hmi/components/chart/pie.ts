import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let PieChartComponent: HmiComponent = {
  uuid: "pie-chart",
  name: "饼状图",
  icon: "/assets/hmi/components/chart-pie.svg",
  group: "图表",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
