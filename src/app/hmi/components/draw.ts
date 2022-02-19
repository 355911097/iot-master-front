import {
  Circle,
  Container,
  Element,
  ElementAlias,
  Ellipse,
  ForeignObject, Image,
  Line,
  Polygon,
  Polyline,
  Rect,
  Svg
} from "@svgdotjs/svg.js";


export function stopDraw(container: Container) {
  container.off('click.draw')
  container.off('mousemove.draw')
}

export function drawLine(container: Container, line: Line) {
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        line.plot(startX, startY, e.offsetX, e.offsetY)
      })
    } else {
      stopDraw(container)
    }
  });
}


export function drawRect(container: Container, rect: Rect | Ellipse | Image | Svg | ForeignObject) {
  //let rect: Rect;
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      rect.move(startX, startY)

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        if (width > 0 && height > 0)
          rect.size(width, height)
      })
    } else {
      stopDraw(container)
    }
  });
}

export function drawCircle(container: Container, circle: Circle) {
  let startX = 0;
  let startY = 0;
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      startX = e.offsetX
      startY = e.offsetY
      circle.center(startX, startY)

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        let r = Math.sqrt(width * width + height * height)
        circle.radius(r)
      })
    } else {
      stopDraw(container)
    }
  });
}

export function drawPoly(container: Container, poly: Polygon | Polyline) {
  let firstClick = true;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (firstClick) {
      firstClick = false
      poly.plot([e.offsetX, e.offsetY, e.offsetX, e.offsetY])

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
          stopDraw(container)

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
