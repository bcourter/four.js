var renderer, camera, settings, materials, objGeometry;

init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 7;
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	window.addEventListener( 'resize', onWindowResize, false );

	var Settings = function () {
		this.modelListSelect = document.getElementById("modelList");
		this.isStereographicCheckbox = document.getElementById("isStereographic");
		this.isInvertingCheckbox = document.getElementById("isInverting");
	};
	
	materials = [
		new THREE.MeshLambertMaterial( { 
			color: 0x222222, 
			side: THREE.DoubleSide,
			shading: THREE.FlatShading, 
			transparent: true,  
			opacity: 0.5
		} ),
		new THREE.MeshBasicMaterial( { 
			color: 0xEEEEEE, 
			shading: THREE.FlatShading, 
			wireframe: true
		} )
	];
	
	
	objGeometry = [];
	//new FOUR.ObjGeometry('sheep.obj', 1);

	settings = new Settings();	
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate, renderer.domElement );

	render();
	controls.update();
	//stats.update();
}

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
	
	if (modelName.match(/\.obj/i)) {
		if (objGeometry[modelName] === undefined)
			objGeometry[modelName] = new FOUR.ObjGeometry(modelName, 1);
		
		fourGeometry = objGeometry[modelName].clone();
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
