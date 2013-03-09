/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://exocortex.com
 * copied from THREE
 * @author bcourter / http://blakecourter.com  */

FOUR.Geometry = function () {

//	THREE.EventDispatcher.call( this );

	this.id = FOUR.GeometryIdCount++;

	this.name = '';

	this.vertices = [];
	this.colors = [];  // one-to-one vertex colors, used in ParticleSystem, Line and Ribbon

	this.faces = [];

	this.faceUvs = [[]];
	this.faceVertexUvs = [[]];

	this.boundingBox = null;
	this.boundingSphere = null;

	this.dynamic = true; // the intermediate typed arrays will be deleted when set to false

	// update flags

	this.verticesNeedUpdate = false;
	this.elementsNeedUpdate = false;
	this.uvsNeedUpdate = false;
	this.colorsNeedUpdate = false;

	this.buffersNeedUpdate = false;

};

FOUR.Geometry.prototype = {

	constructor: FOUR.Geometry,

	applyMatrix: function ( matrix ) {

		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {
			var vertex = this.vertices[ i ];
			vertex.applyMatrix5( matrix );
		}

		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {
			var face = this.faces[ i ];
			var vector = face.centroid;
			
			if (vector.d === undefined)
				vector = new THREE.Vector4(vector.x, vector.y, vector.z, 0);
			
			vector.applyMatrix5( matrix );
		}

	},

	computeCentroids: function () {

		var f, fl, face;

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			face.centroid.set( 0, 0, 0, 0 );

			if ( face instanceof FOUR.Face4 ) {
				face.centroid.add( this.vertices[ face.a ] );
				face.centroid.add( this.vertices[ face.b ] );
				face.centroid.add( this.vertices[ face.c ] );
				face.centroid.add( this.vertices[ face.d ] );
				face.centroid.divideScalar( 4 );
			} else {
				console.warn( 'WARNING: unhandled case FOUR.Geometry.computeCentroids.' );
			}
			

		}

	},

	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new FOUR.Box4();

		}

		this.boundingBox.setFromPoints( this.vertices );

	},

/*
	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new THREE.Sphere();

		}

		this.boundingSphere.setFromCenterAndPoints( this.boundingSphere.center, this.vertices );

	},
*/
	/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */
/*
	mergeVertices: function () {

		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;
		var indices, k, j, jl, u;

		// reset cache of vertices as it now will be changing.
		this.__tmpVertices = undefined;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ];
			key = [ Math.round( v.x * precision ), Math.round( v.y * precision ), Math.round( v.z * precision ), Math.round( v.w * precision ) ].join( '_' );

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.
		var faceIndicesToRemove = [];

		for( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

				indices = [ face.a, face.b, face.c ];

				var dupIndex = -1;

				// if any duplicate vertices are found in a Face3
				// we have to remove the face as nothing can be saved
				for ( var n = 0; n < 3; n ++ ) {
					if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

						dupIndex = n;
						faceIndicesToRemove.push( i );
						break;

					}
				}

			} else if ( face instanceof THREE.Face4 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];
				face.d = changes[ face.d ];

				// check dups in (a, b, c, d) and convert to -> face3

				indices = [ face.a, face.b, face.c, face.d ];

				var dupIndex = -1;

				for ( var n = 0; n < 4; n ++ ) {

					if ( indices[ n ] == indices[ ( n + 1 ) % 4 ] ) {

						// if more than one duplicated vertex is found
						// we can't generate any valid Face3's, thus
						// we need to remove this face complete.
						if ( dupIndex >= 0 ) {

							faceIndicesToRemove.push( i );

						}

						dupIndex = n;

					}
				}

				if ( dupIndex >= 0 ) {

					indices.splice( dupIndex, 1 );

					var newFace = new THREE.Face3( indices[0], indices[1], indices[2], face.normal, face.color, face.materialIndex );

					for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

						u = this.faceVertexUvs[ j ][ i ];

						if ( u ) {
							u.splice( dupIndex, 1 );
						}

					}

					if( face.vertexNormals && face.vertexNormals.length > 0) {

						newFace.vertexNormals = face.vertexNormals;
						newFace.vertexNormals.splice( dupIndex, 1 );

					}

					if( face.vertexColors && face.vertexColors.length > 0 ) {

						newFace.vertexColors = face.vertexColors;
						newFace.vertexColors.splice( dupIndex, 1 );
					}

					this.faces[ i ] = newFace;
				}

			}

		}

		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

			this.faces.splice( i, 1 );

			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

				this.faceVertexUvs[ j ].splice( i, 1 );

			}

		}

		// Use unique set of vertices

		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;

	},
*/
	asThreeGeometry: function (isStereographic, isInverting) {
		var isStereographic = isStereographic || false;
		var isInverting = isInverting || false;

		var geometry = new THREE.Geometry();

		var vertices = this.vertices;
		var rejectVertices = [];

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {
			var v = vertices[i];
			var vector;
			
			vector = new THREE.Vector3(v.x, v.y, v.z);
			
			if (isStereographic) {
				vector.divideScalar(v.w);
			}
			
			if (isInverting) {
				vector.divideScalar(vector.lengthSq());
			}
			
			geometry.vertices.push(vector);

			if (!(vector.length() <= 100)) {
				rejectVertices.push(geometry.vertices.length);
			}
			
	//		geometry.colors.push( new THREE.Vector3(v.x, v.y, v.z) );
	//		geometry.normals.push( new THREE.Vector3(v.x, v.y, v.z).normalize() );
		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {
			var a = faces[i].a;
			var b = faces[i].b;
			var c = faces[i].c;
			var d = faces[i].d;
			
		//	if (rejectVertices.indexOf(a) != -1 || rejectVertices.indexOf(b) != -1 || rejectVertices.indexOf(b) != -1 || rejectVertices.indexOf(b) != -1) {
			var maxLength = 20;
			if ( geometry.vertices[a].distanceTo(geometry.vertices[b]) > maxLength ||
				geometry.vertices[b].distanceTo(geometry.vertices[c]) > maxLength ||
				geometry.vertices[a].distanceTo(geometry.vertices[c]) > maxLength ||
				(d && geometry.vertices[b].distanceTo(geometry.vertices[d]) > maxLength) 
			) {
				continue;
			}

			var face;
			if (d === undefined)
				face = new THREE.Face3 ( a, b, c, null, faces[i].color, faces[i].materialIndex );
			else
				face = new THREE.Face4 ( a, b, c, d, null, faces[i].color, faces[i].materialIndex );

			geometry.faces.push( face );
		}
		
		//geometry.computeVertexNormals();
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {
			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {
				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );
			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );
		}

		return geometry;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	},
	
	clone: function () {

		var geometry = new FOUR.Geometry();

		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			geometry.vertices.push( vertices[ i ].clone() );

		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {

			geometry.faces.push( faces[ i ].clone() );

		}

		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {

			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );

		}

		return geometry;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

FOUR.GeometryIdCount = 0;
