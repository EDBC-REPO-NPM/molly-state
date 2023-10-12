const Event = require("events");

class Output {

    state = new Object();
    obsrv = new Event();

    /*---------------------------------------------------------*/

    constructor( state ){
        for( let i in state ) this.state[i] = state[i];
    }

    /*---------------------------------------------------------*/

    set( state ){ let newState;
        
        const oldState = new Object();
        const keys = Object.keys(this.state);
        keys.map(x=>{ oldState[x]=this.state[x] });

        if( typeof state == 'function' ){
            newState = state( this.state ); const validator = [
                [!newState,'state is empty, please set a return state'],
                [typeof newState != 'object','state is not an object, please return a valid Object'],
            ];  if( validator.some(x=>{ if(x[0]) console.error(x[1]); return x[0] }) ) return 0;
        } else if( !state || typeof state != 'object' ) { 
            return console.error('state is not an object, please return a valid Object') 
        } else { newState = state; } 

        for( let i in newState ){ this.state[i] = newState[i];
            this.obsrv.emit( i, oldState[i], newState[i] );
        }

    }

    /*---------------------------------------------------------*/

    off( ...args ){ return this.obsrv.off( ...args ); }

    on( ...args ){ return this.obsrv.on( ...args ); }

    get( item ){ return state[item]; }

    /*---------------------------------------------------------*/

}

module.exports = Output;