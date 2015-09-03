'use strict';
var selfClosingTags = require('./self-closing-tags');

function Tag(name) {
	if (!name) throw new Error('HTML Tags must be constructed with names.');
	this.name = '' + name;
	this.attributes = [];
	this.children = [];
	this.parent = null;
}
Tag.prototype.toString = function () {
	var innerHTML = '';
	var children = this.children;
	for (var i=0, len=children.length; i<len; i++) {
		innerHTML += '' + children[i];
	}
	
	var attributeString = '';
	var attributes = this.attributes;
	for (var i=0, len=attributes.length; i<len; i++) {
		var attribute = '' + attributes[i];
		attribute && (attributeString += ' ' + attribute);
	}
	
	if (selfClosingTags.indexOf(this.name.toLowerCase()) >= 0) {
		return '<' + this.name + attributeString + '/>';
	} else {
		return '<' + this.name + attributeString + '>' + innerHTML + '</' + this.name + '>';
	}
};
Tag.prototype.appendChild = function (child) {
	if (child.parent) throw new Error('Cannot append a child that already has a parent.');
	this.children.push(child);
	child.parent = this;
};
Tag.prototype.addAttribute = function (attribute) {
	if (attribute.owner) throw new Error('Cannot assign an attribute to multiple tags.');
	this.attributes.push(attribute);
	attribute.owner = this;
};

module.exports = Tag;
