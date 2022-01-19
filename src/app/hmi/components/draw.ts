import {Container, Element, Line, Polygon, Polyline, Rect, Svg} from "@svgdotjs/svg.js";

export function draw(container: Svg): Element {
  let elem: Element;
  // @ts-ignore
  switch (this.type) {
    case 'basic':
      throw new Error('Please implement draw()');
    case 'control':
      // @ts-ignore
      elem = container.nested(this.template);
      break;
    case 'object':
      elem = container.foreignObject(0, 0);
      break;
    default:
      throw new Error('Unknown type');
  }
  return elem;
}

export function edit(container: Svg, element: Element) {
  //缩放


}


export function drawLine(container: Container) {
  let line: Line;
  let startX = 0;
  let startY = 0;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (!line) {
      startX = e.offsetX
      startY = e.offsetY
      line = container.line(startX, startY, startX, startY).stroke("white")

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        line.plot(startX, startY, e.offsetX, e.offsetY)
      })

      //TODO on Esc:cancel

    } else {
      container.off('click.draw')
      container.off('mousemove.draw')

      //Tell outside
      container.fire('drawn', line)
    }

  });
}


export function drawRect(container: Container) {
  let rect: Rect;
  let startX = 0;
  let startY = 0;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (!rect) {
      startX = e.offsetX
      startY = e.offsetY
      rect = container.rect().stroke("white").move(startX, startY)

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        rect.size(e.offsetX-startX, e.offsetY-startY)
      })

      //TODO on Esc:cancel
    } else {
      container.off('click.draw')
      container.off('mousemove.draw')

      //Tell outside
      container.fire('drawn', rect)
    }

  });
}

export function drawPoly(container: Container) {
  let line: Polygon | Polyline;

  // @ts-ignore
  container.on('click.draw', (e: MouseEvent) => {
    if (!line) {
      line = container.polygon([[e.offsetX, e.offsetY], [e.offsetX, e.offsetY]]).stroke("white")

      // @ts-ignore
      container.on('mousemove.draw', (e: MouseEvent) => {
        let arr = line.array()
        let pt = arr[arr.length - 1]
        pt[0] = e.offsetX
        pt[1] = e.offsetY
        line.plot(arr)
      })

      //TODO on Esc:cancel
      document.addEventListener('keydown', function onKeydown(e) {
        if (e.key == 'Escape') {
          //line.draw('done');
          container.off('click.draw')
          container.off('mousemove.draw')

          //Tell outside
          container.fire('drawn', line)

          //off listener
          document.removeEventListener('keydown', onKeydown)
        }
      });

    } else {
      let arr = line.array()
      arr.push([e.offsetX, e.offsetY])
      line.plot(arr)
    }

  });
}
