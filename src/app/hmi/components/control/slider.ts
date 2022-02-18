import {ForeignObject} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let SliderComponent: HmiComponent = {
  uuid: "slider",
  name: "滑块",
  icon: "/assets/hmi/components/slider.svg",
  group: "控件",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
