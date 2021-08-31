import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import math from "dat.gui/src/dat/color/math";

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//fog
const fog = new THREE.Fog("#06142f", 1, 15)
scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const brickAmbientOcclusion = textureLoader.load("/textures/bricks/ambientOcclusion.jpg")
const brickColor = textureLoader.load("/textures/bricks/color.jpg")
const brickNormal = textureLoader.load("/textures/bricks/normal.jpg")
const brickRoughness = textureLoader.load("/textures/bricks/roughness.jpg")

const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorColor = textureLoader.load("/textures/door/color.jpg")
const doorNormal = textureLoader.load("/textures/door/normal.jpg")
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg")
const doorAlpha = textureLoader.load("/textures/door/alpha.jpg")
const doorHeight = textureLoader.load("/textures/door/height.jpg")
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg")

const floorAmbientOcclusion = textureLoader.load("/textures/grass/ambientOcclusion.jpg")
const floorColor = textureLoader.load("/textures/grass/color.jpg")
const floorNormal = textureLoader.load("/textures/grass/normal.jpg")
const floorRoughness = textureLoader.load("/textures/grass/roughness.jpg")

floorAmbientOcclusion.repeat.set(20, 20)
floorColor.repeat.set(20, 20)
floorNormal.repeat.set(20, 20)
floorRoughness.repeat.set(20, 20)

floorAmbientOcclusion.wrapS = THREE.RepeatWrapping
floorColor.wrapS =THREE.RepeatWrapping
floorNormal.wrapS = THREE.RepeatWrapping
floorRoughness.wrapS = THREE.RepeatWrapping

floorAmbientOcclusion.wrapT = THREE.RepeatWrapping
floorColor.wrapT =THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping
floorRoughness.wrapT = THREE.RepeatWrapping
/**
 * Materials
 */


const brickMaterial = new THREE.MeshStandardMaterial()
brickMaterial.map = brickColor;
brickMaterial.roughnessMap = brickRoughness
brickMaterial.normalMap = brickNormal
brickMaterial.aoMap = brickAmbientOcclusion

const roofMaterial = new THREE.MeshStandardMaterial({color: '#ff0000'})
roofMaterial.metalness = 0.5
const doorMaterial = new THREE.MeshStandardMaterial()
doorMaterial.aoMap = doorAmbientOcclusion
doorMaterial.roughnessMap = doorRoughness
doorMaterial.normalMap = doorNormal
doorMaterial.displacementMap = doorHeight
doorMaterial.metalnessMap = doorMetalness
doorMaterial.alphaMap = doorAlpha
doorMaterial.map = doorColor
doorMaterial.transparent = true
doorMaterial.displacementScale = 0.1;

const floorMaterial = new THREE.MeshStandardMaterial()
floorMaterial.aoMap = floorAmbientOcclusion
floorMaterial.map = floorColor
floorMaterial.roughnessMap = floorRoughness
floorMaterial.normalMap = floorNormal




const bushMaterial = new THREE.MeshStandardMaterial({color:'rgba(2,155,5,0.55)'})
/**
 * House
 */

const house = new THREE.Group()
scene.add(house)

//Walls
const houseCubeGeo = new THREE.BoxBufferGeometry(5, 2.5, 5)
const houseCubeMesh = new THREE.Mesh(houseCubeGeo, brickMaterial)
houseCubeMesh.position.y = 1.25
houseCubeMesh.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(houseCubeMesh.geometry.attributes.uv.array, 2))
houseCubeMesh.castShadow = true
house.add(houseCubeMesh)

//Roof
const roofGeo = new THREE.ConeBufferGeometry(Math.sqrt(2) * 5 / 2 + 0.5, 2, 4)
const roofMesh = new THREE.Mesh(roofGeo, roofMaterial)
roofMesh.position.y = houseCubeGeo.parameters.height + 1
roofMesh.rotation.y = Math.PI / 4
roofMesh.castShadow = true
house.add(roofMesh)

//Bushes
const bushGeo = new THREE.SphereBufferGeometry(1, 16, 16)

const bushMesh1 = new THREE.Mesh(bushGeo, bushMaterial)
bushMesh1.scale.set(0.5, 0.5, 0.5)
bushMesh1.position.z = 3;
bushMesh1.position.x = 1.7
bushMesh1.position.y = 0.3
bushMesh1.castShadow = true
bushMesh1.receiveShadow = true
const bushMesh2 = new THREE.Mesh(bushGeo, bushMaterial)
bushMesh2.scale.set(0.2, 0.2, 0.2)
bushMesh2.position.z = 3.2
bushMesh2.position.x = 1.2
bushMesh2.position.y = 0.15
bushMesh2.castShadow = true
bushMesh2.receiveShadow = true
const bushMesh3 = new THREE.Mesh(bushGeo, bushMaterial)
bushMesh3.scale.set(0.3, 0.3, 0.3)
bushMesh3.position.z = 2.8
bushMesh3.position.x = -1.2
bushMesh3.position.y = 0.15
bushMesh3.castShadow = true
bushMesh3.receiveShadow= true
const bushMesh4 = new THREE.Mesh(bushGeo, bushMaterial)
bushMesh4.scale.set(0.7, 0.7, 0.7)
bushMesh4.position.z = 3.1
bushMesh4.position.x = -2
bushMesh4.position.y = 0.35
bushMesh4.castShadow = true
bushMesh4.receiveShadow = true
house.add(bushMesh1, bushMesh2, bushMesh3, bushMesh4)


//Door
const doorGeo = new THREE.PlaneBufferGeometry(2, 2, 100, 100)
const doorMesh = new THREE.Mesh(doorGeo, doorMaterial)
doorMesh.position.z = houseCubeGeo.parameters.depth / 2 + 0.01
doorMesh.position.y = 0.9
doorMesh.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(doorMesh.geometry.attributes.uv.array, 2))
doorMesh.castShadow = true
house.add(doorMesh)

/**
 *
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    floorMaterial
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.receiveShadow = true
scene.add(floor)

/**
 * Graves
 */
const graves = new THREE.Group()
scene.add(graves)
const graveGeo = new THREE.BoxBufferGeometry(0.7, 1, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color:'#838383'})
for (let i = 0; i < 50; i++) {
    const graveMesh = new THREE.Mesh(graveGeo, graveMaterial)
    graveMesh.position.y = 1 / 2 - 0.2
    const angle = Math.PI * 2 * Math.random()
    const x = Math.cos(angle) * (Math.random() * 10 + 5)
    const z = Math.sin(angle) * (Math.random() * 10 + 5)
    graveMesh.position.x = x
    graveMesh.position.z = z
    graveMesh.rotation.y = (Math.random() - 0.5) * 0.4
    graveMesh.rotation.z = (Math.random() - 0.5) * 0.4
    graveMesh.castShadow = true
    graves.add(graveMesh)
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d9ff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d9ff', 0.12)
moonLight.position.set(4, 5, - 2)
moonLight.castShadow = true
moonLight.shadow.mapSize.set(256, 256)
moonLight.shadow.camera.far = 15
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.z = houseCubeGeo.parameters.depth / 2 + 0.01
doorLight.position.y = 2.47
doorLight.castShadow = true
doorLight.shadow.mapSize.set(256, 256)
doorLight.shadow.camera.far = 7
scene.add(doorLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#8d007d", 2, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.set(256, 256)
ghost1.shadow.camera.far = 7
scene.add(ghost1)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#06142f")
renderer.shadowMap.enabled = true
/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const ghost1angle = elapsedTime * 0.5;
    const ghost1X = Math.sin(ghost1angle) * (6 + 2 * Math.sin(elapsedTime))
    const ghost1Z = Math.cos(ghost1angle) * (6 + 2 * Math.sin(elapsedTime))
    const ghost1Y = Math.sin(ghost1angle *2 ) * 1 + 0.5
    ghost1.position.x = ghost1X
    ghost1.position.z = ghost1Z
    ghost1.position.y = ghost1Y
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()