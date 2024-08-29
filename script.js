import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//import planet texture images
import starsTexture from './textures/stars.jpg';
import sunTexture from './textures/sun.jpg';
import mercuryTexture from './textures/mercury.jpg';
import venusTexture from './textures/venus.jpg';
import moonTexture from './textures/moon.jpg';
import earthTexture from './textures/earth.jpg';
import marsTexture from './textures/mars.jpg';
import jupiterTexture from './textures/jupiter.jpg';
import saturnTexture from './textures/saturn.jpg';
import uranusTexture from './textures/uranus.jpg';
import neptuneTexture from './textures/neptune.jpg';


//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//creating camera instance
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//orbit
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
controls.target.set(0,20,20); //move the planets around the screen
controls.update();

//add ambient for soft shadows
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

//add stars background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

//load sun
const sunGeo = new THREE.SphereGeometry(16, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({map:textureLoader.load(sunTexture)});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//adding point light
const pointLight = new THREE.PointLight(0xFFFFFF, 50000, 500);
scene.add(pointLight);

//load other planets
function createPlanet(size, texture, posX, posY, posZ, ring){
    const geometry = new THREE.SphereGeometry(size, 25, 20);
    const material = new THREE.MeshStandardMaterial({map:textureLoader.load(texture)});
    const planet = new THREE.Mesh(geometry, material);
    const planetObj = new THREE.Object3D;
    planetObj.add(planet);
    planet.position.set(posX, posY, posZ);

    if (ring){
        const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
        const RingMat = new THREE.MeshStandardMaterial({map:textureLoader.load(ring.texture), side : THREE.DoubleSide});
        const Ring = new THREE.Mesh(RingGeo, RingMat);
        planetObj.add(Ring);

        Ring.position.set(posX, posY, posZ);
        Ring.rotation.x = -0.5 *Math.PI;
    }
    scene.add(planetObj);
    return {planet, planetObj};
}

//add the planets and moon to earth, with the texture for each planet
const mercury = new createPlanet(2, mercuryTexture, 25, 0, 0);
const venus = new createPlanet(4, venusTexture, 38, 0, 0);
const earth = new createPlanet(5, earthTexture, 55, 0, 0);
const moon = new createPlanet(1, moonTexture, 62, 6, 0);
const mars = new createPlanet(3, marsTexture, 70, 0, 0);
const jupiter = new createPlanet(8, jupiterTexture,90,0,0 );
const saturn = new createPlanet(6, saturnTexture,120,0,0,{innerRadius:10, outerRadius:15, texture: saturnTexture});
const uranus = new createPlanet(4, uranusTexture, 145,0,0);
const neptune = new createPlanet(5, neptuneTexture, 160,0,0);

//adjust the orbit speed and rotation speed using sliders
let rotationSpeed = 0.001;
let orbitSpeed = 0;

const speedSlider = document.getElementById('orbit-slider');
speedSlider.addEventListener('input', () => {
    rotationSpeed = parseFloat(speedSlider.value);
});

const rotationSlider = document.getElementById('rotation-slider');
rotationSlider.addEventListener('input', () => {
    orbitSpeed = parseFloat(rotationSlider.value);
});

//Animate the solar system
function animate()
{
    sun.rotateY(0.002);
    mercury.planet.rotateY(rotationSpeed + 0.001);
    mercury.planetObj.rotateY(orbitSpeed + 0.001);
    venus.planet.rotateY(rotationSpeed + 0.0012);
    venus.planetObj.rotateY(orbitSpeed + 0.0015);
    moon.planetObj.rotateY(orbitSpeed + 0.0012);//moon rotating together with the earth
    earth.planet.rotateY(rotationSpeed + 0.012);
    earth.planetObj.rotateY(orbitSpeed + 0.0012);
    mars.planet.rotateY(rotationSpeed + 0.013);
    mars.planetObj.rotateY(orbitSpeed + 0.0019);
    jupiter.planet.rotateY(rotationSpeed + 0.04);
    jupiter.planetObj.rotateY(orbitSpeed + 0.0021);
    saturn.planet.rotateY(rotationSpeed + 0.01);
    saturn.planetObj.rotateY(orbitSpeed + 0.0021);
    uranus.planet.rotateY(rotationSpeed + 0.01);
    uranus.planetObj.rotateY(orbitSpeed + 0.0015);
    neptune.planet.rotateY(rotationSpeed + 0.01);
    neptune.planetObj.rotateY(orbitSpeed + 0.002);

    controls.update();//update controls
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

//zoom button controls for all planets
document.getElementById('mercury').addEventListener('click', () => {
    camera.position.set(25,0,0);
    camera.lookAt(mercury.position);
});

document.getElementById('venus').addEventListener('click', () => {
    camera.position.set(38,0,0);
    camera.lookAt(venus.position);
});

document.getElementById('earth').addEventListener('click', () => {
    camera.position.set(55,0,0);
    camera.lookAt(earth.position);
});

document.getElementById('mars').addEventListener('click', () => {
    camera.position.set(70,0,0);
    camera.lookAt(mars.position);
});

document.getElementById('jupiter').addEventListener('click', () => {
    camera.position.set(90,0,0);
    camera.lookAt(jupiter.position);
});

document.getElementById('saturn').addEventListener('click', () => {
    camera.position.set(120,0,0);
    camera.lookAt(saturn.position);
});

document.getElementById('uranus').addEventListener('click', () => {
    camera.position.set(145,0,0);
    camera.lookAt(uranus.position);
});

document.getElementById('neptune').addEventListener('click', () => {
    camera.position.set(160,0,0);
    camera.lookAt(neptune.position);
});