const core = require('@actions/core');
const ftpDeploy = require("ftp-deploy");

async function run() {
  try {
    const server = core.getInput('server');
    const user = core.getInput('user');
    const password = core.getInput('password');
    const localRoot = core.getInput('localRoot');
    const remoteRoot = core.getInput('remoteRoot');

    const config = getConfig(server, user, password, localRoot, remoteRoot);

    const ftp = new ftpDeploy();

    console.log(`Executing FTP deploy to server ${server} ...`);

    ftp.deploy(config)
        .then(result => {
          console.log('FTP deploy finished successfully with result: ', result);
          core.setOutput('result', true);
        })
        .catch(error => {
          console.log('FTP deploy failed with error: ', error);
          core.setFailed(error);
        });
  }
  catch (error) {
    console.log('Action failed with error: ', error);
    core.setFailed(error.message);
  }
}

run();

function getConfig(server, user, password, localRoot, remoteRoot) {
  return {
    user: user,
    password: password,
    host: server,
    port: 21,
    localRoot: localRoot,
    remoteRoot: remoteRoot,
    include: ["*"],
    exclude: [],
    deleteRemote: true,
    forcePasv: true
  };
}
