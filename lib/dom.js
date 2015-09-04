'use strict';
var inherits = require('./inherits');
var ParentNode = require('./parent-node');

function Dom() {
	ParentNode.call(this);
}
inherits(Dom, ParentNode);
Object.defineProperties(Dom.prototype, {
	isRoot: {
		value: true
	}
});

module.exports = Dom;
