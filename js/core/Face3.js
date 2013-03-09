/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * copied from THREE
 * @author bcourter / http://blakecourter.com 
 */

FOUR.Face3 = function ( a, b, c, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

	this.centroid = new THREE.Vector4();

};

FOUR.Face3.prototype = {

	constructor: FOUR.Face3,

	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c);

		face.color.copy( this.color );
		face.centroid.copy( this.centroid );

		face.materialIndex = this.materialIndex;

		var i, il;
		for ( i = 0, il = this.vertexColors.length; i < il; i ++ ) 
			face.vertexColors[ i ] = this.vertexColors[ i ].clone();

		return face;

	}

};
