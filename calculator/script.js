function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Calculator extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "clearDisplay",

    () => {
      this.setState({
        expression: '0',
        result: '0',
        manyDecimals: false });

    });_defineProperty(this, "unDo",

    currExpr => {
      if (currExpr === String(this.state.result)) return currExpr;
      return currExpr.length > 1 && currExpr !== this.PLACEHOLDER ?
      currExpr.substr(0, currExpr.length - 1) :
      this.PLACEHOLDER;
    });_defineProperty(this, "changeTheme",

    () => {
      const list = this.themes.list;
      const index = this.themes.curr === list.length - 1 ? 0 : this.themes.curr + 1;
      this.themes.curr = index;
      this.setState({ loadTheme: `${list[index]}` });
    });_defineProperty(this, "toggleMenu",

    () => {
      this.setState({
        showMenu: !this.state.showMenu });

    });_defineProperty(this, "addDigit",

    (currExpr, pad) => {
      return currExpr === '0' || currExpr === this.PLACEHOLDER || currExpr === this.ERROR ?
      pad :
      currExpr + pad;
    });_defineProperty(this, "addDecimal",

    (currExpr, pad) => {
      if ((currExpr + pad).match(/(\D\s)?\d+\.\d*\./g))
      return currExpr;else

      return currExpr + pad;
    });_defineProperty(this, "addOperator",

    (currExpr, pad) => {
      const endsWithNaN = isNaN(currExpr.substr(currExpr.length - 1));
      const andsWithaSpace = currExpr.substr(currExpr.length - 1) === ' ';
      if (andsWithaSpace)
      return currExpr.substr(0, currExpr.length - 2) + ' ' + pad + ' ';else
      if (endsWithNaN)
      return currExpr;else

      return currExpr + ' ' + pad + ' ';
    });_defineProperty(this, "doMath",

    currExpr => {
      // TODO: Convert resulting large decimal numbers into exponents.
      let result = this.state.result;
      let updateExpr = this.state.expression;
      currExpr = this.formatExpression(currExpr);
      if (isNaN(currExpr[currExpr.length - 1])) {
        this.setState({
          result: 'ERROR', expression: this.ERROR },
        () => setTimeout(() => {
          this.setState({
            result: result,
            expression: updateExpr });

        }, 800));
        return;
      } else {
        result = updateExpr = currExpr !== '' ? new Function(`return ${currExpr}`)() : '';
        if (String(result).indexOf('.') !== -1)
        if (String(result).split('.')[1].length > 5) this.manyDecimals = true;else
        this.manyDecimals = false;
      }
      this.setState({
        result: result,
        expression: updateExpr,
        manyDecimals: this.manyDecimals });

    });_defineProperty(this, "formatExpression",

    currExpr => {
      return currExpr.replace(/ /g, '').replace(/×/g, '*').replace(/÷/g, '/');
    });_defineProperty(this, "updateExpression",

    pad => {
      const currExpr = String(this.state.expression);
      let updateExpr = '';
      let updateRslt = this.state.result;
      if (pad === 'clear') return this.clearDisplay();else
      if (pad === '↶') updateExpr = this.unDo(currExpr);else
      if (pad === '❀') return this.changeTheme();else
      if (pad === 'Check This Out') return this.toggleMenu();else
      if (!isNaN(pad)) updateExpr = this.addDigit(currExpr, pad);else
      if (pad === '.') updateExpr = this.addDecimal(currExpr, pad);else
      if (pad === '+' ||
      pad === '-' ||
      pad === '×' ||
      pad === '÷') updateExpr = this.addOperator(currExpr, pad);else
      if (pad === '=') return this.doMath(currExpr);
      this.setState({
        expression: updateExpr,
        result: updateRslt });

    });this.actions = ['clear', '↶', '❀', 'Check This Out', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '.', '0', '=', '+'];this.state = { expression: 'Nerd Stuff Here Please', result: '0', showMenu: false, loadTheme: '', manyDecimals: false };this.PLACEHOLDER = 'Nerd Stuff Here Please';this.ERROR = 'Bad Expression!';this.manyDecimals = false;this.themes = { list: ['', 'https://yagoestevez.github.io/the-calcoolator/Themes/Yellow.css', 'https://yagoestevez.github.io/the-calcoolator/Themes/Blue.css', 'https://yagoestevez.github.io/the-calcoolator/Themes/Green.css', 'https://yagoestevez.github.io/the-calcoolator/Themes/Light.css'], curr: 0 };}

  loadTheme() {
    return this.state.loadTheme !== '' ?
    React.createElement("link", { rel: "stylesheet", type: "text/css",
      href: 'Themes/' + this.state.loadTheme }) :
    null;
  }

  componentWillMount() {
    document.addEventListener(
    "keypress",
    event => {
      if (!isNaN(event.key) || event.key === '+' || event.key === '-' || event.key === '.')
      this.updateExpression(event.key);else
      if (event.key === '/') this.updateExpression('÷');else
      if (event.key === '*') this.updateExpression('×');else
      if (event.key === 'Enter') this.updateExpression('=');else
      if (event.key === 'Escape') this.updateExpression('clear');else
      if (event.key === 'Backspace') this.updateExpression('↶');else
      return;
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keypress');
  }

  render() {
    return (
      React.createElement(React.Fragment, null,
      this.loadTheme(),
      React.createElement(Display, { expr: this.state.expression, result: this.state.result, manyDecimals: this.state.manyDecimals }),
      React.createElement(Brand, null),
      React.createElement(Pads, {
        actions: this.actions,
        updateExpr: this.updateExpression,
        toggleMenu: this.toggleMenu,
        showMenu: this.state.showMenu })));



  }}


const Pads = props => {
  const { showMenu, actions, updateExpr } = props;
  const IDs = [
  'clear', 'back', 'theme', 'menu',
  'seven', 'eight', 'nine', 'divide',
  'four', 'five', 'six', 'multiply',
  'one', 'two', 'three', 'subtract',
  'decimal', 'zero', 'equals', 'add'];

  return (
    React.createElement("section", { id: "Pads" },
    React.createElement("div", { className: showMenu ? 'container hide' : 'container' },
    actions.map((pad, i) =>
    React.createElement("div", { id: IDs[i],
      className:
      pad === '♥' ?
      'pad menuToggler' :
      isNaN(pad) ? 'pad sym' : 'pad num',
      onClick: () => updateExpr(pad),
      key: i }, pad))),



    React.createElement(Menu, props)));


};

const tweet = 'I just found a beautiful web-based calculator made with ' +
'React! You should try it! ' +
'https://codepen.io/lucifer279 \n\n';
const tweetURL = 'https://twitter.com/intent/tweet?' +
'hashtags=calculator,cool_calculator,webdesign,' +
'Coders,Dev,React,Javascript' +
'&via=Lucifer2K' +
encodeURIComponent(tweet);

const Menu = props => {
  return (
    React.createElement("div", { className: props.showMenu ? 'menu hide' : 'menu' },
    React.createElement("small", { className: "goBack", onClick: () => props.toggleMenu() },
    '◄ back to nerd stuff'),

    React.createElement("section", null,
    React.createElement("h6", null, "A Little Task For Ya"),
    React.createElement("p", null, "Hi,"),
    React.createElement("p", null, "If you think this ",
    React.createElement("strong", null, "Cool Calculator"), " thing is actually awesome, please",
    ' ',
    React.createElement("a", {
      className: "item",
      href: tweetURL,
      rel: "noopener noreferrer",
      target: "_blank",
      alt: "Tweet to your friends",
      title: "Tweet to your friends",
      tabIndex: "-1" }, "spread the word on Twitter/where ever the hell you want to"),


    ' ', "and let your friends know!"),


    React.createElement("p", null, "And another important thing, Have Fun."),
    React.createElement("p", null, "Thanks for your time,"),
    React.createElement("p", null,
    React.createElement("a", {
      href: "https://twitter.com/sehrawat279/",
      target: "_blank",
      rel: "noopener noreferrer",
      alt: "about Lucifer 2K",
      title: "about Lucifer 2K",
      tabIndex: "-1" }, "Lucifer 2K")))));







};

const Display = props => {
  return (
    React.createElement("section", { id: "Display" },
    React.createElement("h1", { className: props.manyDecimals && 'hasManyDecimals' }, props.result),
    React.createElement("small", { id: "display" }, props.expr)));


};

const Brand = props => {
  return (
    React.createElement("section", { className: "brand" }, "Cool ",
    React.createElement("span", { className: "highlighted" }, "Nerd"), " Calculator"));


};

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('Calculator'));