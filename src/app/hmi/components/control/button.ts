import {HmiComponent} from "../../hmi";
import {fontProperties} from "../properties";

import icon from './button.svg';
import {Svg} from "@svgdotjs/svg.js";

const template = `
  <svg>
    <rect height="40" width="80"></rect>
  </svg>
  `;

export let ButtonComponent: HmiComponent = {
  uuid: "button",
  name: '按钮',
  group: '控件',
  //icon: icon, //svg
  icon: "/assets/hmi/components/button.svg",
  //template,

  extraProperties: [...fontProperties],

  //配置
  setup(elem: Svg, props?: any) {

  },

  //更新数据
  update(elem: Svg, values: any) {

  },

};
