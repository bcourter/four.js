/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 * http://en.wikipedia.org/wiki/Clifford_torus
 */

FOUR.ObjGeometry = function ( path, scale ) {
	this.scale = scale || 1;

	FOUR.Geometry.call( this );
	var scope = this;
	
	var loader = new THREE.OBJLoader();
	loader.addEventListener( 'load', function ( event ) {
		content = event.content;
		var mesh = null;
		
		content.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				mesh = child;
			}
		} );
		
		if (mesh == null) {
			console.warn("no mesh found");
		}
		
		var vertices = mesh.geometry.vertices;
		for (var i = 0; i < vertices.length; i++) {
			var x = vertices[i].x * scale;
			var y = vertices[i].y * scale;
			var z = vertices[i].z * scale;
			
			var sumSq = (1 + x * x + y * y + z * z)
			var factor = 2 / sumSq;
			var xb = factor * x;
			var yb = factor * y;
			var zb = factor * z;
			var wb = (sumSq - 2) / sumSq;

			scope.vertices.push( new THREE.Vector4(xb, yb, zb, wb) );
		}
		
		var faces = mesh.geometry.faces;
		for (var i = 0; i < faces.length; i++) {
			var face;	
			if ( faces[i] instanceof THREE.Face3 ) { 
				face = new FOUR.Face3( faces[i].a, faces[i].b, faces[i].c);
			} else if ( faces[i] instanceof THREE.Face4 ) {
				face = new FOUR.Face4( faces[i].a, faces[i].b, faces[i].c, faces[i].d );
			} else {
				console.warn ("unhandled face");
			}
			
			face.materialIndex = 0; //TBD
			scope.faces.push(face);
		}

	});
    loader.load( path );
	
	this.computeCentroids();
	//this.mergeVertices();

};

FOUR.ObjGeometry.prototype = Object.create( FOUR.Geometry.prototype );
