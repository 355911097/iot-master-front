import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let SwitchComponent: HmiComponent = {
  uuid: "switch",
  name: "开关",
  icon: "/assets/hmi/components/switch.svg",
  group: "控件",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
