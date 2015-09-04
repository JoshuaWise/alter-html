'use strict';
var inherits = require('./inherits');
var ParentNode = require('./parent-node');
var ChildNode = require('./child-node');
var AttributeOwner = require('./attribute-owner');
var voidElementList = require('./void-element-list');

function Element(name) {
	ParentNode.call(this);
	ChildNode.call(this);
	AttributeOwner.call(this);
	
	if (!name || typeof name !== 'string') throw new TypeError('HTML Elements must be constructed with a name.');
	this.name = name;
}
inherits(Element, ParentNode, ChildNode, AttributeOwner);
Element.prototype.getAttribute = function (name) {
	name = name.toLowerCase();
	var attributes = this.attributes;
	for (var i=0, len=attributes.length; i<len; i++) {
		if (attributes[i].name === name) {
			return attributes[i].value;
		}
	}
	return null;
};
Element.prototype.hasAttribute = function (name) {
	return this.getAttribute(name) !== null;
}
Element.prototype.isVoid = function () {
	return voidElementList.indexOf(this.name) >= 0;
};
Element.prototype.toString = function () {
	return this.startTag + this.innerHTML + this.endTag;
};
Object.defineProperties(Element.prototype, {
	innerHTML: {
		get: function () {return ParentNode.prototype.toString.call(this);}
	},
	innerAttributes: {
		get: function () {return AttributeOwner.prototype.toString.call(this);}
	},
	startTag: {
		get:  function () {return '<' + this.name + this.innerAttributes + '>';}
	},
	endTag: {
		get: function () {return this.isVoid() ? '' : '</' + this.name + '>';}
	},
	closeTag: {
		get: function () {return this.endTag;}
	},
	isElement: {
		value: true
	}
});

module.exports = Element;
