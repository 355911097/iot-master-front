import {HmiComponent} from "../../hmi";
import {Text} from "@svgdotjs/svg.js";
import {fontProperties} from "../properties";

export let TextComponent: HmiComponent = {
  uuid: "text",
  name: "文本",
  icon: "/assets/hmi/components/text.svg",
  group: "基础组件",
  type: "text",
  basicProperties: {border: true, fill: true},

  properties: [...fontProperties],

  setup(element: Text, properties: any): void {

  }
}
