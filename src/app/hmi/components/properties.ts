import {HmiPropertyItem} from "../hmi";

export let positionProperties: Array<HmiPropertyItem> = [
  {
    label: 'x',
    name: 'x',
    type: 'number',
  },
  {
    label: 'y',
    name: 'y',
    type: 'number',
  },
  {
    label: '宽度',
    name: 'width',
    type: 'number',
  },
  {
    label: '高度',
    name: 'height',
    type: 'number',
  },
  {
    label: '旋转角度',
    name: 'rotate',
    type: 'number',
  },
];


export let basicProperties: Array<HmiPropertyItem> = [
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
    label: '边框',
    name: 'stroke',
    type: 'number',
    default: 'none'
  },
  {
    label: '边框颜色',
    name: 'stroke-color',
    type: 'color',
    default: 'none'
  },
];


export let fontProperties: Array<HmiPropertyItem> = [
  {
    label: '字体',
    name: 'font',
    type: 'font',
    default: ''
  },
  {
    label: '字号',
    name: 'font',
    type: 'number',
    default: 20
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
];
