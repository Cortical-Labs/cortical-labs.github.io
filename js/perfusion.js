var scene = new THREE.Scene();
var canvas = document.querySelector('#perfusion')
var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.updateProjectionMatrix();

var renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1.6;
camera.position.set( 0, 10, 12 );
controls.update();

var ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(-1, 1, -1);
scene.add(light);


var light = new THREE.AmbientLight(0x222222);
scene.add(light);

var loader = new THREE.GLTFLoader();
var dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('/js/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load(
	// resource URL
	'/js/perfusion_circuit.glb',
	function (gltf) {

		scene.add(gltf.scene);

	},
	function (xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	// called when loading has errors
	function (error) {

		console.log('An error happened');

	}
)

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

animate();