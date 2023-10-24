import { Scene, Color, PerspectiveCamera, WebGLRenderer, PointLight, DirectionalLight } from 'three';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls';


const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
scene.background = new Color(0x0A2457);

const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

const directionalLight = new DirectionalLight(0xffffff, 1.5);
scene.add(directionalLight);

const directionalLight2 = new DirectionalLight(0xffffff, 1.5);
directionalLight2.position.set(800, 100, 500)
scene.add(directionalLight2);

const directionalLight3 = new DirectionalLight(0xffffff, 1.5);
directionalLight3.position.set(-800, 100, 1000)
scene.add(directionalLight3);

const directionalLight4 = new DirectionalLight(0xffffff, 1.5);
directionalLight4.position.set(-800, -100, -1000)
scene.add(directionalLight4);

const objLoader = new OBJLoader();
objLoader.setPath('./img/');
objLoader.load('untitled.obj', (object) => {
    object.scale.set(50, 50, 50);
    object.position.set(-200, -200, 0)
    scene.add(object);
    const loading = document.querySelector("#loading")
    const overflow = document.querySelector("#overflow")
    if (!scene) {
        loading.style.display = "flex"
    } else {
        loading.style.display = "none"
        overflow.style.display = "none"
        console.log(`Carregado Object!`);
    }
}, (xhr) => {

    console.log(`${xhr.loaded / xhr.total * 100}`);



},
    (err) => {
        console.log(err)
    }
);

const animate = function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);
};

animate();
