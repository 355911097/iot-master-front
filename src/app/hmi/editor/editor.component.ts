import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Svg, SVG} from '@svgdotjs/svg.js';
import {COMPONENTS} from "../components/component";
import {HmiComponent} from "../hmi";
import {DrawComponent} from "../components/draw";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasElement: HTMLElement | undefined;
  canvas: Svg | undefined;

  currentComponent: HmiComponent | undefined = undefined;

  components = COMPONENTS

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

  draw(cmp: HmiComponent) {
    this.currentComponent = cmp;

    // @ts-ignore
    //drawPoly(this.canvas)

    // @t s-ignore

    let elem = DrawComponent(this.canvas, cmp);

    //TODO delete
    if (cmp.basicProperties?.border) {
      // @ts-ignore
      elem.stroke("white")
    }
    if (cmp.basicProperties?.fill) {
      // @ts-ignore
      elem.fill("none")
    }

  }
}
