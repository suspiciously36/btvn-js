"use strict";

class F8 {
  constructor() {}

  static component(name, info = { data, template }) {
    let template = document.createElement("template");
    template.innerHTML = info.template;
    let templateNode = template.content.cloneNode(true);
    let name = [];

    function replaceTextContent(element, keys, value) {
      Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.replaceAll(
            `{{ ${keys} }}`,
            `${value}`
          );
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          replaceTextContent(node, keys, value);
        }
      });
    }

    if (info.template) {
      if (info.data?.()) {
        Object.keys(info.data()).forEach((item) => {
          window[item] = info.data()[item];
          name.push(item);

          replaceTextContent(templateNode, item, window[item]);
        });
      }
    }
  }
}
