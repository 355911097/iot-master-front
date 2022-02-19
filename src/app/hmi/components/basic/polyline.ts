import {HmiComponent} from "../../hmi";

export let PolylineComponent: HmiComponent = {
  uuid: "polyline",
  name: "折线",
  icon: "/assets/hmi/components/polyline.svg",
  group: "基础组件",
  type: "polyline",
  basicProperties: {border: true, fill: true},

  setup(properties: any): void {

  }
}
