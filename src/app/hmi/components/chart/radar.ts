import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let RadarChartComponent: HmiComponent = {
  uuid: "radar-chart",
  name: "雷达图",
  icon: "/assets/hmi/components/chart-radar.svg",
  group: "图表",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
