class Output {

    state = new Object(); 
    events = new Array();
    update = new Array();
    active = true;

    constructor( state ){
        for( let i in state ){
            this.state[i] = state[i];
        }
    }

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

        this.active = this.shouldUpdate(null,[this.state,newState]); 
        for( let i in newState ){ this.state[i] = newState[i];
            this.callback( i, oldState[i], newState[i] );
        }

    }

    get( item ){ return this.state[item] }

    shouldUpdate( callback,attr ){
        if( callback && typeof callback == 'function' )
            return this.update.push(callback);
        else if( callback && callback != 'function' )
            return console.error('callback should be a function');
        if( this.update.length == 0 ) return true;
        return this.update.some( x=>x(...attr) );
    }

    forceUpdate( item ){
        for( let i in this.events ){
            const field = this.events[i][0];
            if( this.events[i][0] == item )
                this.events[i][1](
                    this.state[field],
                    this.state[field]
                );
        }
    }

    callback( item, prev, act ){
        if( !this.active ) return 0; 
        for( let i in this.events ){
            if( this.events[i][0] == item )
                this.events[i][1]( prev,act );
        }
    }

    observeField( field,callback ){
        const id = this.eventID();
        const event = [field,callback,id];
        this.events.push(event); return id;
    }

    unObserveField( eventID ){
        for( let i in this.events ){
            if( this.events[i][2] == eventID ){
                this.events.splice(i,1);
                return true;
            }
        }   return false;
    }

    eventID(){
        const item = 'abcdefghijklmn0123456789'.split('');
        const result = new Array(); for( let i=64; i--; ){
            const index = Math.floor( Math.random()*item.length );
            result.push( item[index] );
        }   return result.join('');
    }

}

module.exports = Output;