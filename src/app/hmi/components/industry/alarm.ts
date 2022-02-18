import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let AlarmComponent: HmiComponent = {
  uuid: "alarm",
  name: "报警器",
  icon: "/assets/hmi/components/alarm.svg",
  group: "工业",

  setup(elem: Svg, props: any): void {

  }
}
