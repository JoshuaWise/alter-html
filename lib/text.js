'use strict';
var inherits = require('./inherits');
var ChildNode = require('./child-node');

function Text(value) {
	ChildNode.call(this);
	
	if (typeof value !== 'string') throw new TypeError('HTML Text nodes must be constructed with a string value.');
	this.value = value;
}
inherits(Text, ChildNode);
Text.prototype.toString = function () {
	return '' + this.value;
};
Object.defineProperties(Text.prototype, {
	isText: {
		value: true
	}
});

module.exports = Text;
