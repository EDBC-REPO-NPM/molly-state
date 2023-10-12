# molly-state

molly-state is a lightweight package for controlling objects as states in Node.js. It provides a simple and intuitive API for observing changes to objects and triggering events based on those changes.

## Installation

You can install molly-state using npm:

```
npm install molly-state
```

## Usage

To use molly-state, simply require the package and create an observer object:

```javascript
const state = require('molly-state');

ppt = new state({
    "v1": 10,
    "v2": "hello world",
    "v3": 1000.50
});

ppt.on("v1",( prv, act )=>{
    console.log( `event:> prv: ${prv}, act: ${act}` );
}); 

ppt.set({ "v1": 50 });
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

molly-state is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.