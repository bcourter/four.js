
$(document).ready(function() {
   test();
 });

function test() {
	var time = new Date().getTime() / 1000;
	var mIdentityMatrix = new FOUR.Matrix5().identity();
	var mMatrix = new FOUR.Matrix5().makeRotationWX(time * 0.03);
	var mInverse = new FOUR.Matrix5().getInverse(mMatrix, false);
	var mResult = mMatrix.multiply(mInverse);
	alert(SerializeMatrix(mIdentityMatrix) === SerializeMatrix(mResult));
}

function SerializeMatrix(mMatrix) {
	var SerializedArray = "";
	for (var i = 0; i < mMatrix.elements.length; i++) {
		//alert (mIdentityMatrix.elements[i]);
    	SerializedArray = SerializedArray + ',' + mMatrix.elements[i];
    }
    return(SerializedArray);
}
