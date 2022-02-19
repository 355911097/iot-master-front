import {HmiComponent} from "../../hmi";

export let LineComponent: HmiComponent = {
  uuid: "line",
  name: "直线",
  icon: "/assets/hmi/components/line.svg",
  group: "基础组件",
  type: "line",
  basicProperties: {border: true, color: false},

  setup(properties: any): void {
    if (properties.stroke) { // @ts-ignore
      this.$element.stroke(properties.stroke)
    }
    if (properties.color) { // @ts-ignore
      this.$element.fill(properties.color)
    }
  }
}
