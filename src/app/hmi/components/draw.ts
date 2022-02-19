import {
  Circle,
  Container,
  Element,
  ElementAlias,
  Ellipse,
  ForeignObject, Image,
  Line, Path,
  Polygon,
  Polyline,
  Rect,
  Svg,
  Text,
} from "@svgdotjs/svg.js";
import {HmiComponent} from "../hmi";

export function StopDraw(container: Container) {
  container.off('click.draw')
  container.off('mousemove.draw')
}

function drawLine(container: Container, line: Line) {
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      line.addTo(container)

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        line.plot(startX, startY, e.offsetX, e.offsetY)
      })
    } else {
      StopDraw(container)
    }
  });
}


function drawRect(container: Container, rect: Rect | Ellipse | Image | Svg | ForeignObject) {
  //let rect: Rect;
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  let outline = new Rect();

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      rect.addTo(container).move(startX, startY)

      outline.addTo(container).move(startX, startY).stroke({width:1,color:'#7be',dasharray:"6 2",dashoffset:8}).fill("none")
      // @ts-ignore
      outline.animate().ease('-').stroke({dashoffset:0}).loop();

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        if (width > 0 && height > 0) {
          rect.size(width, height)
          outline.size(width, height)
        }
      })
    } else {
      outline.remove()
      StopDraw(container)
    }
  });
}

function drawCircle(container: Container, circle: Circle) {
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      circle.addTo(container).center(startX, startY)

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        let r = Math.sqrt(width * width + height * height)
        circle.radius(r)
      })
    } else {
      StopDraw(container)
    }
  });
}


function drawEllipse(container: Container, ellipse: Ellipse) {
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  let outline = new Rect();

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      ellipse.addTo(container).move(startX, startY)

      outline.addTo(container).move(startX, startY).stroke({width:1,color:'#7be',dasharray:"6 2",dashoffset:8}).fill("none")
      // @ts-ignore
      outline.animate().ease('-').stroke({dashoffset:0}).loop();

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let width = e.offsetX - startX
        let height = e.offsetY - startY
        if (width > 0 && height > 0) {
          ellipse.center(startX + width / 2, startY + height / 2).size(width, height)
          outline.size(width, height)
        }
      })
    } else {
      outline.remove()
      StopDraw(container)
    }
  });
}


function drawPoly(container: Container, poly: Polygon | Polyline) {
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      poly.addTo(container).plot([e.offsetX, e.offsetY, e.offsetX, e.offsetY])

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let arr = poly.array()
        let pt = arr[arr.length - 1]
        pt[0] = e.offsetX
        pt[1] = e.offsetY
        poly.plot(arr)
      })

      //TODO on Esc:cancel
      document.addEventListener('keydown', function onKeydown(e) {
        if (e.key == 'Escape') {
          let arr = poly.array()
          arr.pop() //删除最后一个
          poly.plot(arr)

          //line.draw('done');
          StopDraw(container)

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


export function CreateElement(container: Container, type: string): ElementAlias {
  let element: ElementAlias
  switch (type) {
    case "rect" :
      element = new Rect() // container.rect();
      break;
    case "circle" :
      element = new Circle() // container.circle();
      break;
    case "ellipse" :
      element = new Ellipse() // container.ellipse();
      break;
    case "line" :
      element = new Line() // container.line();
      break;
    case "polyline" :
      element = new Polyline() // container.polyline();
      break;
    case "polygon" :
      element = new Polygon() // container.polygon();
      break;
    case "image" :
      element = new Image().load("/assets/hmi/components/image.svg") // container.image();
      break;
    case "path" :
      element = new Path() // container.path();
      break;
    case "text" :
      element = new Text().text("文本") // container.text("文本");
      break;
    case "svg" :
      element = new Svg() // container.nested();
      break;
    case "object":
      element = new ForeignObject() // container.foreignObject(0, 0);
      break;
    default:
      throw new Error("不支持的控件类型：" + type)
  }
  return element;
}

export function DrawComponent(container: Container, component: HmiComponent): ElementAlias {
  StopDraw(container)

  const type = component.type || "svg"
  let elem = CreateElement(container, type)
  switch (type) {
    case "rect" :
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
    case "ellipse" :
      // @ts-ignore
      drawEllipse(container, elem)
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

