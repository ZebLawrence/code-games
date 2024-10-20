import os from 'os';

const drawObjectTable = (objectName, obj) => {
    console.log(objectName)
    for (let key in obj) {
        console.log(key);
        console.table(obj[key]);
    }
}

const recurseObject = (obj) => {
    for (let key in process) {
        console.log(key);
        const val = process[key]
        if (typeof val === 'object') {
            console.table(val)
        } else if (typeof val !== 'function') {
            console.log(`${key}: ${val}`)
        }
    }
}

const osInfo = {
    arch: os.arch(),
    endianness: os.endianness(),
    freemem: os.freemem(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    tmpdir: os.tmpdir(),
    totalmem: os.totalmem(),
    type: os.type(),
    uptime: os.uptime(),
};

const cpuInfo = os.cpus()
const loadAvgs = os.loadavg()
const networkInterfaces = os.networkInterfaces()
const userInfo = os.userInfo()
const memInfo = process.memoryUsage()

console.log(`/*********************************/
            Craxy Stuff yo
/*********************************/
`)
console.warn('OS Info')
console.table(osInfo);

drawObjectTable('CPU Info', cpuInfo)

console.warn('Load Averages')
console.table(loadAvgs);

drawObjectTable('Network Interfaces', networkInterfaces)

console.warn('User Info')
console.table(userInfo)

console.log('Heap Utilization');
for (let key in memInfo) {
    console.log(`${key}:`, Math.round(memInfo[key] / (1024 * 1024)), 'MB');
}

