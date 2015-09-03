'use strict';

function Text(value) {
	if (typeof value !== 'string') throw new Error('HTML Text nodes must be constructed with a string value.');
	this.value = '' + value;
	this.parent = null;
}
Text.prototype.toString = function () {
	return '' + this.value;
};

module.exports = Text;
