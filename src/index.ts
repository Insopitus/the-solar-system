import * as planets from './planets.json'
import * as Three from 'three'
import { Vector3 } from 'three'
const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new Three.WebGLRenderer()
const lightSource = new Three.SpotLight(0xffffff)
lightSource.position.set(0, 0, 0)
lightSource.castShadow = true
scene.add(lightSource)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 5
console.log(planets)
camera.lookAt(0, 0, 0)

class Star {
  name: string
  radius: number
  color: string
  constructor(name, radius, color) {
    this.name = name
    this.radius = radius / 1000
    this.color = color
  }
  draw() {
    const geometry = new Three.SphereGeometry(this.radius / 10000, 32, 32)
    const material = new Three.MeshBasicMaterial({ color: this.color })
    const sphere = new Three.Mesh(geometry, material)
    sphere.name = this.name
    scene.add(sphere)
  }
}

class Planet {
  name: string
  radius: number //半径km
  color: string
  perihelion: number //近日点km
  aphelion: number //远日点km
  synodicPeriod: number //会合周期day
  obitalPeriod: number //公转周期day
  constructor(option) {
    this.name = option.name
    this.radius = option.radius / 1000
    this.color = option.color
    this.perihelion = option.perihelion / 1000
    this.aphelion = option.aphelion / 1000
    this.synodicPeriod = option.synodicPeriod / 1000
    this.obitalPeriod = option.obitalPeriod / 1000
  }
  draw() {
    // 修改行星参数使行星相比太阳大到可见
    let ratio = 10
    const geometry = new Three.SphereGeometry(this.radius * ratio, 26, 26)
    const material = new Three.MeshBasicMaterial({ color: this.color })
    const sphere = new Three.Mesh(geometry, material)
    sphere.position.set((this.perihelion + this.aphelion) / 2, 0, 0)
    sphere.name = this.name
    console.log(sphere)
    scene.add(sphere)
  }
  revolve() {}
}

const Sun = new Star('Sun', 695.7e3, 'red')
const Mercury = new Planet(planets.fake.Mercury)
const Venus = new Planet(planets.fake.Venus)
const Earth = new Planet(planets.fake.Earth)
const Mars = new Planet(planets.fake.Mars)
const Jupiter = new Planet(planets.fake.Jupiter)
const Saturn = new Planet(planets.fake.Saturn)
const Uranus = new Planet(planets.fake.Uranus)
const Neptune = new Planet(planets.fake.Neptune)

function render() {
  Sun.draw()
  Earth.draw()
  renderer.render(scene, camera)
}
render()
