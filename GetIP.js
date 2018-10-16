const os = require('os');
const http = require('axios');
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
        this.statusBar.text = '内网IP: '+ips.localIpV4;
        this.statusBar.tooltip = '公网IP: '+ips.public;
        this.statusBar.show();
    }

    async __getIp() {
        try{
            // The code you place here will be executed every time your command is executed
            // let log = vscode.window.createOutputChannel("getIp/log");
            let networkInterfaces = os.networkInterfaces(); //网卡信息
            let localEth0Info = {};
            networkInterfaces.en0.forEach((value, index) => {
                if(value.family.toLocaleLowerCase() == 'ipv4'){
                    localEth0Info.ipv4 = value.address;
                };
                if(value.family.toLocaleLowerCase() == 'ipv6'){
                    localEth0Info.ipv6 = value.address;
                };
            });

            // let publicIp = ip.address();
            let res = await http.get('http://ip.taobao.com/service/getIpInfo.php?ip=myip');
            let publicIpInfo = res.data, publicIp = publicIpInfo.data.ip;

            return {
                localIpV4: localEth0Info.ipv4,
                localIpV6: localEth0Info.ipv6,
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