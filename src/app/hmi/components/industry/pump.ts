import {Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let PumpComponent: HmiComponent = {
  uuid: "pump",
  name: "水泵",
  icon: "/assets/hmi/components/pump.svg",
  group: "工业",

  setup(elem: Svg, props: any): void {

  }
}
