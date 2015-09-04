# render-html
This library easily and intuitively allows developers to perform transforms on HTML element input, by specifying custom logic.

## Usage
```javascript
var render = require('render-html');

render.element = function (original) {
	if (this.name === 'span') return this.innerHTML;
	else return original.call(this);
};

render('<div class="foo"><span>hello world</span></div>')
	.then(function (result) {
		console.log(result); // <div class="foo">hello world</div>
	});
```

```javascript
render.text = function (original) {
	if (this.parent.name === 'span') return 'unicorn';
	else return original.call(this);
};

render('<div class="foo"><span>hello world</span></div>')
	.then(function (result) {
		console.log(result); // <div class="foo"><span>unicorn</span></div>
	});
```

```javascript
render.attribute = function (original) {
	if (this.name === this.value) return 'cat="power"';
	else return original.call(this);
};

render('<div class="foo" id="id" bar="baz"></div>')
	.then(function (result) {
		console.log(result); // <div class="foo" cat="power" bar="baz"></div>
	});
```

# API

`render` has three properties to which you can assign functions:
* `render.element`
* `render.attribute`
* `render.text`

These functions dictate how those types of nodes are rendered in the result string.

As an example, if you assign a function to `render.element`, that function is called within the context of each element found in your input string. In other words, the function's `this` value is always an HTML `Element`. The return value is how the element will display in the final result string.

You can return any string, as shown here:
```javascript
render.element = function () {return '*';}
render('<div></div><img><footer></footer> <b></b>')
	.then(function (result) {
		console.log(result); // "*** *";
	});
```

The first argument of these functions is the original `toString` method, which you can use to render the node in its default way. There are examples of this in the [usage](#Usage) section.

## Element

_**this.name**_ - the name of the element's tag, lowercased ("div", "span", etc.)

_**this.children**_ - an array of every child `element` or `text` node

_**this.attributes**_ - an array of the element's `attribute`s

_**this.parent**_ - a reference to the parent `element` (or the `DOM root`)

_**this.innerHTML**_ - a getter which returns the element's rendered contents

_**this.innerAttributes**_ - a getter which returns the element's rendered attribute string

_**this.startTag**_ - a getter which returns the element's rendered start tag, including its `name` and `innerAttributes`

_**this.endTag**_ - a getter which returns the elements's rendered end tag (an empty string for void elements, such as `<img>`)

_**this.closeTag**_ - alias for `this.endTag`

_**this.isVoid()**_ - a method which returns `true` or `false`, whether the element is a void element (such as `<img>` and `<br>`)

## Attribute

_**this.name**_ - the name of the attribute, lowercased ("class", "src", etc.)

_**this.value**_ - the value of the attribute, always a string

_**this.owner**_ - a reference to the element which owns this attribute

## Text

_**this.value**_ - the string of text that this node represents

_**this.parent**_ - a reference to the parent `element` (or the `DOM root`)

## DOM root

When you use `this.parent` with top-level `elements` or `text` nodes, you'll get a reference to the DOM root, which has no properties other than `children`, which is an array, just like the `children` property of an `element`.

