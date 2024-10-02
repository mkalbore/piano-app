const fs = require("fs");
const path = require("path");

// Function to list files in a directory
function listFilesInDirectory(directoryPath) {
	// Read the directory contents
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			return console.error(`Unable to scan directory: ${err}`);
		}

		// Display the list of files
		console.log("Files in directory:");
		files.forEach(file => {
			// Print file names
			console.log(file);
		});
	});
}

// Specify the directory you want to check
const directoryPath = path.join(__dirname, "public/sounds"); // Change 'your-folder-name' to your folder name

// Call the function to list files
listFilesInDirectory(directoryPath);
