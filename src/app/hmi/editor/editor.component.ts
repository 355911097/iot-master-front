import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Svg, SVG} from '@svgdotjs/svg.js';
import {components as ccc, drawComponent} from "../components/components";

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

  draw(cmp: any) {

    // @ts-ignore
    //drawPoly(this.canvas)

    // @ts-ignore
    //drawRect(this.canvas)
    drawComponent(this.canvas, cmp);

  }
}
