
import { AxesHelper, DirectionalLight, Mesh, MeshLambertMaterial, OrthographicCamera, Scene, SphereGeometry, SpotLight, WebGLRenderer, AmbientLight, PerspectiveCamera, Object3D, Vector3, PointLight, Spherical, ArcCurve, Geometry, LineBasicMaterial, Line, TextureLoader, Color } from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import * as planets from './planets.json'
//@ts-expect-error
import TEXTURES from '../assets/texture/*.jpg'
console.log(TEXTURES)
const scene = new Scene()
console.log(scene)
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000)
const renderer = new WebGLRenderer()
const ambientlight = new AmbientLight(0xa0a0a0)
const pointlight = new PointLight(0xffffff)


const control = new MapControls(camera, renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const axes = new AxesHelper(1000);
scene.add(ambientlight, pointlight)
camera.position.x = 0
camera.position.z = 0
camera.position.y = 3000

camera.lookAt(0, 0, 0)

const PI = Math.PI
const sin = Math.sin
const cos = Math.cos
const arctan = Math.atan

class Star {
  name: string
  radius: number
  color: string
  constructor(name: string, radius: number, color: string) {
    this.name = name
    this.radius = radius
    this.color = color
  }
  draw() {
    const geometry = new SphereGeometry(this.radius, 32, 32)
    const material = new MeshLambertMaterial({ map:new TextureLoader().load(TEXTURES['2k_sun']) })
    const sphere = new Mesh(geometry, material)
    sphere.name = this.name
    scene.add(sphere)
    console.log(sphere)
  }
}


interface PlanetInterface {
  name: string
  radius: number //半径km
  color: string
  perihelion: number //近日点km
  aphelion: number //远日点km
  synodicPeriod: number //会合周期day
  obitalPeriod: number //公转周期day
  texture?: string
}
class Planet {
  name: string
  radius: number //半径km
  color: string
  perihelion: number //近日点km
  aphelion: number //远日点km
  synodicPeriod: number //会合周期day
  obitalPeriod: number //公转周期day
  sphere: Mesh // 球体的threejs对象
  sphericalPosition: Spherical
  #deltaTheta: number //每帧旋转弧度
  #startTheta: number //起始旋转弧度，随机值
  #track //轨道
  texture: string
  constructor(option: PlanetInterface) {
    this.name = option.name
    this.radius = option.radius
    this.color = option.color
    this.perihelion = option.perihelion
    this.aphelion = option.aphelion
    this.synodicPeriod = option.synodicPeriod
    this.obitalPeriod = option.obitalPeriod
    this.texture = option.texture
    this.sphericalPosition = new Spherical((this.perihelion + this.aphelion) / 2, Math.PI / 2, Math.random() * Math.PI * 2)
    this.#deltaTheta = 5 / this.obitalPeriod

  }
  draw() {
    const geometry = new SphereGeometry(this.radius, 32, 32)
    const texURL = this.texture
    const material = new MeshLambertMaterial()

    if (this.texture) {
      console.log(texURL,TEXTURES)
      material.map = new TextureLoader().load(TEXTURES[texURL])
    }else{
      material.color = new Color(this.color)
    }

    const trackCurve = new ArcCurve(0, 0, (this.perihelion + this.aphelion) / 2, 0, Math.PI * 2, true)
    const trackGeometry = new Geometry().setFromPoints(trackCurve.getPoints(64))
    const trackMaterial = new LineBasicMaterial({ color: 'gray' })
    const track = new Line(trackGeometry, trackMaterial)
    track.rotateX(Math.PI / 2)
    this.#track = track
    this.sphere = new Mesh(geometry, material)
    this.sphere.castShadow = true
    this.sphere.position.setFromSpherical(this.sphericalPosition)
    this.sphere.name = this.name
    scene.add(this.sphere, track)
  }
  revolve() {
    const v = 2
    this.sphericalPosition.theta += this.#deltaTheta
    this.sphere.position.setFromSpherical(this.sphericalPosition)
  }
  center() {
    const position = this.sphere.position
    camera.lookAt(position)
  }
}

const Sun = new Star('Sun', 80, 'red')
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
  Mercury.draw()
  Venus.draw()
  Earth.draw()
  Mars.draw()
  Jupiter.draw()
  Saturn.draw()
  Uranus.draw()
  Neptune.draw()

  renderer.render(scene, camera)
}
function animate() {
  Mercury.revolve()
  Venus.revolve()
  Earth.revolve()
  Mars.revolve()
  Jupiter.revolve()
  Saturn.revolve()
  Uranus.revolve()
  Neptune.revolve()

  // Earth.center()

  renderer.render(scene, camera)

  // console.log(Earth.sphere.position.x)
  requestAnimationFrame(animate)
}
render()
animate()
