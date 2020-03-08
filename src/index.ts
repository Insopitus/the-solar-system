import * as planets from './planets.json'
import * as Three from 'three'
const scene = new Three.Scene()
const camera = new Three.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 )
const renderer = new Three.WebGLRenderer()
const lightSource = new Three.DirectionalLight(0xffffff)
lightSource.position.set(0, 0, 500)
lightSource.castShadow = true
scene.add(lightSource)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const axes = new Three.AxesHelper(1000);
// scene.add(axes)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1000

camera.lookAt(0, 0, 0)

const PI = Math.PI
const sin = Math.sin
const cos = Math.cos
const arctan = Math.atan

class Star {
  name: string
  radius: number
  color: string
  constructor(name, radius, color) {
    this.name = name
    this.radius = radius
    this.color = color
  }
  draw() {
    const geometry = new Three.SphereGeometry(this.radius, 32, 32)
    const material = new Three.MeshLambertMaterial({ color: this.color })
    const sphere = new Three.Mesh(geometry, material)
    sphere.name = this.name
    scene.add(sphere)
    console.log(sphere)
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
  sphere: any // 球体的threejs对象
  constructor(option) {
    this.name = option.name
    this.radius = option.radius
    this.color = option.color
    this.perihelion = option.perihelion
    this.aphelion = option.aphelion
    this.synodicPeriod = option.synodicPeriod
    this.obitalPeriod = option.obitalPeriod
  }
  draw() {
    const geometry = new Three.SphereGeometry(this.radius, 32, 32)
    const material = new Three.MeshLambertMaterial({ color: this.color })
    this.sphere = new Three.Mesh(geometry, material)
    this.sphere.position.set((this.perihelion + this.aphelion) / 2, 0, 0)
    this.sphere.name = this.name
    scene.add(this.sphere)
  }
  revolve() {
    const v = 2
    const p = this.sphere.position
    const theta = arctan(p.y / p.x)
    if(p.x>=0){
      this.sphere.position.x += v * sin(theta)
      this.sphere.position.y -= v * cos(theta)
    }else{
      this.sphere.position.x += v * sin(-theta)
      this.sphere.position.y += v * cos(theta)
    }
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

  renderer.render(scene, camera)

  // console.log(Earth.sphere.position.x)
  requestAnimationFrame(animate)
}
render()
animate()
