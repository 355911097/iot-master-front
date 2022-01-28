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
  icon: string //url: svg png jpg ...
  name: string

  //分组（默认 扩展）
  group?: string

  //模板 svg
  template?: string

  //线型（默认 false）
  stroke?: boolean

  //位置（默认 true）
  position?: boolean

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
  update?(element: ElementAlias, values: any): void

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
