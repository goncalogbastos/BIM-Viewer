import {projects} from "./projects.js";

// Get the current project ID from the URL parameter
const currentURL = window.location.href;
const url = new URL(currentURL);
const currentProjectID = url.searchParams.get("id");

// Get the current project
const currentProject = projects.find(project => project.id === currentProjectID)

// Add the project name to the viewer
const projectNameContainer = document.getElementById("project-name");
console.log(currentProjectID);
projectNameContainer.textContent = currentProject.name;

// Add the project URL to the iframe
/* const iframe = document.getElementById('model-iframe');
iframe.src = currentProject.url; */


// ###############################################################

import{
    Scene,
    AxesHelper,
    GridHelper,
    PerspectiveCamera,
    WebGLRenderer,
    DirectionalLight,
    AmbientLight,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    Clock,
    MathUtils,
    
} from "./node_modules/three/build/three.module.js";

import CameraControls from "./node_modules/camera-controls/dist/camera-controls.module.js"


// Define the Scene
const scene = new Scene();
const canvas = document.getElementById('three-canvas');
const axes = new AxesHelper();
const grid = new GridHelper();

axes.material.depthTest = false;
grid.renderOrder = 1;
axes.renderOrder = 2;

scene.add(axes);
scene.add(grid);

// Define the Camara
const camera = new PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight);

camera.lookAt(axes.position);
scene.add(camera);

// Define the Renderer
const renderer = new WebGLRenderer({canvas});
const pixelRatio = Math.min(window.devicePixelRatio,2);

renderer.setPixelRatio(pixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setClearColor(0x3E3E3E,1);

// Define the Lights
const light = new DirectionalLight();
const ambientLight = new AmbientLight();

light.position.set(3,3,3).normalize();
scene.add(light);

// Define the Responsivity
window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);    
  });

// Define the Controls
const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };
CameraControls.install({THREE: subsetOfTHREE});

const clock = new Clock();
const cameraControls = new CameraControls(camera,canvas);

cameraControls.dollyToCursor = true;
cameraControls.setLookAt(10,10,10,0,0,0);

// Define the Animation
function animate() {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);    
    requestAnimationFrame(animate); // run in an infinite loop
  }  
  animate();




