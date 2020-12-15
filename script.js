function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Made by Yago Estévez (Twitter: @yagoestevez.com)


/***********************
  Menu Component
 ***********************/

const Menu = props => {
  return (
    React.createElement("div", { className: `menu-container ${props.showMenu}` },
    React.createElement("div", { className: "overlay" }),
    React.createElement("div", { className: "menu-items" },
    React.createElement("ul", null,
    React.createElement("li", null,
    React.createElement("a", { href: "#welcome-section", onClick: props.toggleMenu }, "HOME")),



    React.createElement("li", null,
    React.createElement("a", { href: "#about", onClick: props.toggleMenu }, "ABOUT")),



    React.createElement("li", null,
    React.createElement("a", { href: "#projects", onClick: props.toggleMenu }, "PORTFOLIO")),



    React.createElement("li", null,
    React.createElement("a", { href: "#contact", onClick: props.toggleMenu }, "CONTACT"))),




    React.createElement(SocialLinks, null))));



};


/***********************
     Nav Component
    ***********************/

const Nav = props => {
  return (
    React.createElement(React.Fragment, null,
    React.createElement("nav", { id: "navbar" },
    React.createElement("div", { className: "nav-wrapper" },
    React.createElement("p", { className: "brand" }, "Lucifer",

    React.createElement("strong", null, "2K")),

    React.createElement("a", {
      onClick: props.toggleMenu,
      className: props.showMenu === 'active' ? 'menu-button active' : 'menu-button' },

    React.createElement("span", null))))));





};



/***********************
     Header Component
    ***********************/

const Header = props => {
  return (
    React.createElement("header", { id: "welcome-section" },
    React.createElement("div", { className: "forest" }),
    React.createElement("div", { className: "silhouette" }),
    React.createElement("div", { className: "moon" }),
    React.createElement("div", { className: "container" },
    React.createElement("h1", null,
    React.createElement("span", { className: "line" }, "I do"),
    React.createElement("span", { className: "line" }, "Web design"),
    React.createElement("span", { className: "line" },
    React.createElement("span", { className: "color" }, "&"), " Game developement.")),


    React.createElement("div", { className: "buttons" },
    React.createElement("a", { href: "#projects" }, "my portfolio"),
    React.createElement("a", { href: "#contact", className: "cta" }, "get in touch")))));






};


/***********************
     About Component
    ***********************/

const About = props => {
  return (
    React.createElement("section", { id: "about" },
    React.createElement("div", { className: "wrapper" },
    React.createElement("article", null,
    React.createElement("div", { className: "title" },
    React.createElement("h3", null, "Who's this guy?"),
    React.createElement("p", { className: "separator" })),

    React.createElement("div", { className: "desc full" },
    React.createElement("h4", { className: "subtitle" }, "My name is Prikshit Sehrawat (aka Lucifer2K)."),
    React.createElement("p", null, "I am a web developer and game developer just trying to figure out life."),



    React.createElement("p", null, "I really enjoy challenging myself as well as making things simplistic and pretty and easy to use. I like to learning new things; the more, the better. I also love photography, just a hobby. Oh, and Coffee !")),






    React.createElement("div", { className: "title" },
    React.createElement("h3", null, "What do I do?"),
    React.createElement("p", { className: "separator" })),

    React.createElement("div", { className: "desc" },
    React.createElement("h4", { className: "subtitle" }, "I'm a programmer."),
    React.createElement("p", null, "For the front-end I usually work with Javascript, either standalone or including popular frameworks like ReactJS and VueJS. I also make the web pretty by using Sass, CSS and, whenever needed, a friend of theirs: Bootstrap"),




    React.createElement("p", null, "For the back-end I also work with Javascript (NodeJS ). ")),




    React.createElement("div", { className: "desc" },
    React.createElement("h4", { className: "subtitle" }, "Also a designer and game developer."),
    React.createElement("p", null, "I have been making 3D models in Blender for quite a few months. Game Dev started out as a hobby. Making random 3D environments in Unity and assets in Blender. Recently I've been working on a 2.5D game for android. I'm not limited to them, though: I've been working on Inkscape recently."),





    )))));








};


/***********************
     Project Component
    ***********************/

const Project = props => {
  const tech = {
    sass: 'fab fa-sass',
    css: 'fab fa-css3-alt',
    js: 'fab fa-js-square',
    react: 'fab fa-react',
    vue: 'fab fa-vuejs',
    d3: 'far fa-chart-bar',
    node: 'fab fa-node' };


  const link = props.link || 'http://';
  const repo = props.repo || 'http://';

  return (
    React.createElement("div", { className: "project" },
    React.createElement("a", { className: "project-link", href: link, target: "_blank", rel: "noopener noreferrer" },
    React.createElement("img", { className: "project-image", src: props.img, alt: 'Screenshot of ' + props.title })),

    React.createElement("div", { className: "project-details" },
    React.createElement("div", { className: "project-tile" },
    React.createElement("p", { className: "icons" },
    props.tech.split(' ').map((t) =>
    React.createElement("i", { className: tech[t], key: t }))),


    props.title, ' '),

    props.children,
    React.createElement("div", { className: "buttons" },
    React.createElement("a", { href: repo, target: "_blank", rel: "noopener noreferrer" }, "View source ",
    React.createElement("i", { className: "fas fa-external-link-alt" })),

    React.createElement("a", { href: link, target: "_blank", rel: "noopener noreferrer" }, "Try it Live ",
    React.createElement("i", { className: "fas fa-external-link-alt" }))))));





};



/***********************
     Projects Component
    ***********************/

const Projects = props => {
  return (
    React.createElement("section", { id: "projects" },
    React.createElement("div", { className: "projects-container" },
    React.createElement("div", { className: "heading" },
    React.createElement("h3", { className: "title" }, "My Works"),
    React.createElement("p", { className: "separator" }),
    React.createElement("p", { className: "subtitle" }, "Here's a list of ",
    React.createElement("u", null, "most"), " of the projects I've been working on lately. Most of them have been done ever since lockdown started. But i primarily learnt from",
    ' ',
    React.createElement("a", { href: "https://www.freecodecamp.org/", target: "_blank", rel: "noopener noreferrer" }, "freeCodeCamp"), ", where I've been working for a few months to get my Full-Stack Developer certification.")),






    React.createElement("div", { className: "projects-wrapper" },




   



    




    

    React.createElement(Project, {
      title: "Maze Game",
      img: 'images/maze.png',
      tech: "js css",
      link: "maze/index.html",
      repo: "#" },

    React.createElement("small", null, "JS + jQuery, CSS + Bootstrap."),
    React.createElement("p", null, "The first game I ever built when I started on Web Development.")),


    

    

    React.createElement(Project, {
      title: "Random Quoting Machine.",
      img: 'images/quote.png',
      tech: "js vue css",
      link: "quote/index.html",
      repo: "#" },

    React.createElement("small", null, "Built using VueJS, Axios and CSS + Bootstrap."),
    React.createElement("p", null, "A random quoting app which displays time and date as well")),

    React.createElement(Project, {
      title: "Calculator.",
      img: 'images/Calculator.jpg',
      tech: "js react css",
      link: "calculator/index.html",
      repo: "#" },

    React.createElement("small", null, "Built using React and CSS."),
    React.createElement("p", null, "A cool looking calculator for you to use.")),

    

    React.createElement(Project, {
      title: "TicTacToe Game.",
      img: 'images/TicTacToe.jpg',
      tech: "js react css",
      link: "tic_tac_toe/index.html",
      repo: "#" },

    React.createElement("small", null, "Built using React, CSS and SVG."),
    React.createElement("p", null, "A TicTacToe game with a basic AI algorithm.")),




    React.createElement(Project, {
      title: "Twitch Clone.",
      img: 'images/Twitch.jpg',
      tech: "js vue sass",
      link: "twitch/index.html",
      repo: "#"},


    React.createElement("small", null, "Built using VueJS, Axios and Scss."),
    React.createElement("p", null, "Simple Twitch clone using the new Twitch Helix API.")),




    React.createElement(Project, {
      title: "Weather App.",
      img: 'images/weather.png',
      tech: "js vue css",
      link: "weather_app/index.html",
      repo: "#" },


    React.createElement("small", null, "Built using VueJS, Axios and CSS."),
    React.createElement("p", null, "App that present the users with the current local weather for their location.")),




    
))));







};



/***********************
     Contact Component
    ***********************/

const Contact = props => {
  return (
    React.createElement("section", { id: "contact" },
    React.createElement("div", { className: "container" },
    React.createElement("div", { className: "heading-wrapper" },
    React.createElement("div", { className: "heading" },
    React.createElement("p", { className: "title" }, "Want to ",
    React.createElement("br", null), "contact me?"),


    React.createElement("p", { className: "separator" }),
    React.createElement("p", { className: "subtitle" }, "Please, use the form below or send an email to ",
    '',
    React.createElement("span", { className: "mail" }, "",

    React.createElement("i", { className: "fas fa-at at" }), "prikshitsehrawat@gmail",

    React.createElement("i", { className: "fas fa-circle dot" }), "com"), ":")),





    React.createElement(SocialLinks, null)),

    React.createElement("form", { id: "contact-form", action: "#" },
    React.createElement("input", { placeholder: "Name", name: "name", type: "text", required: true }),
    React.createElement("input", { placeholder: "Email", name: "email", type: "email", required: true }),
    React.createElement("textarea", { placeholder: "Message", type: "text", name: "message" }),
    React.createElement("input", { className: "button", id: "submit", value: "Submit", type: "submit" })))));




};



/***********************
     Footer Component
    ***********************/

const Footer = props => {
  return (
    React.createElement("footer", null,
    React.createElement("div", { className: "wrapper" },
    React.createElement("h3", null, "THANKS FOR VISITING"),
    React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " Lucifer 2K"),
    React.createElement(SocialLinks, null))));



};




/***********************
     Social Links Component
    ***********************/

const SocialLinks = props => {
  return (
    React.createElement("div", { className: "social" },
    React.createElement("a", {
      href: "https://twitter.com/sehrawat279",
      target: "_blank",
      rel: "noopener noreferrer",
      title: "Link to author's Twitter profile" },

    ' ',
    React.createElement("i", { className: "fab fa-twitter" })),

    React.createElement("a", {
      id: "profile-link",
      href: "https://github.com/Luc1fer2K",
      target: "_blank",
      rel: "noopener noreferrer",
      title: "Link to author's GitHub Profile" },

    ' ',
    React.createElement("i", { className: "fab fa-github" })),

    ));



};



/***********************
     Main Component
    ***********************/

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      menuState: false });_defineProperty(this, "toggleMenu",


    () => {
      this.setState(state => ({
        menuState: !state.menuState ?
        'active' :
        state.menuState === 'deactive' ?
        'active' :
        'deactive' }));

    });}

  render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement(Menu, { toggleMenu: this.toggleMenu, showMenu: this.state.menuState }),
      React.createElement(Nav, { toggleMenu: this.toggleMenu, showMenu: this.state.menuState }),
      React.createElement(Header, null),
      React.createElement(About, null),
      React.createElement(Projects, null),
      React.createElement(Contact, null),
      React.createElement(Footer, null)));


  }

  componentDidMount() {
    const navbar = document.querySelector('#navbar');
    const header = document.querySelector('#welcome-section');
    const forest = document.querySelector('.forest');
    const silhouette = document.querySelector('.silhouette');
    let forestInitPos = -300;

    window.onscroll = () => {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollPos <= window.innerHeight) {
        silhouette.style.bottom = `${parseInt(scrollPos / 6)}px`;
        forest.style.bottom = `${parseInt(forestInitPos + scrollPos / 6)}px`;
      }

      if (scrollPos - 100 <= window.innerHeight)
      header.style.visibility = header.style.visibility === 'hidden' && 'visible';else
      header.style.visibility = 'hidden';

      if (scrollPos + 100 >= window.innerHeight) navbar.classList.add('bg-active');else
      navbar.classList.remove('bg-active');
    };

    (function navSmoothScrolling() {
      const internalLinks = document.querySelectorAll('a[href^="#"]');
      for (let i in internalLinks) {
        if (internalLinks.hasOwnProperty(i)) {
          internalLinks[i].addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(internalLinks[i].hash).scrollIntoView({
              block: 'start',
              behavior: 'smooth' });

          });
        }
      }
    })();
  }}



ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
