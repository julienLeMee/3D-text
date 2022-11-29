import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
 const textureLoader = new THREE.TextureLoader()
 const matCapTexture = textureLoader.load('/textures/matcaps/8.png')
 const matCapTexture2 = textureLoader.load('/textures/matcaps/4.png')
 const matCapTexture3 = textureLoader.load('/textures/matcaps/7.png')

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Fonts
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      // écrire plusieurs lignes de texte:
      'Three.js',
      {
        font: font,
        size: 0.5, // taille du texte
        height: 0.2, // épaisseur du texte
        curveSegments: 5, // nombre de segments de courbe
        bevelEnabled: true, // activer le bevel
        bevelThickness: 0.03, // épaisseur du bevel
        bevelSize: 0.02, // taille du bevel
        bevelOffset: 0, // décalage du bevel
        bevelSegments: 4 // nombre de segments de bevel
        // le bevel est une sorte de bordure
      }
    )

    const textGeometry2 = new TextGeometry(
      'www.julienlemee.com',
      {
        font: font,
        size: 0.1,
        height: 0.01,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 4
      }
    )

    const textGeometry3 = new TextGeometry(
      'Click and drag to rotate',
      {
        font: font,
        size: 0.1,
        height: 0.01,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 4
      }
    )

      textGeometry.center()
      textGeometry2.center()
      textGeometry3.center()

      const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture })
      // textMaterial.wireframe = true
      const text = new THREE.Mesh(textGeometry, material)
      scene.add(text)

      const material2 = new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })

      const text2 = new THREE.Mesh(textGeometry2, material2)
      text2.position.y = -0.5
      text2.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      scene.add(text2)

      const thirdMaterial = new THREE.MeshMatcapMaterial()
      thirdMaterial.matcap = matCapTexture3

      const text3 = new THREE.Mesh(textGeometry3, thirdMaterial)
      text3.position.y = - 0.8
      scene.add(text3)


      // idéalement on créé le mesh material en dehors de la boucle pour éviter de le recréer à chaque itération et de ralentir le rendu

      for(let i = 0; i < 200; i++)
      {
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial()
        donutMaterial.matcap = matCapTexture
        donutMaterial.wireframe = true
        const donut = new THREE.Mesh(donutGeometry, donutMaterial)

        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        donut.scale.x = scale
        donut.scale.y = scale
        donut.scale.z = scale
        // same as :
        // donut.scale.set(scale, scale, scale)

        scene.add(donut)
      }

      for(let i = 0; i < 200; i++)
      {
        const starGeometry = new THREE.SphereGeometry(0.05, 24, 24)
        const starMaterial = new THREE.MeshBasicMaterial()
        const star = new THREE.Mesh(starGeometry, starMaterial)

        star.position.x = (Math.random() - 0.5) * 40
        star.position.y = (Math.random() - 0.5) * 40
        star.position.z = (Math.random() - 0.5) * 40

        scene.add(star)
      }
  }
)


/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshNormalMaterial()
// )

// scene.add(cube)

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
// camera.position.x = 1
camera.position.y = - 0.5
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
