import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Svg, SVG} from '@svgdotjs/svg.js';
import {components as ccc, drawComponent} from "../components/components";
import {HmiComponent} from "../hmi";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasElement: HTMLElement | undefined;
  canvas: Svg | undefined;

  components = ccc

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

    // @ts-ignore
    //drawPoly(this.canvas)

    // @ts-ignore
    //drawRect(this.canvas)
    let elem = drawComponent(this.canvas, cmp);
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
