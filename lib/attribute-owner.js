'use strict';
var Attribute = require('./attribute');

function AttributeOwner() {
	this.attributes = [];
}

AttributeOwner.prototype.appendAttribute = function (attr) {
	if (!(attr instanceof Attribute)) throw new TypeError('Not a valid attribute.');
	if (attr.owner) throw new Error('Cannot append an attribute that already has an owner.');
	this.attributes.push(attr);
	attr.owner = this;
};
AttributeOwner.prototype.toString = function () {
	var attributeString = '';
	var attributes = this.attributes;
	for (var i=0, len=attributes.length; i<len; i++) {
		var attribute = '' + attributes[i];
		attribute && (attributeString += ' ' + attribute);
	}
	return attributeString;
}

module.exports = AttributeOwner;
