import * as Three from 'three'
const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000)
const renderer = new Three.WebGLRenderer()

class Star{
  radius:Number
  color:String  
  constructor(radius,color){
    this.radius = radius
  }
}

class Planet{
  radius:Number //半径km
  color:String
  perihelion:Number //近日点km
  aphelion:Number //远日点km
  synodicPeriod:Number //会合周期day
  obitalPeriod:Number //公转周期day
  constructor(radius,color,perihelion,aphelion,synodicPeriod,obitalPeriod){
    this.radius = radius
    this.color = color
    this.perihelion = perihelion
    this.aphelion = aphelion
    this.synodicPeriod = synodicPeriod
    this.obitalPeriod = obitalPeriod
  }
}

const Sun = new Star(6.957e8,'red')
const Mercury = new Planet(2438.7,'grey',4.6e10,6.98e10,115.88,87.9691)
const Venus = new Planet(6051.8,'white',107.5e6,108.9e9,583.92,224.701)
const Earth = new Planet(6371,'blue',147.095e6,152.1e6,1,365.26)
const Mars = new Planet(3389.5,'orange',206.7e6,249.2e6,779.96,686.971)
const Jupiter = new Planet(69911,'rgb(146,135,116)',740.52e6,916.62e6,398.88,4332.59)
const Saturn = new Planet(58232,'yellow',1352.55e6,1514.50e6,378.09,10759.22)
const Uranus = new Planet(25362,'whiteblue',2742e6,3008e6,369.66,30688.5)
const Neptune = new Planet(24622,'lightblue',4.46e9,4.54e9,367.49,60182)
