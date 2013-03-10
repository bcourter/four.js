//var renderer, camera, settings, materials, objGeometry;

$(document).ready(function() {
   test();
 });

function test() {
	var time = new Date().getTime() / 1000;
	var mIdentityMatrix = new FOUR.Matrix5().identity();
	var mIdentityMatrix2 = new FOUR.Matrix5().identity();
	var mMatrix = new FOUR.Matrix5().makeRotationWX(time * 0.03);
	var mInverse = new FOUR.Matrix5().makeRotationWY(time * 0.2);
	var mResult = mMatrix.multiply(mInverse);
	
    alert(SerializeMatrix(mIdentityMatrix) === SerializeMatrix(mIdentityMatrix2));
}

function SerializeMatrix(mMatrix) {
	var SerializedArray = "";
	for (var i = 0; i < mMatrix.elements.length; i++) {
		//alert (mIdentityMatrix.elements[i]);
    	SerializedArray = SerializedArray + ',' + mMatrix.elements[i];
    }
    return(SerializedArray);
}

/*
function render() {
	var time = new Date().getTime() / 1000;
	var scene = new THREE.Scene();
	
	var modelName = settings.modelListSelect.value;
	var fourGeometry = null;
	
	if (modelName == "tesseract") {
		fourGeometry = new FOUR.TesseractGeometry( 1, 1, 1, 1, 8, 8, 8, 8 )
	}
	
	if (modelName == "clifford torus") {
		fourGeometry = new FOUR.CliffordTorusGeometry( 1, 1, 1, 1, 64, 64, 64, 64 );
	}
	
	if (modelName == "obj") {
		fourGeometry = objGeometry.clone();
	}
	
	if (fourGeometry == null) {
		console.warn( "No geometry selected" );
		return;
	}
	
	var translate = new FOUR.Matrix5().makeTranslation(0, 0, 0, 0);
	
	var trans = new FOUR.Matrix5().makeRotationWX(time * 0.03);
	var trans2 = new FOUR.Matrix5().makeRotationWY(time * 0.2);
	var trans3 = new FOUR.Matrix5().makeRotationZW(time * 0.02);
	trans = trans2.multiply(trans).multiply(translate);
	
//	var persp = 
	
	fourGeometry.applyMatrix(trans);
	

	
	var shape = THREE.SceneUtils.createMultiMaterialObject( fourGeometry.asThreeGeometry(settings.isStereographicCheckbox.checked, settings.isInvertingCheckbox.checked), materials );
//	shape.overdraw = true;
	scene.add(shape);
	
	// sphere
	var sphere = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshLambertMaterial({color: 0x0000ff}));
	//sphere.overdraw = true;
	//scene.add(sphere);
	
	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0x555555);
	scene.add(ambientLight);
	
	// add directional light source
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);

	renderer.render( scene, camera );
}
*/