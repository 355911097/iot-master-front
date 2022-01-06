import {Svg, Element} from "@svgdotjs/svg.js";

export interface HmiPropertyItem {
  label: string
  name: string
  type: string | 'switch' | 'number' | 'text' | 'color' | 'date' | 'time' | 'datetime' | 'font' | 'fontsize'
  min?: number
  max?: number
  default: boolean | number | string

  [prop: string]: any
}

export interface HmiComponent {
  id: string
  icon: string //svg png ...
  type: string | 'basic' | 'svg' | 'object'
  //interface: string // line polyline polygon circle ellipse rect text image | nested | foreignObject

  template: string

  name: string

  properties?: Array<HmiPropertyItem>

  factory?(svg: Svg): Element

  setup(props?: any): void

  update(values: any): void

  draw?(): void
  edit?(): void
}

export interface HmiViewItem {
  name: string
  component: string //id
  properties: any

  //TODO
  //参数绑定
  //事件响应
  //脚本
}

export interface HmiView {
  name: string
  items: Array<HmiViewItem>
}

export interface HmiProject {
  name: string
  views: Array<HmiView>
}
