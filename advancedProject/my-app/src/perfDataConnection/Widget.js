import Cpu from "./Cpu"
import Mem from "./Mem"
import Info from "./Info"
const Widget = ({data}) => {
    
    const {
        freeMemory,
        osType,
        userInfo, 
        upTime ,
        totalMemory, 
        usedMem, 
        memUseage, 
        cpuType, 
        numCores, 
        cpuSpeed,
        cpuLoad
    } = data; 

    const cpuData = { cpuLoad, numCores, cpuSpeed, cpuType }
    const memData = {freeMemory, totalMemory, usedMem, memUseage} 
    const infoData = {osType, userInfo, upTime } 

    return (
         
        <div className="widget row justify-content-evenly">
            <h1>Widget</h1>
            <Cpu data={cpuData}/>
            <Mem data={memData}/>
            <Info data={infoData}/>
        </div>
    
        
    )
}

export default Widget