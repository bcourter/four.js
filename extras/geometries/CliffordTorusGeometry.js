/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 * http://en.wikipedia.org/wiki/Clifford_torus
 */

FOUR.CliffordTorusGeometry = function ( width, height, depth, length, widthSegments, heightSegments, depthSegments, lengthSegments ) {

	FOUR.Geometry.call( this );

	var scope = this;

	this.width = width;
	this.height = height;
	this.depth = depth;
	this.length = length;

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;
	this.depthSegments = depthSegments || 1;
	this.lengthSegments = lengthSegments || 1;

	var width_half = this.width / 2;
	var height_half = this.height / 2;
	var depth_half = this.depth / 2;
	var length_half = this.length / 2;
			
	var w, ix, iy,
	offset = scope.vertices.length;

	var gridX = widthSegments;
	var gridY = widthSegments;

	var gridX1 = gridX + 1,
	gridY1 = gridY + 1,
	segment_width = width / gridX,
	segment_height = height / gridY;

	for ( iy = 0; iy <= gridY; iy++ ) {
		var phi = iy / gridY * 2 * Math.PI;
		for ( ix = 0; ix <= gridX; ix++ ) {
			var theta = ix / gridX * 2 * Math.PI;
			var vector = new THREE.Vector4(width * Math.cos(theta), height * Math.sin(theta), depth * Math.cos(phi), length * Math.sin(phi));
			scope.vertices.push( vector );
		}
	}

	for ( iy = 0; iy < gridY; iy++ ) {
		for ( ix = 0; ix < gridX; ix++ ) {
			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			var face = new FOUR.Face4( a + offset, b + offset, c + offset, d + offset );
			face.materialIndex = 0; //TBD

			scope.faces.push( face );
			scope.faceVertexUvs[ 0 ].push( [
						new THREE.Vector2( ix / gridX, 1 - iy / gridY ),
						new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY ),
						new THREE.Vector2( ( ix + 1 ) / gridX, 1- ( iy + 1 ) / gridY ),
						new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY )
					] );

		}

	}

	this.computeCentroids();
	//this.mergeVertices();

};

FOUR.CliffordTorusGeometry.prototype = Object.create( FOUR.Geometry.prototype );
