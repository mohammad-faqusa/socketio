// the node program that captures local performance data 
// and sends it via socket to the server 
// req 
// socket.io-client 

const os = require('node:os');
const io = require('socket.io-client')
const options = {
    auth: {
        token: '2dasfasdfasdfasdfasd'
    }
}
const socket = io('http://127.0.0.1:3000',options)

socket.on('connect', ()=> {
    // console.log('we are connected to the server')
    // we need to identify this machine to the server, for front-end useage 
    // we could use, socket.id, random hash, ipAddress, 
    // what about macA? 
    const nI = os.networkInterfaces(); // list all the network interfaces on this machine 
    let macA; 
    //loop through all the network interfaces until we find the right oen 
    for (let key in nI){
        const isInternetFacing = !nI[key][0].internal; 
        if(isInternetFacing) {
            macA = nI[key][0].mac
            break; 
        }
    }
    const perfDataInterval = setInterval(async () => {
        const perfData = await performanceLoadData()
        perfData.macA = macA; 
        socket.emit('perfData', perfData); 
    }, 1000);

    socket.on('disconnect', ()=> {
        clearInterval(perfDataInterval); 
    })
})

const cpuAverage = () => {
    const cpus = os.cpus(); 
    //cpus is an array of all cores. We need the averageo f all the cores which 
    //will give us the cpu average.
    let idleMs = 0; //idle miliseconds 
    let totalMs = 0; //total milliseconds
    //loop through each core (thread)
    cpus.forEach(aCore => {
        for(mode in aCore.times){
            totalMs += aCore.times[mode]; 
        }
        //we need idle mode for this core added to idleMs 
        idleMs += aCore.times.idle; 
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}


const getCpuLoad = ()=> new Promise((resolve, reject) => {
    const cpus = os.cpus(); 
    const start = cpuAverage(cpus); 
    setTimeout(()=>{
        const end = cpuAverage(cpus); 
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;
        // console.log(idleDiff, totalDiff)
        // calculate the percentage the % of the used cpu 
        const percentOfCpu = 100 - Math.floor(100 * idleDiff/totalDiff); 
        resolve(percentOfCpu); 

    },100)
})
    
const performanceLoadData = () => new Promise(async (resolve, reject) => {
    const osType = os.type(); 

    const userInfo = os.userInfo()

    const upTime = os.uptime();

    const freeMemory = os.freemem();

    const totalMemory = os.totalmem(); 

    const usedMem = totalMemory - freeMemory; 

    const memUseage = Math.floor(usedMem/totalMemory*100)/100; 

    const cpus = os.cpus(); 

    const cpuType = cpus[0].model; 

    const numCores = cpus.length;

    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad(); 
    resolve({
        freeMemory,
        osType,
        userInfo, 
        upTime , 
        freeMemory, 
        totalMemory, 
        usedMem, 
        memUseage, 
        cpuType, 
        numCores, 
        cpuSpeed,
        cpuLoad
    })

})


const average = cpuAverage()
console.log('average', average)


const run = async()=> {
    const data = await performanceLoadData(); 
    console.log(data); 
}

run(); 