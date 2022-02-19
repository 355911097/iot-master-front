import {HmiComponent} from "../../hmi";

export let EllipseComponent: HmiComponent = {
  uuid: "ellipse",
  name: "椭圆",
  icon: "/assets/hmi/components/ellipse.svg",
  group: "基础组件",
  type: "ellipse",
  basicProperties: {border: true, fill: true},

  setup(properties: any): void {

  }
}
