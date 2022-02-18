import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let ClockComponent: HmiComponent = {
  uuid: "clock",
  name: "时钟",
  icon: "/assets/hmi/components/clock.svg",
  group: "控件",

  setup(elem: Svg, props: any): void {

  }
}
