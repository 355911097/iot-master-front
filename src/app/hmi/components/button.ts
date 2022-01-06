import {HmiComponent} from "../define";
import {Svg, Element} from "@svgdotjs/svg.js";

export let Button: HmiComponent;

Button = {

  id: "button",
  type: "svg",

  icon: '', //svg

  template: '',

  name: '按钮',

  properties: [
    {
      label: '颜色',
      name: 'color',
      type: 'color',
      default: '#fff'
    },
    {
      label: '填充颜色',
      name: 'fill',
      type: 'color',
      default: 'none'
    },
    {
      label: '边框颜色',
      name: 'stroke',
      type: 'color',
      default: 'none'
    },
    {
      label: '字体',
      name: 'font',
      type: 'font',
      default: 'none'
    },
    {
      label: '字号',
      name: 'font',
      type: 'fontsize',
      default: 'none'
    },
    {
      label: '斜体',
      name: 'italic',
      type: 'boolean',
      default: false
    },
    {
      label: '粗体',
      name: 'bold',
      type: 'boolean',
      default: false
    },
  ],

  factory(svg: Svg): Element {
    //size(w,h) ???
    return svg.svg(this.template);
  },

  //配置
  setup(props?: any) {

  },

  //更新数据
  update(values: any) {

  },

  draw() {

  },

  edit() {

  }


};
