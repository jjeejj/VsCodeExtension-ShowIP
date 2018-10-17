const network = require('network');
const { promisify } = require('util');
const vscode = require('vscode');
class GetIP {
    constructor(_vscode) {
        // this.vscode = _vscode;
        this.init();
    }

    async init() {
        //statusBar，是需要手动释放的
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        let ips = await this.__getIp();
        console.log('ips',ips)
        this.statusBar.text = '内网IP: '+ips.local;
        this.statusBar.tooltip = '公网IP: '+ips.public;
        this.statusBar.show();
    }

    async __getIp() {
        try{
            let localTp = await promisify(network.get_private_ip)();
            let publicIp = await promisify(network.get_public_ip)();
            return {
                local: localTp,
                public: publicIp
            };
        }catch(err){
            console.log('获取 ip 信息失败', err);
            this.dispose();
        };   
    }
    dispose() {
        // this.disposable.dispose();
        this.statusBar.dispose();
    }
}

module.exports = GetIP;