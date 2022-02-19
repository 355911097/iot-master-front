import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Svg, SVG} from '@svgdotjs/svg.js';
import {GroupedComponents, IndexedComponents} from "../components/component";
import {HmiComponent, HmiEntity} from "../hmi";
import {DrawComponent} from "../components/draw";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {


  @ViewChild('canvas') canvasElement: HTMLElement | undefined;
  // @ts-ignore
  canvas: Svg;

  currentComponent: HmiComponent | undefined = undefined;

  groupedComponents = GroupedComponents

  entities: Array<HmiEntity> = []

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.canvas = SVG().addTo('#canvas').size("100%", "100%");

    this.entities.forEach(e => this.drawEntity(e))
  }

  drawEntity(en: HmiEntity) {

  }

  draw(cmp: HmiComponent) {
    this.currentComponent = cmp;

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
