import {HmiComponent} from "../../hmi";
import {fontProperties} from "../properties";

export let TextComponent: HmiComponent = {
  uuid: "text",
  name: "文本",
  icon: "/assets/hmi/components/text.svg",
  group: "基础组件",
  type: "text",
  basicProperties: {border: true, color: true},

  properties: [...fontProperties],

  setup(properties: any): void {
    if (properties.stroke) { // @ts-ignore
      this.$element.stroke(properties.stroke)
    }
    if (properties.color) { // @ts-ignore
      this.$element.fill(properties.color)
    }
  }
}
