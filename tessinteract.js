var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 700;


loop();

function loop() {
	requestAnimationFrame( loop, renderer.domElement );

	// scene
	var scene = new THREE.Scene();
	
//	var fourGeometry = new FOUR.TesseractGeometry( 200, 200, 200, 200, 1, 1, 1, 1 );
	var fourGeometry = new FOUR.CliffordTorusGeometry( 200, 200, 200, 200, 64, 64, 64, 64 );
	var time = new Date().getTime();
	var trans = new FOUR.Matrix5().makeRotationWX(time * 0.0003);
	var trans2 = new FOUR.Matrix5().makeRotationWY(time * 0.001);
	var trans3 = new FOUR.Matrix5().makeRotationZW(time * 0.0002);
	trans = trans.multiply(trans3).multiply(trans2);
	
//	var persp = 
	
	fourGeometry.applyMatrix(trans);
	
	var materials = [
		new THREE.MeshLambertMaterial( { 
			color: 0x222222, 
			side: THREE.DoubleSide,
			transparent: true,  
			opacity: 0.5
		} ),
		new THREE.MeshBasicMaterial( { 
			color: 0xEEEEEE, 
			shading: THREE.FlatShading, 
			wireframe: true
		} )
	];
	
	var shape = THREE.SceneUtils.createMultiMaterialObject( fourGeometry.asThreeGeometry(), materials );
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
