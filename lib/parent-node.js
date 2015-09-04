'use strict';
var instanceOf = require('./inherits').instanceOf;
var ChildNode = require('./child-node');

function ParentNode() {
	this.children = [];
}

ParentNode.prototype.appendChild = function (child) {
	if (!instanceOf(child, ChildNode)) throw new TypeError('Not a valid child node.');
	if (child.parent) throw new Error('Cannot append a child that already has a parent.');
	this.children.push(child);
	child.parent = this;
};
ParentNode.prototype.toString = function () {
	var innerHTML = '';
	var children = this.children;
	for (var i=0, len=children.length; i<len; i++) {
		innerHTML += '' + children[i];
	}
	return innerHTML;
}

module.exports = ParentNode;
