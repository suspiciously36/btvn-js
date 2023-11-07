import error404 from "./Assets/Images/404pagenotfound.jpg";

import "./Assets/Errors.css";

export const Error = () => {
  return `
    <div class="error-page">
        <img src="${error404}" />
    </div>
    `;
};
