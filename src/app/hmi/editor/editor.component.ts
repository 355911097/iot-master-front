import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Line, Svg, SVG} from '@svgdotjs/svg.js';
import {HmiComponent} from "../hmi";
import {drawPoly, drawRect} from "../components/draw";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasElement: HTMLElement | undefined;
  canvas: Svg | undefined;

  components = [
    {
      name: "基础组件",
      components: [
        {name: "直线", image: "assets/hmi/components/line.svg"},
        {name: "折线", image: "assets/hmi/components/polyline.svg"},
        {name: "多边形", image: "assets/hmi/components/polygon.svg"},
        {name: "圆形", image: "assets/hmi/components/circle.svg"},
        {name: "椭圆", image: "assets/hmi/components/ellipse.svg"},
        {name: "长方形", image: "assets/hmi/components/rect.svg"},
        {name: "图片", image: "assets/hmi/components/image.svg"},
        {name: "文本", image: "assets/hmi/components/text.svg"},
      ]
    },
    {
      name: "交互组件",
      components: [
        {name: "按钮", image: "assets/hmi/components/button.svg"},
        {name: "输入框", image: "assets/hmi/components/input.svg"},
        {name: "显示框", image: "assets/hmi/components/value.svg"},
        {name: "滑块", image: "assets/hmi/components/slider.svg"},
        {name: "开关", image: "assets/hmi/components/switch.svg"},
      ]
    },
    {
      name: "工业组件",
      components: [
        {name: "管道", image: "assets/hmi/components/pipe.svg"},
        {name: "水泵", image: "assets/hmi/components/pump.svg"},
        {name: "风扇", image: "assets/hmi/components/fan.svg"},
        {name: "电机", image: "assets/hmi/components/motor.svg"},
        {name: "指示灯", image: "assets/hmi/components/light.svg"},
        {name: "罐体", image: "assets/hmi/components/can.svg"},
      ]
    },
    {
      name: "图表组件",
      components: [
        {name: "仪表图", image: "assets/hmi/components/chart-gauge.svg"},
        {name: "曲线图", image: "assets/hmi/components/chart-line.svg"},
        {name: "柱状图", image: "assets/hmi/components/chart-bar.svg"},
        {name: "饼图", image: "assets/hmi/components/chart-pie.svg"},
        {name: "雷达图", image: "assets/hmi/components/chart-radar.svg"},
      ]
    },
  ]

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.canvas = SVG().addTo('#canvas').size("100%", "100%");
    //let rect = this.canvas.rect(40,40).fill('#f0f').move(40,40);
    //rect.node

  }

  draw(cmp: any) {

    // @ts-ignore
    //drawPoly(this.canvas)

    // @ts-ignore
    drawRect(this.canvas)

  }
}
