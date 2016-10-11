/* jshint esversion:6 */
var fs = require('fs');//this makes it so we require the file system

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] === "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] === "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] === "rm") {
			//remove <filename>
			removeFile(inputSplit[1]);
		} else if (inputSplit[0] === "replace"){
			//replace  word
			replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] === "grep"){
			//print line containing word
			grepWord(inputSplit[1], inputSplit[2]);
		}
	}
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

//delete a file
function removeFile(fileName) {
    fs.unlink(fileName, function(err) {
        if (err) {
            console.log("Unable to delete file");
        } else {
            console.log("File deleted");
        }
    });
}

//replace  hello with goodbye file in and replacement word
//read file into an array of words
//if lower case returns hello, replace w/goodbye and push into temp array
//
function replaceWord(fileName, wordin, wordout){
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var arr2 = [];
		data = data.toString();
		var array = data.split(" ");
		for (var i in array) {
			if (array[i] === wordin) {
				arr2.push(wordout);
			} else {
				arr2.push(array[i]);	
			}
		}
		data = arr2.join(" ");
		//console.log(data);
		fs.writeFile(fileName, data, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Done!");
		});
	});
}


function grepWord(fileName, wordin){
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var splitLines = [];
		var splitWords = [];
		data = data.toString().split("\n");
		//console.log(data);
		//splitLines = data.split("\n");
		//console.log(data);
		for (var str of data) {
			//console.log(str);
			if (str.includes(wordin)){
				console.log(str);
			}
			//console.log(splitLines[i]);
			// splitWords = splitLines[i].split(" ");
			// for (var j in splitWords){
			// 	//console.log(splitWords[j]);
			// 	if (splitWords[j] === wordin) {
			//		console.log(splitLines[i]);
				//}
			}	
		
		
	// 	data = arr2.join(" ");
	// 	//console.log(data);
	// 	fs.writeFile(fileName, data, function(err) {
	// 		if (err) {
	// 			console.log(err);
	// 			return;
	// 		}
	// 		console.log("Done!");
	// 	});
	});
}



process.stdin.on('readable', useStdin);
//process.stdin.on('words.txt', catFile);


/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt


	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

