const spawn = require('child_process').spawn;
const process = spawn('python', ['tokenizeWaka.py', '暖かや背の子の言葉聞きながし']);

// const tokenizeWaka = function (waka) {
	
	process.stdout.on('data', function(data) {
		//pipe back to the waka
		console.log(data);
	});

	process.on('exit', function(code){
  		console.log(code);
	});

	// process.stdin.write(JSON.stringify(waka));

	// process.stdin.end();
// }

// export default tokenizeWaka;
// module.exports = tokenizeWaka;