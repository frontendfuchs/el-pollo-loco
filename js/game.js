import { World } from '../models/world.class.js';

let canvas;
let world;

function init(){
    canvas =document.getElementById('canvas');
    world = new World(canvas);
    window.world = world;

    console.log('My Character is', world.character); 
}

init();

