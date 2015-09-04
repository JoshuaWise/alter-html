'use strict';

var Promise = require('bluebird');
var htmlparser = require("htmlparser2");
var Dom = require('./lib/dom');
var Element = require('./lib/element');
var Attribute = require('./lib/attribute');
var Text = require('./lib/text');

module.exports = function renderHtml(input) {
	return new Promise(function (resolve, reject) {
		if (typeof input !== 'string') throw new TypeError('Input argument must be a string.');
		
		var DOM = new Dom;
		var context = DOM;
		
		var parser = new htmlparser.Parser({
			onopentag: function (name, attribs) {
				var element = new Element(name);
				for (var key in attribs) {
					element.appendAttribute(new Attribute(key, attribs[key]));
				}
				context.appendChild(element);
				context = element;
			},
			ontext: function (text) {
				context.appendChild(new Text(text));
			},
			onclosetag: function (name) {
				if (!context.parent) throw new Error('Cannot exit a context which has no parent.');
				if (('' + name).toLowerCase() !== context.name) throw new Error('Reached a close tag that doesn\'t match the current context.');
				context = context.parent;
			},
			onerror: function (err) {
				throw err;
			},
			onend: function () {
				resolve('' + DOM);
			}
		}, {decodeEntities: false});
		
		parser.write(input);
		parser.end();
	});
}

[
	{
		property: 'element',
		constructor: Element,
		current: null,
		original: Element.prototype.toString
	},
	{
		property: 'attribute',
		constructor: Attribute,
		current: null,
		original: Attribute.prototype.toString
	},
	{
		property: 'text',
		constructor: Text,
		current: null,
		original: Text.prototype.toString
	}
].forEach(function (node) {
	Object.defineProperty(module.exports, node.property, {
		get: function () {return node.current;},
		set: function (func) {
			if (typeof func !== 'function') throw new TypeError('Expected function, got ' + typeof func + '.');
			node.current = func;
			node.constructor.prototype.toString = function () {
				return func.call(this, node.original);
			};
		}
	});
	module.exports[node.property] = function (original) {
		return original.call(this);
	};
});
