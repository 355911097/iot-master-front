import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let MotorComponent: HmiComponent = {
  uuid: "motor",
  name: "电机",
  icon: "/assets/hmi/components/motor.svg",
  group: "工业",

  setup(elem: Svg, props: any): void {

  }
}
