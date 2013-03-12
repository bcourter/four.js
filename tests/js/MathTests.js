
$(document).ready(function() {
   test();
 });

function test() {
	//var time = new Date().getTime() / 1000;
	var mIdentityMatrix = new FOUR.Matrix5().identity();
	//var mMatrix = new FOUR.Matrix5().makeRotationWX(time * 0.03);
	var mMatrix = new FOUR.Matrix5(	2, 1, 2, 1, 1,
									1, 1, 2, 2, 3,
									1, 1, 1, 1, 2,
									3, 3, 3, 2, 2,
									1, 1, 2, 1, 4);
	var mInverse = new FOUR.Matrix5().getInverse(mMatrix, false);
	var mResult = mMatrix.multiply(mInverse);
	alert("Comparison is " + (SerializeMatrix(mIdentityMatrix) === SerializeMatrix(mResult)) + ": " + SerializeMatrix(mIdentityMatrix) + "<>" + SerializeMatrix(mResult));
}

function SerializeMatrix(mMatrix) {
	//precision = Math.pow(10, 6);
	var SerializedArray = "";
	for (var i = 0; i < mMatrix.elements.length; i++) {
		//alert (mIdentityMatrix.elements[i]);
    	SerializedArray = SerializedArray + ',' + mMatrix.elements[i];//.toFixed(4);
    }
    return(SerializedArray);
}


// 2, 1, 1, 3, 1
// 1, 1, 1, 3, 1
// 2, 2, 1, 3, 2
// 1, 2, 1, 2, 1
// 1, 3, 2, 2, 4