import {HmiComponent} from "../../hmi";

export let RectComponent: HmiComponent = {
  uuid: "rect",
  name: "矩形",
  icon: "/assets/hmi/components/rect.svg",
  group: "基础组件",
  type: "rect",
  basicProperties: {border: true, fill: true},

  setup(properties: any): void {

  }
}
