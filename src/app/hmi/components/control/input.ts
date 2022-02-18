import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let InputComponent: HmiComponent = {
  uuid: "input",
  name: "输入框",
  icon: "/assets/hmi/components/input.svg",
  group: "控件",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
