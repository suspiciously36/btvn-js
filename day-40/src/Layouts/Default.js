import "../Assets/Style.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export const DefaultLayout = () => {
  return `
    <header class="header back-to-home">
        <div class="container">
            <h1><a href="/" data-navigo>HEADER - Back to Home</a></h1>
        </div>
    </header>
    <main class="main navigation">
        <div class="container">
            <h2>Menu</h2>
                <ul>
                    <li><a href="/" data-navigo>Go to Homepage</a></li>
                    <li><a href="/about" data-navigo>About us</a></li>
                    <li><a href="/products" data-navigo>Our Products</a></li>
                </ul>
        </div>
        <div class="body-innerDetails">
            {body}
        </div>
    </main>
    <footer>
        <div class="container">
            <h1 class="footer">FOOTER</h1>
        </div>
    </footer>
    `;
};
