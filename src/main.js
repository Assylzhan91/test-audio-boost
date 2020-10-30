let user = {
  name: "John",
  age: 30,

  // toString() {
  //   return `{name: "${this.name}", age: ${this.age}}`;
  // }
  toString()!!2 A};




console.log(user + 1)

/*
let date = new Date()
console.log(date.getFullYear())
console.log(date.getMonth())
console.log(date.getDate())



let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};


function count(obj){
    for( let [value, key] of Object.entries(obj)){
      console.log(`Value: ${value} === Key: ${key}`)
    }
}


let someMap = new Map()
someMap.set = ('key', 'Value')
someMap.set = ('key2', 'Value2')


console.log(someMap)
// count(salaries)




function sumSalaries(salaries){
  let res = 0
  for(let salary of Object.values(salaries)){
      res = res + salary
  }


  return res
}


let output =  sumSalaries (salaries)
console.log(output)

let obj = {}

obj = new Proxy(obj, {
  get (target, prop){
    console.log(prop, 'Proxy')
    return prop
  }
})


obj.test  = "Hello"
obj.isShowed  = true


console.log(obj.test)

// for(let key in proxy) console.log(key)



function foo1(callback){
  setTimeout(()=>{
    console.log('foo1')
    callback()
  }, 2000)
}

let cb = ()=> console.log('CALLBACK')

foo1(cb)*/



/*
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/scss/bootstrap-grid.scss'
import './css.css'
import './scss/main-app.sass'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
*/

/*
function someScript(){
  console.time('time')
  for(let i = 0; i < 2000000000; i++){
    i / 3
  }
  console.timeEnd('time')
}

function someScript2(){
  console.log('someScript2')
}


someScript()
someScript2()






window.addEventListener('DOMContentLoaded', ()=>{
  let app = document.getElementById('app')

  let button = document.createElement('button')
  let div = document.createElement('div')
  div.style.width = 20 + 'px'
  div.style.height = 20 + 'px'
  div.style.position = 'absolute'

  div.style.backgroundColor = 'red'
  button.innerHTML = 'Btn'
  button.style.width = 150 + 'px'
  button.style.height = 150 + 'px'
  button.style.position = 'relative'
  app.appendChild(button)
  button.appendChild(div)

  button.addEventListener('click', (e)=>{
    // console.log(e.clientX)
    // console.log(e.clientY)

    if(parseInt(div.style.left) >= (e.clientX - 23)){
      console.log(parseInt(div.style.left), e.clientX)
      // console.log(parseInt(div.style.top), e.clientY)
    }
    // console.log(div.style.left)
    div.style.left = (e.clientX - 10) + 'px'
    div.style.top = (e.clientY- 10) + 'px'
    // div.style.transition = '1s'
  })

})


let spinner = '<div class="lds-facebook"><div></div><div></div><div></div></div>'
let ldsFacebook;



let  style = true
let app =  document.getElementById('app')

window.addEventListener('DOMContentLoaded', function (e){

  console.log('DOMContentLoaded')
})

window.addEventListener('beforeunload', function (e){
  console.log('beforeunload')
  alert(1)
})
window.addEventListener('unload', function (e){
  console.log('unload')
  alert(1)
})



let recipeMap = new Map([
  ["огурец", 500],
  ["помидор", 350],
  ["лук",    50]
]);

function splitArr(arr){
  let [var1, var2] =  arr.split(' ')

  return {
    [var1]: var2
  }
}
let objs = []

for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
  // console.log(entry)
  objs.push(splitArr(entry.join(' ')))
}

console.log(objs)


let army = {
  minAge: 18,
  maxAge: 27,
  canJoin: function (user){
    return user.age >= this.minAge && user.age < this.maxAge;
  }
}

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];
let soldiers = users.filter(army.canJoin, army)
console.log(soldiers)




let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"}
];

let res =  users.findIndex((item, idx) => idx === 1)


class CreateTag{
  constructor(tag) {
    this.tag = tag
  }
  appendChild(){
    console.log(this.tag.arguments)
  }
  defaultSize(){

  }

}

let arr = new CreateTag(1, 2, 3, 4, 5)
console.log(arr.appendChild())



class CreateTag{
  constructor(tag) {
    this.tag = document.createElement(tag.name)
    this.className = this.tag.classList.add(tag.className || 'default')
    this.tag.style.backgroundColor = tag.bgColor
    this.tag.innerHTML = tag.text
  }
  appendChild(append){
    append.appendChild(this.tag)
  }
  defaultSize(width, height){
    if(height == undefined){
      this.tag.style.width  = width + 'px'
      this.tag.style.height  = width + 'px'
      return
    }
    this.tag.style.width = width  + 'px'
    this.tag.style.height = height + 'px'
  }


    set(value){
        return value
    }
}


class Button extends CreateTag{
  constructor(tag) {
    super(tag)
  }

  eventAct(event){
    this.tag.addEventListener(event, this.someEvent)
  }

  someEvent(e){
    console.log(e.target)
  }
}

class Timer extends Button{
  constructor(tag) {
    super(tag)
  }

  start(){
    let date = new Date()
    console.log(date)
    this.tag.innerHTML = date
    return date
  }
  stop(){
    this.tag.innerHTML = ''
  }

  someEvent(){
    this.start()
    this.tag.innerHTML = this.start()
  }
}


let div = new CreateTag({name: 'div', text: 'Hello', bgColor: 'green'})
let app = document.getElementById('app')
div.appendChild(app)
div.defaultSize(150)

let button = new Button({name: 'button', text: 'Button',  className: 'btn'})
let button2 = new Timer({name: 'button', text: 'Button2',  className: 'btn'})
button2.appendChild(app)
button2.eventAct('click')
button2.someEvent()
button2.start()
button.appendChild(app)
button.defaultSize(90, 40)
button.eventAct('click')



function curry(f){
  return (a) => {
    return (b)=> {
      return f(a, b)
    }
  }
}




class Person{
  constructor(dates) {
    this.name = dates.name
    this.age = dates.age
  }
  sayHi(){
    console.log(this.name + " said: Hello")
  }
  sayBye(){
    console.log(this.name + " said: Bye")
  }
}




class Man extends Person{
  constructor(name) {
    super(name);
  }
  sayHi() {
    // super.sayHi()
    console.log(this.name +  ' JUSt say')
  }
}


let man1 = new Man({name: 'John', age: '12'})

man1.sayBye()

let blockAbout =  document.querySelector('.about')
let topTag =   parseInt(blockAbout.style.top)





window.addEventListener('scroll', (event)=>{
  let scrollYCustom =  Math.trunc(window.scrollY)
  if(Math.trunc(window.scrollY) < topTag){

    blockAbout.style.top =  topTag - scrollYCustom + 'px'
  }else{
    // console.log(blockAbout.style.top)
  }else if (Math.trunc(window.scrollY) >= topTag){
    blockAbout.style.top =  topTag + scrollYCustom + 'px'
  }
})


/*
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};


console.log(menu)


function multiplyNumeric(obj){
  for(let key in  obj){
    if(typeof obj[key] === 'number'){
      obj[key] = obj[key] *2
    }
  }
}
multiplyNumeric(menu)

console.log(menu)



let user = { name: "Иван" };
console.log(user)
let admin = user;

console.log(admin.name === user)

let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();



function User(name = "Hello") {
  console.log(new.target)
 this.name = name;
  this.isAdmin = false;
}

function BigUser() {

  this.name = "Вася";

  return { name: "Godzilla" };  // <-- возвращает этот объект
}
console.log(new BigUser().name)

*/
