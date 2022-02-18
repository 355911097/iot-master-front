import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let BarChartComponent: HmiComponent = {
  uuid: "bar-chart",
  name: "柱状图",
  icon: "/assets/hmi/components/chart-bar.svg",
  group: "图表",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
