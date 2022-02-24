import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  Circle,
  Container,
  Ellipse,
  ForeignObject,
  Image,
  Line,
  Polygon,
  Polyline,
  Rect,
  Svg,
  SVG, Text
} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js'
import {GetComponent, GroupedComponents} from "../components/component";
import {CreateComponentObject, GetDefaultProperties, HmiComponent, HmiEntity} from "../hmi";
import {CreateElement} from "../components/draw";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {


  @ViewChild('canvas') canvasElement: HTMLElement | undefined;
  // @ts-ignore
  canvas: Svg;

  // @ts-ignore
  baseLayer: Container;

  // @ts-ignore
  mainLayer: Container;

  // @ts-ignore
  editLayer: Container;

  currentComponent: HmiComponent | undefined = undefined;

  groupedComponents = GroupedComponents

  entities: Array<HmiEntity> = []
  current: HmiEntity | undefined;

  color = "none"
  stroke = "white"

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.canvas = SVG().addTo('#canvas').size("100%", "100%");
    this.baseLayer = this.canvas.group();
    this.mainLayer = this.canvas.group();
    this.editLayer = this.canvas.group();

    this.entities.forEach(en => {
      let cmp = GetComponent(en.component)
      if (!cmp) return
      en.$element = CreateElement(this.canvas, cmp)
      en.$object = CreateComponentObject(cmp, en.$element)
      cmp.setup.call(en.$object, en.properties)

      this.makeEntityEditable(en);
    })
  }

  makeEntityEditable(entity: HmiEntity) {
    let element = entity.$element;
    // @ts-ignore
    element.draggable().on('dragmove', (e)=> {
      //console.log("move", e)
      this.onMove(entity)
    });

    element.on('dragstart', e=>{
      this.editLayer.clear()
    })

    element.on('dragend', e=>{
      this.edit(entity)
    })

    element.on('click', (e)=>{
      if (this.current == entity) {
        //TODO 取消编辑
        return
      }
      this.current = entity
      //this.editLayer.clear()
      this.edit(entity)
    })

  }

  draw(cmp: HmiComponent) {
    this.currentComponent = cmp;

    let properties = GetDefaultProperties(cmp)
    if (properties.hasOwnProperty('stroke'))
      properties.stroke = this.stroke // "white"
    if (properties.hasOwnProperty('color'))
      properties.color = this.color // "none"

    let element = CreateElement(this.mainLayer, cmp)

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
    this.drawEntity(entity);

    this.makeEntityEditable(entity);
  }


  StopDraw() {
    this.canvas.off('click.draw')
    this.canvas.off('mousemove.draw')
  }

  moveLine(line: Line, properties: any) {
    let points = line.plot().toArray()
    properties.x1 = points[0]
    properties.y1 = points[1]
    properties.x2 = points[2]
    properties.y2 = points[3]
  }

  moveRect(rect: Rect | Ellipse | Image | Svg | ForeignObject, properties: any) {
    properties.x = rect.x()
    properties.y = rect.y()
    properties.width = rect.width()
    properties.height = rect.height()
  }

  moveCircle(circle: Circle, properties: any) {
    properties.x = circle.cx()
    properties.y = circle.cy()
    // @ts-ignore
    properties.radius = circle.width() / 2;
  }

  moveEllipse(ellipse: Ellipse, properties: any) {
    properties.x = ellipse.x() //startX
    properties.y = ellipse.y() //startY
    properties.width = ellipse.width()
    properties.height = ellipse.height()
  }

  movePoly(poly: Polygon | Polyline, properties: any) {
    properties.points = poly.array().toArray()
  }

  onMove(entity: HmiEntity) {
    const type = entity.$component.type || "svg"
    switch (type) {
      case "rect" :
      case "image" :
      case "text" :
      case "svg" :
      case "object":
        // @ts-ignore
        this.moveRect(entity.$element, entity.properties)
        break
      case "circle" :
        // @ts-ignore
        this.moveCircle(entity.$element, entity.properties)
        break
      case "ellipse" :
        // @ts-ignore
        this.moveEllipse(entity.$element, entity.properties)
        break
      case "line" :
        // @ts-ignore
        this.moveLine(entity.$element, entity.properties)
        break
      case "polyline" :
      case "polygon" :
        // @ts-ignore
        this.movePoly(entity.$element, entity.properties)
        break
      case "path" :
      default:
        throw new Error("不支持的控件类型：" + type)
    }
  }

  drawLine(line: Line, properties: any) {
    let startX = 0;
    let startY = 0;
    let firstClick = true;

    // @ts-ignore
    this.canvas.on('click.draw', (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false
        startX = e.offsetX
        startY = e.offsetY
        line.addTo(this.mainLayer)

        // @ts-ignore
        this.canvas.on('mousemove.draw', (e: MouseEvent) => {
          line.plot(startX, startY, e.offsetX, e.offsetY)
        })
      } else {
        this.StopDraw()
        //properties.points = line.plot().toArray()
        this.moveLine(line, properties)
      }
    });
  }

  drawRect(rect: Rect | Ellipse | Image | Svg | ForeignObject, properties: any) {
    //let rect: Rect;
    let startX = 0;
    let startY = 0;
    let firstClick = true;

    let outline = new Rect();

    // @ts-ignore
    this.canvas.on('click.draw', (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false
        startX = e.offsetX
        startY = e.offsetY
        rect.addTo(this.mainLayer).move(startX, startY)

        outline.addTo(this.editLayer).move(startX, startY).stroke({width:1,color:'#7be',dasharray:"6 2",dashoffset:8}).fill("none")
        // @ts-ignore
        outline.animate().ease('-').stroke({dashoffset:0}).loop();

        // @ts-ignore
        this.canvas.on('mousemove.draw', (e: MouseEvent) => {
          let width = e.offsetX - startX;
          let height = e.offsetY - startY;
          if (width > 0 && height > 0) {
            rect.size(width, height)
            outline.size(width, height)
          }
        })
      } else {
        outline.remove()
        this.StopDraw()
        this.moveRect(rect, properties);
      }
    });
  }

  drawCircle(circle: Circle, properties: any) {
    let startX = 0;
    let startY = 0;
    let firstClick = true;
    let radius = 0

    // @ts-ignore
    this.canvas.on('click.draw', (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false
        startX = e.offsetX
        startY = e.offsetY
        circle.addTo(this.mainLayer).center(startX, startY)

        // @ts-ignore
        this.canvas.on('mousemove.draw', (e: MouseEvent) => {
          let width = e.offsetX - startX;
          let height = e.offsetY - startY;
          radius = Math.sqrt(width * width + height * height)
          circle.radius(radius)
        })
      } else {
        this.StopDraw()
        this.moveCircle(circle, properties)
        //properties.radius = radius
      }
    });
  }

  drawEllipse(ellipse: Ellipse, properties: any) {
    let startX = 0;
    let startY = 0;
    let firstClick = true;

    let outline = new Rect();

    // @ts-ignore
    this.canvas.on('click.draw', (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false
        startX = e.offsetX
        startY = e.offsetY
        ellipse.addTo(this.mainLayer).move(startX, startY)

        outline.addTo(this.editLayer).move(startX, startY).stroke({width:1,color:'#7be',dasharray:"6 2",dashoffset:8}).fill("none")
        // @ts-ignore
        outline.animate().ease('-').stroke({dashoffset:0}).loop();

        // @ts-ignore
        this.canvas.on('mousemove.draw', (e: MouseEvent) => {
          let width = e.offsetX - startX
          let height = e.offsetY - startY
          if (width > 0 && height > 0) {
            ellipse.center(startX + width / 2, startY + height / 2).size(width, height)
            outline.size(width, height)
          }
        })
      } else {
        outline.remove()
        this.StopDraw()
        this.moveEllipse(ellipse, properties)
      }
    });
  }

  drawPoly(poly: Polygon | Polyline, properties: any) {
    let firstClick = true;

    // @ts-ignore
    this.canvas.on('click.draw', (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false
        poly.addTo(this.mainLayer).plot([e.offsetX, e.offsetY, e.offsetX, e.offsetY])

        // @ts-ignore
        this.canvas.on('mousemove.draw', (e: MouseEvent) => {
          let arr = poly.array()
          let pt = arr[arr.length - 1]
          pt[0] = e.offsetX
          pt[1] = e.offsetY
          poly.plot(arr)
        })

        let that = this;
        //TODO on Esc:cancel
        document.addEventListener('keydown', function onKeydown(e) {
          if (e.key == 'Escape') {
            let arr = poly.array()
            arr.pop() //删除最后一个
            poly.plot(arr)

            //line.draw('done');
            that.StopDraw()
            properties.points = arr.toArray()

            //off listener
            document.removeEventListener('keydown', onKeydown)
          }
        });

      } else {
        let arr = poly.array()
        arr.pop() //删除最后一个
        arr.push([e.offsetX, e.offsetY], [e.offsetX, e.offsetY])
        poly.plot(arr)
      }
    });
  }

  drawEntity(entity: HmiEntity): void {
    this.StopDraw()

    // let elem = CreateElement(container, component)
    const type = entity.$component.type || "svg"
    switch (type) {
      case "rect" :
      case "image" :
      case "text" :
      case "svg" :
      case "object":
        // @ts-ignore
        this.drawRect(entity.$element, entity.properties)
        break
      case "circle" :
        // @ts-ignore
        this.drawCircle(entity.$element, entity.properties)
        break
      case "ellipse" :
        // @ts-ignore
        this.drawEllipse(entity.$element, entity.properties)
        break
      case "line" :
        // @ts-ignore
        this.drawLine(entity.$element, entity.properties)
        break
      case "polyline" :
      case "polygon" :
        // @ts-ignore
        this.drawPoly(entity.$element, entity.properties)
        break
      case "path" :
      default:
        throw new Error("不支持的控件类型：" + type)
    }
  }

  editPoints(element: Line | Polygon | Polyline, properties: any) {
    let points = element.array() //.toArray()
    points.forEach((p, i) => {
      let pt = this.editLayer.circle(8).fill('#7be').center(p[0], p[1]).css('cursor', 'pointer').draggable();
      pt.on("dragmove", () => {
        p[0] = pt.cx()
        p[1] = pt.cy()
        element.plot(points)
      })
    })
  }

  editRect(element: Rect | Ellipse | Text | Image | Svg | ForeignObject, properties: any) {
    let obj = element.attr()
    let border = this.editLayer.rect(obj).fill('none').stroke({width:1,color:'#7be',dasharray:"6 2",dashoffset:0});
    // @ts-ignore
    border.animate().ease('-').stroke({dashoffset:8}).loop();

    let lt = this.editLayer.rect(8,8).fill('#7be').center(obj.x, obj.y).css('cursor', 'nw-resize').draggable();
    let lm = this.editLayer.rect(8,8).fill('#7be').center(obj.x, obj.y + obj.height*0.5).css('cursor', 'w-resize').draggable();
    let lb = this.editLayer.rect(8,8).fill('#7be').center(obj.x, obj.y + obj.height).css('cursor', 'sw-resize').draggable();
    let rt = this.editLayer.rect(8,8).fill('#7be').center(obj.x+obj.width, obj.y).css('cursor', 'ne-resize').draggable();
    let rm = this.editLayer.rect(8,8).fill('#7be').center(obj.x+obj.width, obj.y + obj.height*0.5).css('cursor', 'e-resize').draggable();
    let rb = this.editLayer.rect(8,8).fill('#7be').center(obj.x+obj.width, obj.y + obj.height).css('cursor', 'se-resize').draggable();
    let t = this.editLayer.rect(8,8).fill('#7be').center(obj.x+obj.width*0.5, obj.y).css('cursor', 'n-resize').draggable();
    let b = this.editLayer.rect(8,8).fill('#7be').center(obj.x+obj.width*0.5, obj.y + obj.height).css('cursor', 's-resize').draggable();

    lt.on("dragmove", ()=>{
      // @ts-ignore
      if (lt.cx() > element.width() + element.x())   return
      // @ts-ignore
      if (lt.cy() > element.height() + element.y())   return
      // @ts-ignore
      element.width(element.width() - lt.cx() + element.x())
      // @ts-ignore
      element.height(element.height() - lt.cy() + element.y())
      element.x(lt.cx())
      element.y(lt.cy())
      update()
    })
    lm.on("dragmove", ()=>{
      // @ts-ignore
      if (lm.cx() > element.width() + element.x())   return
      // @ts-ignore
      element.width(element.width() - lm.cx() + element.x())
      element.x(lm.cx())
      update()
    })
    lb.on("dragmove", ()=>{
      // @ts-ignore
      if (lb.cx() > element.width() + element.x())   return
      // @ts-ignore
      if (lb.cy() < element.y())   return
      // @ts-ignore
      element.width(element.width() - lb.cx() + element.x())
      // @ts-ignore
      element.height(lb.cy() - element.y())
      element.x(lb.cx())
      update()
    })

    rt.on("dragmove", ()=>{
      // @ts-ignore
      if (rt.cx() < element.x())   return
      // @ts-ignore
      if (rt.cy() > element.height() + element.y())   return
      // @ts-ignore
      element.width(rt.cx() - element.x())
      // @ts-ignore
      element.height(element.height() - rt.cy() + element.y())
      element.y(rt.cy())
      update()
    })
    rm.on("dragmove", ()=>{
      // @ts-ignore
      if (rm.cx() < element.x())   return
      // @ts-ignore
      element.width(rm.cx() - element.x())
      update()
    })
    rb.on("dragmove", ()=>{
      // @ts-ignore
      if (rb.cx() < element.x())   return
      // @ts-ignore
      if (rb.cy() < element.y())   return
      // @ts-ignore
      element.width(rb.cx() - element.x())
      // @ts-ignore
      element.height(rb.cy() - element.y())
      update()
    })
    t.on("dragmove", ()=>{
      // @ts-ignore
      if (t.cy() > element.y() + element.height())   return
      // @ts-ignore
      element.height(element.height() - t.cy() + element.y())
      element.y(t.cy())
      update()
    })
    b.on("dragmove", ()=>{
      // @ts-ignore
      if (b.cy() < element.y())   return
      // @ts-ignore
      element.height(b.cy() - element.y())
      update()
    })


    function update() {
      let obj = element.attr()
      border.attr(obj)
      lt.center(obj.x, obj.y)
      lm.center(obj.x, obj.y + obj.height*0.5)
      lb.center(obj.x, obj.y + obj.height)
      rt.center(obj.x+obj.width, obj.y)
      rm.center(obj.x+obj.width, obj.y + obj.height*0.5)
      rb.center(obj.x+obj.width, obj.y + obj.height)
      t.center(obj.x+obj.width*0.5, obj.y)
      b.center(obj.x+obj.width*0.5, obj.y + obj.height)
    }
  }

  editCircle(element: Circle, properties: any) {

  }


  edit(entity: HmiEntity) {
    this.editLayer.clear()
    const type = entity.$component.type || "svg"
    switch (type) {
      case "rect" :
      case "ellipse" :
      case "image" :
      case "text" :
      case "svg" :
      case "object":
        // @ts-ignore
        this.editRect(entity.$element, entity.properties)
        break
      case "circle" :
        // @ts-ignore
        this.editCircle(entity.$element, entity.properties)
        break
      case "line" :
      case "polyline" :
      case "polygon" :
        // @ts-ignore
        this.editPoints(entity.$element, entity.properties)
        break
      case "path" :
      default:
        throw new Error("不支持的控件类型：" + type)
    }
  }




}
