import {Element, SVG, Svg} from "@svgdotjs/svg.js";
import {HmiComponent} from "../../hmi";

export let Line: HmiComponent = {
  uuid: "line",
  name: "直线",
  icon: "",
  type: "basic",

  draw: function (container: Svg): Element {
    //size(w,h) ???
    container.on('click.draw', e=>{
      //container.off('click.draw')

    })

    container.on('mousemove.draw', e=>{

    })

    return container.line();
  },

  setup(props?: any): void {

  },

  update(values: any): void {

  },

  edit() {

  }

}
