/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://exocortex.com
 * copied from THREE.Matrix4.js
 * @author bcourter / http://blakecourter.com
 */


FOUR.Matrix5 = function ( 
	n11, n12, n13, n14, n15, 
	n21, n22, n23, n24, n25, 
	n31, n32, n33, n34, n35, 
	n41, n42, n43, n44, n45,
	n51, n52, n53, n54, n55
) {

	var te = this.elements = new Float32Array( 25 );

	// TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
	//   we should not support semi specification of Matrix4, it is just weird.

	te[0] = ( n11 !== undefined ) ? n11 : 1; te[5] = n12 || 0; te[10] = n13 || 0; te[15] = n14 || 0; te[20] = n15 || 0;
	te[1] = n21 || 0; te[6] = ( n22 !== undefined ) ? n22 : 1; te[11] = n23 || 0; te[16] = n24 || 0; te[21] = n25 || 0;
	te[2] = n31 || 0; te[7] = n32 || 0; te[12] = ( n33 !== undefined ) ? n33 : 1; te[17] = n34 || 0; te[22] = n35 || 0;
	te[3] = n41 || 0; te[8] = n42 || 0; te[13] = n43 || 0; te[18] = ( n44 !== undefined ) ? n44 : 1; te[23] = n45 || 0;
	te[4] = n51 || 0; te[9] = n52 || 0; te[14] = n53 || 0; te[19] = n54 || 0; te[55] = ( n55 !== undefined ) ? n55 : 1; 

};

FOUR.extend( FOUR.Matrix5.prototype, {

	set: function ( 
		n11, n12, n13, n14, n15, 
		n21, n22, n23, n24, n25, 
		n31, n32, n33, n34, n35, 
		n41, n42, n43, n44, n45,
		n51, n52, n53, n54, n55
	) {
	
		var te = this.elements;
	
		te[0] = n11; te[5] = n12; te[10] = n13; te[15] = n14; te[20] = n15;
		te[1] = n21; te[6] = n22; te[11] = n23; te[16] = n24; te[21] = n25;
		te[2] = n31; te[7] = n32; te[12] = n33; te[17] = n34; te[22] = n35;
		te[3] = n41; te[8] = n42; te[13] = n43; te[18] = n44; te[23] = n45;
		te[4] = n51; te[9] = n52; te[14] = n53; te[19] = n54; te[24] = n55; 
	
		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		var me = m.elements;

		this.set(
	
			me[0], me[5], me[10], me[15], me[20],
			me[1], me[6], me[11], me[16], me[21],
			me[2], me[7], me[12], me[17], me[22],
			me[3], me[8], me[13], me[18], me[23],
			me[4], me[9], me[14], me[19], me[24] 
		
		);

		return this;

	},
	
	multiply: function ( m ) {
	 return this.multiplyMatrices(this, m);
	},

	multiplyMatrices: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;
		
		var a11 = ae[0]; a12 = ae[5]; a13 = ae[10]; a14 = ae[15]; a15 = ae[20];
		var a21 = ae[1]; a22 = ae[6]; a23 = ae[11]; a24 = ae[16]; a25 = ae[21];
		var a31 = ae[2]; a32 = ae[7]; a33 = ae[12]; a34 = ae[17]; a35 = ae[22];
		var a41 = ae[3]; a42 = ae[8]; a43 = ae[13]; a44 = ae[18]; a45 = ae[23];
		var a51 = ae[4]; a52 = ae[9]; a53 = ae[14]; a54 = ae[19]; a55 = ae[24]; 

		var b11 = be[0]; b12 = be[5]; b13 = be[10]; b14 = be[15]; b15 = be[20];
		var b21 = be[1]; b22 = be[6]; b23 = be[11]; b24 = be[16]; b25 = be[21];
		var b31 = be[2]; b32 = be[7]; b33 = be[12]; b34 = be[17]; b35 = be[22];
		var b41 = be[3]; b42 = be[8]; b43 = be[13]; b44 = be[18]; b45 = be[23];
		var b51 = be[4]; b52 = be[9]; b53 = be[14]; b54 = be[19]; b55 = be[24]; 

		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41 + a15 * b51;
		te[5] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42 + a15 * b52;
		te[10] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43 + a15 * b53;
		te[15] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44 + a15 * b54;
		te[20] = a11 * b15 + a12 * b25 + a13 * b35 + a14 * b45 + a15 * b55;

		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41 + a25 * b51;
		te[6] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42 + a25 * b52;
		te[11] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43 + a25 * b53;
		te[16] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44 + a25 * b54;
		te[21] = a21 * b15 + a22 * b25 + a23 * b35 + a24 * b45 + a25 * b55;

		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41 + a35 * b51;
		te[7] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42 + a35 * b52;
		te[12] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43 + a35 * b53;
		te[17] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44 + a35 * b54;
		te[22] = a31 * b15 + a32 * b25 + a33 * b35 + a34 * b45 + a35 * b55;

		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41 + a45 * b51
		te[8] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42 + a45 * b52;
		te[13] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43 + a45 * b53;
		te[18] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44 + a45 * b54;
		te[23] = a41 * b15 + a42 * b25 + a43 * b35 + a44 * b45 + a45 * b55;

		te[4] = a51 * b11 + a52 * b21 + a53 * b31 + a54 * b41 + a55 * b51
		te[19] = a51 * b12 + a52 * b22 + a53 * b32 + a54 * b42 + a55 * b52;
		te[14] = a51 * b13 + a52 * b23 + a53 * b33 + a54 * b43 + a55 * b53;
		te[19] = a51 * b14 + a52 * b24 + a53 * b34 + a54 * b44 + a55 * b54;
		te[24] = a51 * b15 + a52 * b25 + a53 * b35 + a54 * b45 + a55 * b55;

		return this;

	},

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[0] *= s; te[5] *= s; te[10] *= s; te[15] *= s; te[20] *= s;
		te[1] *= s; te[6] *= s; te[11] *= s; te[16] *= s; te[21] *= s;
		te[2] *= s; te[7] *= s; te[12] *= s; te[17] *= s; te[22] *= s;
		te[3] *= s; te[8] *= s; te[13] *= s; te[18] *= s; te[23] *= s;
		te[4] *= s; te[9] *= s; te[14] *= s; te[19] *= s; te[24] *= s;

		return this;

	},

	rotateAxis: function ( v ) {

		var te = this.elements;
		var vx = v.x, vy = v.y, vz = v.z, vw = v.w;

		v.x = vx * te[0] + vy * te[5] + vz * te[10] + vz * te[15];
		v.y = vx * te[1] + vy * te[6] + vz * te[11] + vz * te[16];
		v.z = vx * te[2] + vy * te[7] + vz * te[12] + vz * te[17];
		v.w = vx * te[3] + vy * te[8] + vz * te[13] + vz * te[18];

		v.normalize();

		return v;

	},

	determinant: function () {

		var te = this.elements;

		var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
		var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
		var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
		var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
		
		var n11 = te[0]; n12 = te[5]; n13 = te[10]; n14 = te[15]; n15 = te[20];
		var n21 = te[1]; n22 = te[6]; n23 = te[11]; n24 = te[16]; n25 = te[21];
		var n31 = te[2]; n32 = te[7]; n33 = te[12]; n34 = te[17]; n35 = te[22];
		var n41 = te[3]; n42 = te[8]; n43 = te[13]; n44 = te[18]; n45 = te[23];
		var n51 = te[4]; n52 = te[9]; n53 = te[14]; n54 = te[19]; n55 = te[24]; 


		return (
			n51 * new THREE.Matrix4(
				n11, n12, n13, n14,
				n21, n22, n23, n24,
				n31, n32, n33, n34,
				n41, n42, n43, n44
			).determinant() 
		// ADD MORE

		);

	},

/*
	getInverse: function ( m, throwOnInvertible ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements;
		var me = m.elements;

		var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
		var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
		var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
		var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

		te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
		te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
		te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
		te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
		te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
		te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
		te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
		te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
		te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
		te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
		te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
		te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
		te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
		te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
		te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
		te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

		var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 4 ] + me[ 2 ] * te[ 8 ] + me[ 3 ] * te[ 12 ];

		if ( det == 0 ) {

			var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg ); 

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;
		}

		this.multiplyScalar( 1 / det );

		return this;

	},

	compose: function() {

		var mRotation = new THREE.Matrix4(),
			mScale = new THREE.Matrix4();
		
		return function ( translation, rotation, scale ) {

			var te = this.elements;

			mRotation.identity();
			mRotation.setRotationFromQuaternion( rotation );

			mScale.makeScale( scale.x, scale.y, scale.z );

			this.multiplyMatrices( mRotation, mScale );

			te[12] = translation.x;
			te[13] = translation.y;
			te[14] = translation.z;

			return this;

		};

	}(),

	decompose: function() {

		var x = new THREE.Vector3(),
			y = new THREE.Vector3(),
			z = new THREE.Vector3(),
			matrix = new THREE.Matrix4();

		return function ( translation, rotation, scale ) {

			var te = this.elements;

			// grab the axis vectors
			x.set( te[0], te[1], te[2] );
			y.set( te[4], te[5], te[6] );
			z.set( te[8], te[9], te[10] );

			translation = ( translation instanceof THREE.Vector3 ) ? translation : new THREE.Vector3();
			rotation = ( rotation instanceof THREE.Quaternion ) ? rotation : new THREE.Quaternion();
			scale = ( scale instanceof THREE.Vector3 ) ? scale : new THREE.Vector3();

			scale.x = x.length();
			scale.y = y.length();
			scale.z = z.length();

			translation.x = te[12];
			translation.y = te[13];
			translation.z = te[14];

			// scale the rotation part

			matrix.copy( this );

			matrix.elements[0] /= scale.x;
			matrix.elements[1] /= scale.x;
			matrix.elements[2] /= scale.x;

			matrix.elements[4] /= scale.y;
			matrix.elements[5] /= scale.y;
			matrix.elements[6] /= scale.y;

			matrix.elements[8] /= scale.z;
			matrix.elements[9] /= scale.z;
			matrix.elements[10] /= scale.z;

			rotation.setFromRotationMatrix( matrix );

			return [ translation, rotation, scale ];

		};

	}(),

*/

	extractPosition: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[12] = me[12];
		te[13] = me[13];
		te[14] = me[14];
		te[15] = me[15];

		return this;

	},

	extractRotation: function() {

		var v1 = new THREE.Vector4();

		return function ( m ) {

			var te = this.elements;
			var me = m.elements;

			var scaleX = 1 / v1.set( me[0], me[1], me[2], me[3] ).length();
			var scaleY = 1 / v1.set( me[5], me[6], me[7], me[8] ).length();
			var scaleZ = 1 / v1.set( me[10], me[11], me[12], me[13] ).length();
			var scaleW = 1 / v1.set( me[15], me[16], me[17], me[18] ).length();

			te[0] = me[0] * scaleX;
			te[1] = me[1] * scaleX;
			te[2] = me[2] * scaleX;
			te[3] = me[3] * scaleX;

			te[5] = me[5] * scaleY;
			te[6] = me[6] * scaleY;
			te[7] = me[7] * scaleY;
			te[8] = me[8] * scaleY;

			te[10] = me[10] * scaleZ;
			te[11] = me[11] * scaleZ;
			te[12] = me[12] * scaleZ;
			te[13] = me[13] * scaleZ;

			te[25] = me[25] * scaleW;
			te[26] = me[26] * scaleW;
			te[27] = me[27] * scaleW;
			te[28] = me[28] * scaleW;

			return this;

		};

	}(),

	translate: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z, w = v.w;

		te[20] = te[0] * x + te[5] * y + te[10] * z + te[15] * w + te[20];
		te[21] = te[1] * x + te[6] * y + te[11] * z + te[16] * w + te[21];
		te[22] = te[2] * x + te[7] * y + te[12] * z + te[17] * w + te[22];
		te[23] = te[3] * x + te[8] * y + te[13] * z + te[18] * w + te[23];
		te[24] = te[4] * x + te[9] * y + te[14] * z + te[19] * w + te[24];

		return this;

	},
	
	rotateXY: function ( angle ) {

		var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m12 = te[5];
		var m22 = te[6];
		var m32 = te[7];
		var m42 = te[8];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 + s * m12;
		te[1] = c * m21 + s * m22;
		te[2] = c * m31 + s * m32;
		te[3] = c * m41 + s * m42;

		te[5] = c * m12 - s * m11;
		te[6] = c * m22 - s * m21;
		te[7] = c * m32 - s * m31;
		te[8] = c * m42 - s * m41;

		return this;

	},

	rotateYZ: function ( angle ) {

		var te = this.elements;
		var m12 = te[5];
		var m22 = te[6];
		var m32 = te[7];
		var m42 = te[8];
		var m13 = te[10];
		var m23 = te[11];
		var m33 = te[12];
		var m43 = te[13];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[5] = c * m12 + s * m13;
		te[6] = c * m22 + s * m23;
		te[7] = c * m32 + s * m33;
		te[8] = c * m42 + s * m43;
		te[10] = c * m13 - s * m12;
		te[11] = c * m23 - s * m22;
		te[12] = c * m33 - s * m32;
		te[13] = c * m43 - s * m42;

		return this;

	},

	rotateZX: function ( angle ) {

		var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m13 = te[10];
		var m23 = te[11];
		var m33 = te[12];
		var m43 = te[13];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 - s * m13;
		te[1] = c * m21 - s * m23;
		te[2] = c * m31 - s * m33;
		te[3] = c * m41 - s * m43;

		te[10] = c * m13 + s * m11;
		te[11] = c * m23 + s * m21;
		te[12] = c * m33 + s * m31;
		te[13] = c * m43 + s * m41;

		return this;

	},
	
	rotateWX: function ( angle ) {

		var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m14 = te[15];
		var m24 = te[16];
		var m34 = te[17];
		var m44 = te[18];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 + s * m14;
		te[1] = c * m21 + s * m24;
		te[2] = c * m31 + s * m34;
		te[3] = c * m41 + s * m44;

		te[15] = c * m14 - s * m11;
		te[16] = c * m24 - s * m21;
		te[17] = c * m34 - s * m31;
		te[18] = c * m44 - s * m41;

		return this;

	},

	rotateWY: function ( angle ) {

		var te = this.elements;
		var m12 = te[5];
		var m22 = te[6];
		var m32 = te[7];
		var m42 = te[8];
		var m14 = te[15];
		var m24 = te[16];
		var m34 = te[17];
		var m44 = te[18];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[5] = c * m12 + s * m14;
		te[6] = c * m22 + s * m24;
		te[7] = c * m32 + s * m34;
		te[8] = c * m42 + s * m44;

		te[15] = c * m14 - s * m12;
		te[16] = c * m24 - s * m22;
		te[17] = c * m34 - s * m32;
		te[18] = c * m44 - s * m42;

		return this;

	},

	rotateZW: function ( angle ) {

		var te = this.elements;
		var m13 = te[10];
		var m23 = te[11];
		var m33 = te[12];
		var m43 = te[13];
		var m14 = te[15];
		var m24 = te[16];
		var m34 = te[17];
		var m44 = te[18];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[10] = c * m13 + s * m14;
		te[11] = c * m23 + s * m24;
		te[12] = c * m33 + s * m34;
		te[13] = c * m43 + s * m44;

		te[15] = c * m14 - s * m13;
		te[16] = c * m24 - s * m23;
		te[17] = c * m34 - s * m33;
		te[18] = c * m44 - s * m43;

		return this;

	},

	rotateByAxis: function ( axis, angle ) {

		var te = this.elements;

		// optimize by checking axis

		if ( axis.x === 1 && axis.y === 0 && axis.z === 0 ) {

			return this.rotateYZ( angle );

		} else if ( axis.x === 0 && axis.y === 1 && axis.z === 0 ) {

			return this.rotateZX( angle );

		} else if ( axis.x === 0 && axis.y === 0 && axis.z === 1 ) {

			return this.rotateXZ( angle );

		}

		var x = axis.x, y = axis.y, z = axis.z;
		var n = Math.sqrt(x * x + y * y + z * z);

		x /= n;
		y /= n;
		z /= n;

		var xx = x * x, yy = y * y, zz = z * z;
		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var oneMinusCosine = 1 - c;
		var xy = x * y * oneMinusCosine;
		var xz = x * z * oneMinusCosine;
		var yz = y * z * oneMinusCosine;
		var xs = x * s;
		var ys = y * s;
		var zs = z * s;

		var r11 = xx + (1 - xx) * c;
		var r21 = xy + zs;
		var r31 = xz - ys;
		var r12 = xy - zs;
		var r22 = yy + (1 - yy) * c;
		var r32 = yz + xs;
		var r13 = xz + ys;
		var r23 = yz - xs;
		var r33 = zz + (1 - zz) * c;

		var m11 = te[0], m21 = te[1], m31 = te[2], m41 = te[3];
		var m12 = te[4], m22 = te[5], m32 = te[6], m42 = te[7];
		var m13 = te[8], m23 = te[9], m33 = te[10], m43 = te[11];

		te[0] = r11 * m11 + r21 * m12 + r31 * m13;
		te[1] = r11 * m21 + r21 * m22 + r31 * m23;
		te[2] = r11 * m31 + r21 * m32 + r31 * m33;
		te[3] = r11 * m41 + r21 * m42 + r31 * m43;

		te[4] = r12 * m11 + r22 * m12 + r32 * m13;
		te[5] = r12 * m21 + r22 * m22 + r32 * m23;
		te[6] = r12 * m31 + r22 * m32 + r32 * m33;
		te[7] = r12 * m41 + r22 * m42 + r32 * m43;

		te[8] = r13 * m11 + r23 * m12 + r33 * m13;
		te[9] = r13 * m21 + r23 * m22 + r33 * m23;
		te[10] = r13 * m31 + r23 * m32 + r33 * m33;
		te[11] = r13 * m41 + r23 * m42 + r33 * m43;

		return this;

	},

	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z, w = v.w;

		for (var i = 0; i < 20; i+=3) {
			te[i] *= x;	
			te[i+1] *= y;	
			te[i+2] *= z;	
			te[i+3] *= w;	
		}

		return this;

	},

	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2] + te[3] * te[3];
		var scaleYSq = te[5] * te[5] + te[6] * te[6] + te[7] * te[7]+ te[8] * te[8];
		var scaleZSq = te[10] * te[10] + te[11] * te[11] +  te[12] * te[12] + te[13] * te[13];
		var scaleWSq = te[15] * te[15] + te[16] * te[16] + te[17] * te[17]+ te[18] * te[18];

		return Math.sqrt( Math.max( Math.max( scaleXSq, scaleYSq ), Math.max( scaleZSq, scaleWSq ) ) );

	},

	makeTranslation: function ( x, y, z, w ) {

		this.set(

			1, 0, 0, 0, x,
			0, 1, 0, 0, y,
			0, 0, 1, 0, z,
			0, 0, 0, 1, w,
			0, 0, 0, 0, 1

		);

		return this;

	},

	makeRotationXY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, -s, 0, 0, 0,
			s,  c, 0, 0, 0,
			0,  0, 1, 0, 0,
			0,  0, 0, 1, 0,
			0,  0, 0, 0, 1

		);

		return this;

	},
	
	makeRotationYZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(
		
			1, 0,  0, 0, 0,
			0, c, -s, 0, 0,
			0, s,  c, 0, 0,
			0, 0,  0, 1, 0,
			0, 0,  0, 0, 1

		);

		return this;

	},

	makeRotationZW: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0,  0, 0,
			0, 1, 0,  0, 0,
			0, 0, c, -s, 0,
			0, 0, s,  c, 0,
			0, 0, 0,  0, 1

		);

		return this;

	},
	
	makeRotationWX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, 0, s, 0,
			 0, 1, 0, 0, 0,
			 0, 0, 1, 0, 0,
			-s, 0, 0, c, 0,
			 0, 0, 0, 0, 1

		);

		return this;

	},

	makeRotationZX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0, 0,
			 0, 1, 0, 0, 0,
			-s, 0, c, 0, 0,
			 0, 0, 0, 1, 0,
			 0, 0, 0, 0, 1

		);

		return this;

	},
		
	makeRotationWY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1,  0, 0, 0, 0,
			0,  c, 0, s, 0,
			0,  0, 1, 0, 0,
			0, -s, 0, c, 0,
			0,  0, 0, 0, 1

		);

		return this;

	},
	

/*
	makeRotationAxis: function ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z, w = axis.w;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		 return this;

	},
*/

	makeScale: function ( x, y, z, w ) {

		this.set(

			x, 0, 0, 0, 0,
			0, y, 0, 0, 0,
			0, 0, z, 0, 0,
			0, 0, 0, w, 0,
			0, 0, 0, 0, 1

		);

		return this;

	},

/*
	makeFrustum: function ( left, right, bottom, top, near, far ) {

		var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[0] = x;	te[4] = 0;	te[8] = a;	te[12] = 0;
		te[1] = 0;	te[5] = y;	te[9] = b;	te[13] = 0;
		te[2] = 0;	te[6] = 0;	te[10] = c;	te[14] = d;
		te[3] = 0;	te[7] = 0;	te[11] = - 1;	te[15] = 0;

		return this;

	},

	makePerspective: function ( fov, aspect, near, far ) {

		var ymax = near * Math.tan( THREE.Math.degToRad( fov * 0.5 ) );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		te[0] = 2 / w;	te[4] = 0;	te[8] = 0;	te[12] = -x;
		te[1] = 0;	te[5] = 2 / h;	te[9] = 0;	te[13] = -y;
		te[2] = 0;	te[6] = 0;	te[10] = -2/p;	te[14] = -z;
		te[3] = 0;	te[7] = 0;	te[11] = 0;	te[15] = 1;

		return this;

	},
*/

	clone: function () {

		var te = this.elements;

		return new THREE.Matrix4(
			
			te[0], te[5], te[10], te[15], te[20],
			te[1], te[6], te[11], te[16], te[21],
			te[2], te[7], te[12], te[17], te[22],
			te[3], te[8], te[13], te[18], te[23],
			te[4], te[9], te[14], te[19], te[24] 

		);

	}

} );

THREE.extend( THREE.Vector4.prototype, {

	applyMatrix5: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;

		this.x = e[0] * x + e[5] * y + e[10] * z + e[15] * w + e[20];
		this.y = e[1] * x + e[6] * y + e[11] * z + e[16] * w + e[21];
		this.z = e[2] * x + e[7] * y + e[12] * z + e[17] * w + e[22];
		this.w = e[3] * x + e[8] * y + e[13] * z + e[18] * w + e[23];
		var h  = e[4] * x + e[9] * y + e[14] * z + e[19] * w + e[24];
		
		if (h != 1) {
			console.warn( 'Unexpected homogeneous coordinate' );
		}

		return this;

	},

} );