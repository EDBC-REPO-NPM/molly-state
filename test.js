const state = require('./main.js');

ppt = new state({
    "v1": 10,
    "v2": "hola mundo",
    "v3": 1000.50
});

ppt.on("v1",( prv, act )=>{
    console.log( `event:> prv: ${prv}, act: ${act}` );
}); 

ppt.on("v2",( prv, act )=>{
    console.log( `event:> prv: ${prv}, act: ${act}` );
}); 

ppt.on("v3",( prv, act )=>{
    console.log( `event:> prv: ${prv}, act: ${act}` );
}); 

ppt.set( (state)=>({
    "v1": state["v1"]+10,
    "v2": "adios mundo",
    "v3": 10
}));

ppt.set({ "v1": 50 });