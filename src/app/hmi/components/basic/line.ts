import {HmiComponent} from "../../hmi";

export let LineComponent: HmiComponent = {
  uuid: "line",
  name: "直线",
  icon: "/assets/hmi/components/line.svg",
  group: "基础组件",
  type: "line",
  basicProperties: {border: true, fill: true},

  setup(properties: any): void {


  }
}
