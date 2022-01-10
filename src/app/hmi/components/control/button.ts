import {HmiComponent} from "../../hmi";
import {Svg, Element} from "@svgdotjs/svg.js";
import {basicProperties, fontProperties} from "../properties";

import icon from './button.svg';

export let Button: HmiComponent;

const template = `
  <svg>
    <rect height="40" width="80"></rect>
  </svg>
  `;

Button = {
  uuid: "button",
  name: '按钮',
  type: "control",
  icon, //svg
  template,

  properties: [
    ...basicProperties,
    ...fontProperties,
  ],


  //配置
  setup(props?: any) {

  },

  //更新数据
  update(values: any) {

  },

};
