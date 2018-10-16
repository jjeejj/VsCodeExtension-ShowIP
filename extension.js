
const vscode = require('vscode');
const GetIP = require('./GetIP.js');

async function activate(context) {
    
    let getIpIns = new GetIP(vscode);
    // let getIpDispose = vscode.commands.registerCommand('extension.getIp',getIpIns.getIp);

    // getIpIns.init();

    // context.subscriptions.push(getIpDispose);
};
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate(context) {
    context.getIpButtonStatusBarItem.dispose();
};
exports.deactivate = deactivate;