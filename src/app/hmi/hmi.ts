import {Svg, Element, ElementAlias, Container} from "@svgdotjs/svg.js";

export interface HmiPropertyItem {
  label: string
  name: string
  type: string | 'switch' | 'number' | 'text' | 'color' | 'date' | 'time' | 'datetime' | 'font' | 'fontsize'
  min?: number
  max?: number
  default?: boolean | number | string

  [prop: string]: any
}

export interface HmiComponentFactory {
  (container: Container): ElementAlias
}

export interface HmiComponent {
  uuid: string
  icon: string //svg png ...
  name: string

  type: string | 'basic' | 'control' | 'object'
  //line polyline polygon circle ellipse rect text image
  //svg->nested 组件
  //object->foreignObject 图表组件等
  template?: string

  [prop: string]: any

  factory: string | HmiComponentFactory

  //配置项
  properties?: Array<HmiPropertyItem>


  //绘制
  draw?(container: Container): void

  //修改
  edit?(element: ElementAlias, container: Container): void

  //写入配置
  setup(element: ElementAlias, properties: any): void

  //更新数据
  update(element: ElementAlias, values: any): void

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
