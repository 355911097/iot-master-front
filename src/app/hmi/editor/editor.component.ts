import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ElementAlias, Svg, SVG} from '@svgdotjs/svg.js';
import {GetComponent, GroupedComponents} from "../components/component";
import {CreateComponentObject, GetDefaultProperties, HmiComponent, HmiEntity} from "../hmi";
import {CreateElement, DrawComponent} from "../components/draw";

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

  color = "none"
  stroke = "white"

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.canvas = SVG().addTo('#canvas').size("100%", "100%");

    this.entities.forEach(en => {
      let cmp = GetComponent(en.component)
      if (!cmp) return
      en.$element = CreateElement(this.canvas, cmp)
      cmp.setup.call(en.$object, en.properties)
    })
  }

  drawEntity(entity: HmiEntity) {
    let cmp = GetComponent(entity.component)
    if (!cmp) return
    entity.$element = CreateElement(this.canvas, cmp)
    entity.$object = CreateComponentObject(cmp, entity.$element)
    cmp.setup.call(entity.$object, entity.properties)
  }

  draw(cmp: HmiComponent) {
    this.currentComponent = cmp;

    let properties = GetDefaultProperties(cmp)
    if (properties.hasOwnProperty('stroke'))
      properties.stroke = this.stroke // "white"
    if (properties.hasOwnProperty('color'))
      properties.color = this.color // "none"

    let element = CreateElement(this.canvas, cmp)

    let entity: HmiEntity = {
      name: "",
      component: cmp.uuid,
      properties,

      $element: element,
      $component: cmp,
      $object: CreateComponentObject(cmp, element),
    }
    this.entities.push(entity)
    cmp.setup.call(entity.$object, entity.properties)

    //画
    DrawComponent(this.canvas, entity);

  }
}
