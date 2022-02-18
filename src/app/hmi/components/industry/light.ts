import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let LightComponent: HmiComponent = {
  uuid: "light",
  name: "指示灯",
  icon: "/assets/hmi/components/light.svg",
  group: "工业",

  setup(elem: Svg, props: any): void {

  }
}
