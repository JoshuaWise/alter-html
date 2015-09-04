'use strict';
var inherits = require('util').inherits;
var ParentNode = require('./parent-node');
var ChildNode = require('./child-node');
var AttributeOwner = require('./attribute-owner');
var voidElementList = require('./void-element-list');

function Element(name) {
	ParentNode.call(this);
	ChildNode.call(this);
	AttributeOwner.call(this);
	
	if (!name || typeof name !== 'string') throw new TypeError('HTML Elements must be constructed with a name.');
	this.name = name.toLowerCase();
}
inherits(Element, ParentNode);
inherits(Element, ChildNode);
inherits(Element, AttributeOwner);
Element.prototype.isVoid = function () {
	return voidElementList.indexOf(this.name) >= 0;
};
Element.prototype.toString = function () {
	var innerHTML = ParentNode.prototype.toString.call(this);
	var attributeString = AttributeOwner.prototype.toString.call(this);
	return this.isVoid()
		? '<' + this.name + attributeString + '/>'
		: '<' + this.name + attributeString + '>' + innerHTML + '</' + this.name + '>';
};

module.exports = Element;
