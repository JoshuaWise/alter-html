'use strict';

module.exports = function (target) {
	var proto = {};
	
	for (var i=1, len=arguments.length; i<len; i++) {
		var mixin = arguments[i].prototype;
		var props = Object.getOwnPropertyNames(mixin);
		var descriptor = {};
		for (var j=0, jlen=props.length; j<jlen; j++) {
			descriptor[props[j]] = Object.getOwnPropertyDescriptor(mixin, props[j]);
		}
		descriptor.constructor = {
			value: arguments[i],
			enumerable: false,
			writable: true,
			configurable: true
		};
		proto = Object.create(proto, descriptor);
	}
	
	target.prototype = Object.create(proto, {
		constructor: {
			value: target,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	return target;
};

module.exports.instanceOf = function (instance, mixinClass) {
	var proto = instance;
	while (proto = Object.getPrototypeOf(proto)) {
		if (proto.constructor === mixinClass) {
			return true;
		}
	}
	return false;
};
