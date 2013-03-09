/**
 * @author mrdoob / http://mrdoob.com/
 * @author Larry Battle / http://bateru.com/news
 * copied from Three.js
 * @author bcourter / http://blakecourter.com
 */

var FOUR = FOUR || { REVISION: '0' };

self.console = self.console || {

	info: function () {},
	log: function () {},
	debug: function () {},
	warn: function () {},
	error: function () {}

};

self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;

String.prototype.trim = String.prototype.trim || function () {

	return this.replace( /^\s+|\s+$/g, '' );

};

// based on https://github.com/documentcloud/underscore/blob/bf657be243a075b5e72acc8a83e6f12a564d8f55/underscore.js#L767
FOUR.extend = function ( obj, source ) {

	// ECMAScript5 compatibility based on: http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
	if ( Object.keys ) {

		var keys = Object.keys( source );

		for (var i = 0, il = keys.length; i < il; i++) {

			var prop = keys[i];
			Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );

		}

	} else {

		var safeHasOwnProperty = {}.hasOwnProperty;

		for ( var prop in source ) {

			if ( safeHasOwnProperty.call( source, prop ) ) {

				obj[prop] = source[prop];

			}

		}

	}

	return obj;

};

