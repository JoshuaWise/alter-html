'use strict';

function Attribute(name, value) {
	if (!name || typeof name !== 'string') throw new TypeError('HTML Attributes must be constructed with a string name.');
	if (value != null && typeof value !== 'string') throw new TypeError('HTML Attributes cannot be constructed with a non-string value.');
	this.name = name;
	this.value = value || '';
	this.owner = null;
}
Attribute.prototype.toString = function () {
	return this.name + (this.value ? '="' + this.value + '"' : '');
};
Object.defineProperties(Attribute.prototype, {
	isAttribute: {
		value: true
	}
});

module.exports = Attribute;
