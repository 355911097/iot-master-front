import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let GaugeChartComponent: HmiComponent = {
  uuid: "gauge-chart",
  name: "仪表盘",
  icon: "/assets/hmi/components/chart-gauge.svg",
  group: "图表",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
