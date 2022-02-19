import {HmiComponent} from "../hmi";
import {Container, ElementAlias} from "@svgdotjs/svg.js";
import {LineComponent} from "./basic/line";
import {drawCircle, drawLine, drawPoly, drawRect} from "./draw";
import {editPoints, editRect} from "./edit";
import {CircleComponent} from "./basic/circle";
import {PolylineComponent} from "./basic/polyline";
import {PolygonComponent} from "./basic/polygon";
import {RectComponent} from "./basic/rect";
import {EllipseComponent} from "./basic/ellipse";
import {TextComponent} from "./basic/text";
import {ButtonComponent} from "./control/button";
import {InputComponent} from "./control/input";
import {SwitchComponent} from "./control/switch";
import {SliderComponent} from "./control/slider";
import {ValueComponent} from "./control/value";
import {ClockComponent} from "./control/clock";
import {CameraComponent} from "./control/camera";
import {WeatherComponent} from "./control/weather";
import {AlarmComponent} from "./industry/alarm";
import {CanComponent} from "./industry/can";
import {FanComponent} from "./industry/fan";
import {LightComponent} from "./industry/light";
import {PipeComponent} from "./industry/pipe";
import {PoolComponent} from "./industry/pool";
import {PumpComponent} from "./industry/pump";
import {ValveComponent} from "./industry/valve";
import {BarChartComponent} from "./chart/bar";
import {GaugeChartComponent} from "./chart/gauge";
import {LineChartComponent} from "./chart/line";
import {PieChartComponent} from "./chart/pie";
import {RadarChartComponent} from "./chart/radar";
import {MotorComponent} from "./industry/motor";

export let components: Array<ComponentGroup> = [];

export interface ComponentGroup {
  name: string,
  components: Array<HmiComponent>
}

export let componentsIndexGroup: { [name: string]: Array<HmiComponent> } = {}

function createComponentElement(container: Container, type: string): ElementAlias {
  let element: ElementAlias
  switch (type) {
    case "rect" :
      element = container.rect();
      break;
    case "circle" :
      element = container.circle();
      break;
    case "ellipse" :
      element = container.ellipse();
      break;
    case "line" :
      element = container.line();
      break;
    case "polyline" :
      element = container.polyline();
      break;
    case "polygon" :
      element = container.polygon();
      break;
    case "image" :
      element = container.image();
      break;
    case "path" :
      element = container.path();
      break;
    case "text" :
      element = container.text("文本");
      break;
    case "svg" :
      element = container.nested();
      break;
    case "object":
      element = container.foreignObject(0, 0);
      break;
    default:
      throw new Error("不支持的控件类型：" + type)
  }
  return element;
}

export function drawComponent(container: Container, component: HmiComponent): ElementAlias {
  const type = component.type || "svg"
  let elem = createComponentElement(container, type)
  switch (type) {
    case "rect" :
    case "ellipse" :
    case "image" :
    case "text" :
    case "svg" :
    case "object":
      // @ts-ignore
      drawRect(container, elem)
      break
    case "circle" :
      // @ts-ignore
      drawCircle(container, elem)
      break
    case "line" :
      // @ts-ignore
      drawLine(container, elem)
      break
    case "polyline" :
    case "polygon" :
      // @ts-ignore
      drawPoly(container, elem)
      break
    case "path" :
    default:
      throw new Error("不支持的控件类型：" + type)
  }
  return elem;
}


export function editComponent(container: Container, component: HmiComponent) {
  const type = component.type || "svg"
  switch (type) {
    case "rect" :
    case "ellipse" :
    case "image" :
    case "text" :
    case "svg" :
    case "object":
      // @ts-ignore
      editRect(container, elem)
      break
    case "circle" :
      // @ts-ignore
      editCircle(container, elem)
      break
    case "line" :
    case "polyline" :
    case "polygon" :
      // @ts-ignore
      editPoints(container, elem)
      break
    case "path" :
    default:
      throw new Error("不支持的控件类型：" + type)
  }
}

export function loadComponent(obj: HmiComponent) {
  obj.basicProperties = Object.assign({}, {
    border: false, //stroke
    fill: false,
    rotate: true,
    position: true
  }, obj.basicProperties);

  if (!obj.group)
    obj.group = "扩展";
  let group = componentsIndexGroup[obj.group]
  if (!group) {
    group = componentsIndexGroup[obj.group] = [];
    components.push({name: obj.group, components: group});
  }
  group.push(obj)
}

//export function loadIntervalComponents() {
let internalComponents = [
  //基础
  LineComponent, CircleComponent, EllipseComponent, PolylineComponent, PolygonComponent, RectComponent, TextComponent,
  //控件
  ButtonComponent, InputComponent, SwitchComponent, SliderComponent, ValueComponent, ClockComponent, CameraComponent, WeatherComponent,
  //工业
  AlarmComponent, CanComponent, FanComponent, LightComponent, PipeComponent, PoolComponent, PumpComponent, ValveComponent, MotorComponent,
  //图表
  BarChartComponent, GaugeChartComponent, LineChartComponent, PieChartComponent, RadarChartComponent
]
internalComponents.forEach(c => loadComponent(c))
//}

