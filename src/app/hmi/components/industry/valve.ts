import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let ValveComponent: HmiComponent = {
  uuid: "valve",
  name: "阀门",
  icon: "/assets/hmi/components/valve.svg",
  group: "工业",

  setup(elem: Svg, props: any): void {

  }
}
