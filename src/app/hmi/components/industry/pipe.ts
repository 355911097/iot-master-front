import {Polyline} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let PipeComponent: HmiComponent = {
  uuid: "pipe",
  name: "管道",
  icon: "/assets/hmi/components/pipe.svg",
  group: "工业",
  type: "polyline",

  setup(elem: Polyline, props: any): void {

  }
}
