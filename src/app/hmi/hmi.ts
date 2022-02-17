import {Svg, Element, ElementAlias, Container} from "@svgdotjs/svg.js";

export interface HmiPropertyItem {
  label: string
  name: string
  type: string | 'switch' | 'number' | 'text' | 'color' | 'date' | 'time' | 'datetime' | 'font' | 'fontsize'
  unit?: string
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

  //类型，默认basic
  type?: "basic" | "svg" | "object"

  //分组（默认 扩展）
  group?: string

  //模板 svg
  svg?: string

  //基础配置项
  basicProperties?: {
    //线型（默认 false）
    stroke?: boolean,

    //填充（默认 false）
    fill?: boolean,

    //旋转（默认 true）
    rotate?: boolean

    //位置（默认 true）
    position?: boolean
  }

  //扩展配置项
  extraProperties?: Array<HmiPropertyItem>

  [prop: string]: any

  factory: string | HmiComponentFactory



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
