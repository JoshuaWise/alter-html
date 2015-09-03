'use strict';

function Attribute(key, value) {
	if (!key) throw new Error('HTML Attributes must be constructed with a key name.');
	if (value != null && typeof value !== 'string') throw new Error('HTML Attributes cannot be constructed with a non-string value.');
	this.key = '' + key;
	this.value = typeof value === 'string' ? value : null;
	this.owner = null;
}
Attribute.prototype.toString = function () {
	return this.key + (this.value == null ? '' : '="' + this.value + '"');
};

module.exports = Attribute;
