/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 */

FOUR.TesseractGeometry = function ( width, height, depth, length, widthSegments, heightSegments, depthSegments, lengthSegments ) {

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
	
	var p = new THREE.Vector4(width_half, height_half, depth_half, length_half);
	
	buildPlane( new THREE.Vector4(p.x, p.y, -p.z, -p.w), new THREE.Vector4(0, 0, this.depth, 0), new THREE.Vector4(0, 0, 0, this.length), this.depthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, 0, this.depth, 0), new THREE.Vector4(0, 0, 0, this.length), this.depthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, p.y, -p.z, -p.w), new THREE.Vector4(0, 0, this.depth, 0), new THREE.Vector4(0, 0, 0, this.length), this.depthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, 0, this.depth, 0), new THREE.Vector4(0, 0, 0, this.length), this.depthSegments, this.lengthSegments, 0 ); 

	buildPlane( new THREE.Vector4(p.x, -p.y, p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, 0, this.length), this.heightSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, 0, this.length), this.heightSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, 0, this.length), this.heightSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, 0, this.length), this.heightSegments, this.lengthSegments, 0 ); 

	buildPlane( new THREE.Vector4(p.x, -p.y, -p.z, p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, this.depth, 0), this.heightSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, this.depth, 0), this.heightSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, this.depth, 0), this.heightSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(0, this.height, 0, 0), new THREE.Vector4(0, 0, this.depth, 0), this.heightSegments, this.depthSegments, 0 ); 

	buildPlane( new THREE.Vector4(-p.x, p.y, p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, 0, this.length), this.widthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, p.y, -p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, 0, this.length), this.widthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, 0, this.length), this.widthSegments, this.lengthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, 0, this.length), this.widthSegments, this.lengthSegments, 0 ); 

	buildPlane( new THREE.Vector4(-p.x, p.y, -p.z, p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, this.depth, 0), this.widthSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, p.y, -p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, this.depth, 0), this.widthSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, this.depth, 0), this.widthSegments, this.depthSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, 0, this.depth, 0), this.widthSegments, this.depthSegments, 0 ); 

	buildPlane( new THREE.Vector4(-p.x, -p.y, p.z, p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, this.height, 0, 0), this.widthSegments, this.heightSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, this.height, 0, 0), this.widthSegments, this.heightSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, this.height, 0, 0), this.widthSegments, this.heightSegments, 0 ); 
	buildPlane( new THREE.Vector4(-p.x, -p.y, -p.z, -p.w), new THREE.Vector4(this.width, 0, 0, 0),  new THREE.Vector4(0, this.height, 0, 0), this.widthSegments, this.heightSegments, 0 ); 

	function buildPlane( p, u, v, gridX, gridY, materialIndex ) {
		if (u.length == 0 || v.length == 0)
			console.warn( 'Vector should have length.' );
			
		var w, ix, iy,
		offset = scope.vertices.length;

		var gridX1 = gridX + 1,
		gridY1 = gridY + 1,
		segment_width = width / gridX,
		segment_height = height / gridY;

		for ( iy = 0; iy <= gridY; iy++ ) {
			for ( ix = 0; ix <= gridX; ix++ ) {
				var vector = p.clone().add( u.clone().multiplyScalar(ix/gridX) ).add( v.clone().multiplyScalar(iy/gridY) );
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
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [
							new THREE.Vector2( ix / gridX, 1 - iy / gridY ),
							new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY ),
							new THREE.Vector2( ( ix + 1 ) / gridX, 1- ( iy + 1 ) / gridY ),
							new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY )
						] );

			}

		}

	}

	this.computeCentroids();
	//this.mergeVertices();

};

FOUR.TesseractGeometry.prototype = Object.create( FOUR.Geometry.prototype );
