'use strict';

function Dom() {
	this.children = [];
	Object.defineProperty(this, 'parent', {
		get: function () {return null;},
		set: function (val) {throw new Error('Cannot set the parent of the DOM root.');}
	});
}
Dom.prototype.toString = function () {
	var innerHTML = '';
	var children = this.children;
	for (var i=0, len=children.length; i<len; i++) {
		innerHTML += '' + children[i];
	}
	return innerHTML;
}
Dom.prototype.appendChild = function (child) {
	if (child.parent) throw new Error('Cannot append a child that already has a parent.');
	this.children.push(child);
	child.parent = this;
};

module.exports = Dom;
