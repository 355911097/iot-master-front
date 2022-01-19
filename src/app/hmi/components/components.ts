import {HmiComponent} from "../hmi";
import {Button} from "./control/button";
import {Container, Element, ElementAlias, Line, Polygon, Polyline} from "@svgdotjs/svg.js";
import {drawRect} from "./draw";

export let components: Array<HmiComponent>;

components = [
  //Button,


];

function createSvg(container: Container) {
  return container.nested();
}

function createForeignObject(container: Container) {
  return container.foreignObject(0, 0);
}


export function loadComponent(obj: HmiComponent) {
  if (!obj.factory) {
    switch (obj.type) {
      case 'svg':
        obj.factory = createSvg;
        break;
      case 'object':
        obj.factory = createForeignObject;
        break;
    }
  }

  if (!obj.draw) {
    obj.draw = drawRect;
  }
}

export function load() {
  loadComponent(Button)
}

