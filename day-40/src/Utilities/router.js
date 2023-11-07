import Navigo from "navigo";
import { Error } from "../Error";

const app = document.querySelector("#app");
const navigator = new Navigo("/");
console.log(navigator);

export const router = (paths, DefaultLayout) => {
  const render = (app, html) => {
    app.innerHTML = html;
  };
  if (paths.length) {
    paths.forEach((path) => {
      navigator.on(path.path, (item) => {
        let renderingHTML;
        if (DefaultLayout) {
          renderingHTML = DefaultLayout();
          const regex = /\{body\}/g;
          renderingHTML = renderingHTML.replace(regex, path.component(item));
        } else {
          renderingHTML = path.component(item);
        }
        render(app, renderingHTML);
      });
    });
  }
  navigator.notFound(() => {
    render(app, Error());
  });
  navigator.resolve();
  // navigator.navigate(path);
};

window.navigateTo = (path) => {
  navigator.navigate(path);
};
