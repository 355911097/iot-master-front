import {ForeignObject, Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let CameraComponent: HmiComponent = {
  uuid: "camera",
  name: "摄像头",
  icon: "/assets/hmi/components/camera.svg",
  group: "控件",
  type: "object",

  setup(elem: ForeignObject, props: any): void {

  }
}
