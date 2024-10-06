const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

// Directory path where the .js files are located
const directoryPath = __dirname; // Change this to your desired directory if needed

// Function to obfuscate JavaScript files in a directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  // Filter .js files, exclude 'index.js', and obfuscate them
  files
    .filter((file) => file.endsWith(".js") && file !== "index.js")
    .forEach((file) => {
      // Read the content of the .js file
      fs.readFile(path.join(directoryPath, file), "utf8", (err, data) => {
        if (err) {
          console.log(`Error reading file ${file}:`, err);
          return;
        }

        // Obfuscate the JavaScript content
        const obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
          compact: false,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArrayShuffle: true,
          splitStrings: true,
          stringArrayThreshold: 1,
        });

        // Create the new obfuscated file with 'obfuscated-' prefix
        const newFileName = `obfuscated-${file}`;
        fs.writeFile(
          path.join(directoryPath, newFileName),
          obfuscationResult.getObfuscatedCode(),
          (err) => {
            if (err) {
              console.log(`Error writing to file ${newFileName}:`, err);
            } else {
              console.log(
                `File ${newFileName} created and obfuscated successfully!`
              );
            }
          }
        );
      });
    });
});
