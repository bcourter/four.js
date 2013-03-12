
$(document).ready(function() {
   test();
 });

function test() {
	//var time = new Date().getTime() / 1000;
	var mIdentityMatrix = new FOUR.Matrix5().identity();
	//var mMatrix = new FOUR.Matrix5().makeRotationWX(time * 0.03);
	var mMatrix = new FOUR.Matrix5(	3, 1, 2, 1, 1,
									2, 1, 2, 2, 3,
									5, 1, 1, 1, 2,
									1, 3, 3, 2, 2,
									1, 1, 2, 1, 4);
	var mInverse = new FOUR.Matrix5().getInverse(mMatrix, false);
	var mResult = mMatrix.multiply(mInverse);
	alert("Checking: identity matrix equal to M*M^-1? " + (SerializeMatrix(mIdentityMatrix) === SerializeMatrix(mResult)) + ": " + SerializeMatrix(mIdentityMatrix) + "\n<>\n" + SerializeMatrix(mResult));
}

function SerializeMatrix(mMatrix) {
	precision = Math.pow(10, 6);
	var SerializedArray = Math.round(mMatrix.elements[0] * precision) / precision;
	for (var i = 1; i < mMatrix.elements.length; i++) {
		//alert (mIdentityMatrix.elements[i]);
    	SerializedArray = SerializedArray + ',' + Math.round(mMatrix.elements[i] * precision) / precision;
    }
    return(SerializedArray);
}


// 2, 1, 1, 3, 1
// 1, 1, 1, 3, 1
// 2, 2, 1, 3, 2
// 1, 2, 1, 2, 1
// 1, 3, 2, 2, 4