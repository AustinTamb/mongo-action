const core = require("@actions/core");
const { exec } = require("child_process");

const image_version = core.getInput("image_version");
const port = core.getInput("port");
const user = core.getInput("root");
const pass = core.getInput("pwd");

var command;
if (user && pass) {
  command = `sudo docker run -d -p ${port}:${port} mongo:${image_version} --auth -e MONGO_INITDB_ROOT_USERNAME=${user} -e MONGO_INITDB_ROOT_PASSWORD=${pass}`;
} else {
  command = `sudo docker run -d -p ${port}:${port} mongo:${image_version}`;
}

console.log("Executing the following command: ");
console.log(command);

dir = exec(command, function(err, stdout, stderr) {
  if (err) {
    core.setFailed(err.message);
  }
});
