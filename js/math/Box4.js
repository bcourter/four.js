/**
 * @author bhouston / http://exocortex.com
 * copied from THREE.Box3.js
 * @author bcourter / http://blakecourter.com 
 */

FOUR.Box4 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector4( Infinity, Infinity, Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector4( -Infinity, -Infinity, -Infinity, -Infinity );

};

FOUR.extend( FOUR.Box4.prototype, {

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		if ( points.length > 0 ) {

			var point = points[ 0 ];

			this.min.copy( point );
			this.max.copy( point );

			for ( var i = 1, il = points.length; i < il; i ++ ) {

				point = points[ i ];

				if ( point.x < this.min.x ) {
					this.min.x = point.x;
				} else if ( point.x > this.max.x ) {
					this.max.x = point.x;
				}

				if ( point.y < this.min.y ) {
					this.min.y = point.y;
				} else if ( point.y > this.max.y ) {
					this.max.y = point.y;
				}

				if ( point.z < this.min.z ) {
					this.min.z = point.z;
				} else if ( point.z > this.max.z ) {
					this.max.z = point.z;
				}


				if ( point.w < this.min.w ) {
					this.min.w = point.w;
				} else if ( point.w > this.max.w ) {
					this.max.w = point.w;
				}

			}

		} else {

			this.makeEmpty();

		}

		return this;

	},

	setFromCenterAndSize: function() {

		var v1 = new THREE.Vector4();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = this.min.w = Infinity;
		this.max.x = this.max.y = this.max.z = this.max.w = -Infinity;

		return this;

	},

	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z ) || ( this.max.w < this.min.w );

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector4();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector4();
		return result.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( -scalar );
		this.max.addScalar( scalar );

		return this;

	},

	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ||
		     point.z < this.min.z || point.z > this.max.z ||
		     point.w < this.min.w || point.w > this.max.w ) {

			return false;

		}

		return true;

	},

	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
			 ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) &&
			 ( this.min.z <= box.min.z ) && ( box.max.z <= this.max.z ) &&
			 ( this.min.w <= box.min.w ) && ( box.max.w <= this.max.w ) ) {

			return true;

		}

		return false;

	},

	getParameter: function ( point ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		return new THREE.Vector4(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z ),
			( point.w - this.min.w ) / ( this.max.w - this.min.w )
		);

	},

	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ||
		     box.max.z < this.min.z || box.min.z > this.max.z ||
		     box.max.w < this.min.w || box.min.w > this.max.w ) {

			return false;

		}

		return true;

	},

	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector4();
		return result.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function() {

		var v1 = new THREE.Vector4();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

/*
	getBoundingSphere: function() {

		var v1 = new THREE.Vector4();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Sphere();

			result.center = this.center();
			result.radius = this.size( v1 ).length() * 0.5;

			return result;

		};

	}(),
*/

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	applyMatrix5: function() {

		var points = [
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4(),
			new THREE.Vector4()
			];

		return function ( matrix ) {

			// NOTE: I am using a binary pattern to specify all 2^4 combinations below
			points[ 0].set( this.min.x, this.min.y, this.min.z, this.min.w ).applyMatrix4( matrix ); // 0000
			points[ 1].set( this.min.x, this.min.y, this.min.z, this.max.w ).applyMatrix4( matrix ); // 0001
			points[ 2].set( this.min.x, this.min.y, this.max.z, this.min.w ).applyMatrix4( matrix ); // 0010
			points[ 3].set( this.min.x, this.min.y, this.max.z, this.max.w ).applyMatrix4( matrix ); // 0011
			points[ 4].set( this.min.x, this.max.y, this.min.z, this.min.w ).applyMatrix4( matrix ); // 0100
			points[ 5].set( this.min.x, this.max.y, this.min.z, this.max.w ).applyMatrix4( matrix ); // 0101
			points[ 6].set( this.min.x, this.max.y, this.max.z, this.min.w ).applyMatrix4( matrix ); // 0110
			points[ 7].set( this.min.x, this.max.y, this.max.z, this.max.w ).applyMatrix4( matrix ); // 0111
			points[ 8].set( this.max.x, this.min.y, this.min.z, this.min.w ).applyMatrix4( matrix ); // 1000
			points[ 9].set( this.max.x, this.min.y, this.min.z, this.max.w ).applyMatrix4( matrix ); // 1001
			points[10].set( this.max.x, this.min.y, this.max.z, this.min.w ).applyMatrix4( matrix ); // 1010
			points[11].set( this.max.x, this.min.y, this.max.z, this.max.w ).applyMatrix4( matrix ); // 1011
			points[12].set( this.max.x, this.max.y, this.min.z, this.min.w ).applyMatrix4( matrix ); // 1100
			points[13].set( this.max.x, this.max.y, this.min.z, this.max.w ).applyMatrix4( matrix ); // 1101
			points[14].set( this.max.x, this.max.y, this.max.z, this.min.w ).applyMatrix4( matrix ); // 1110
			points[15].set( this.max.x, this.max.y, this.max.z, this.max.w ).applyMatrix4( matrix ); // 1111

			this.makeEmpty();
			this.setFromPoints( points );

			return this;

		};

	}(),

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},

	clone: function () {

		return new FOUR.Box4().copy( this );

	}

} );
