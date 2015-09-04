# render-html
A library for customizing the rendering of HTML.

## usage
```javascript
var render = require('render-html');

render('<div class="super-cool"><span>hello world</span></div>')
	.then(function (result) {
		console.log(result);
	// >> <div class="super-cool">hello world</div>
	});
```