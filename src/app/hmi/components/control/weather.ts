import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let WeatherComponent: HmiComponent = {
  uuid: "weather",
  name: "天气",
  icon: "/assets/hmi/components/weather.svg",
  group: "控件",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
