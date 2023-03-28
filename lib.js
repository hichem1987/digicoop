// Implement the h function
export function h(tag, props = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([name, value]) => {
      if (name.startsWith('on')) {
        element.addEventListener(name.substring(2), value);
      } else {
        element.setAttribute(name, value);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  }
  
  // Implement the component function
  export function component(renderFn) {
    return (props, ...children) => {
      let element = null;
      const rerender = () => {
        const newElement = renderFn(props, children, rerender);
        if (element) {
          element.replaceWith(newElement);
        }
        element = newElement;
      };
      rerender();
      return element;
    };
  }
  