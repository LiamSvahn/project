import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects/Material/Mesh

const partiklesGeometry = new THREE.BufferGeometry;
const partiklesCNT = 5000;

const posArray = new Float32Array(partiklesCNT * 3)

for(let i = 0; i < partiklesCNT * 3; i++){
    posArray[i] = (Math.random() - 0.5) * 5
}

const material = new THREE.PointsMaterial({
    size: 0.005
})

partiklesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const particlemesh = new THREE.Points(partiklesGeometry, material)
scene.add(particlemesh);

// Mesh
const sphere = new THREE.Mesh()
scene.add(sphere)


//------------------------------------------------LIGHT-----------------------------------------------------
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(200,200,200)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)

pointLight2.position.set(1,1,1)
pointLight2.intensity = 4;
scene.add(pointLight2)

const light1 = gui.addFolder('red light')

light1.add(pointLight2.position, 'y').min(-10).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-10).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-10).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLight3 = new THREE.PointLight(0xe1ff, 2)

pointLight3.position.set(1.60,3,4)
pointLight3.intensity = 4;
scene.add(pointLight3)

const light2 = gui.addFolder('blue light')

light2.add(pointLight3.position, 'y').min(-10).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-10).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-10).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
.onChange(() => {
  pointLight3.color.set(light2Color.color)
})

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.5, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    particlemesh.rotation.y = .05 * elapsedTime
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


