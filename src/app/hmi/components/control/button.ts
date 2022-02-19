import {HmiComponent} from "../../hmi";
import {fontProperties} from "../properties";

const template = `
  <svg>
    <rect height="40" width="80"></rect>
  </svg>
  `;

export let ButtonComponent: HmiComponent = {
  uuid: "button",
  name: '按钮',
  group: '控件',
  icon: "/assets/hmi/components/button.svg",
  //template,

  properties: [...fontProperties],

  //配置
  setup(props: any) {

  },

  //更新数据
  update(values: any) {

  },

};
