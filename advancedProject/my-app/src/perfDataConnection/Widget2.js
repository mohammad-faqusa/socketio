import React from 'react';
import Cpu2 from "./Cpu2";
import Mem2 from "./Mem2";
import Info2 from "./Info2";
import './Widget.css';  // Import the CSS file

const Widget = ({ data }) => {
    const {
        freeMemory,
        osType,
        userInfo, 
        upTime,
        totalMemory, 
        usedMem, 
        memUseage, 
        cpuType, 
        numCores, 
        cpuSpeed,
        cpuLoad
    } = data; 

    const cpuData = { cpuLoad, numCores, cpuSpeed, cpuType };
    const memData = { freeMemory, totalMemory, usedMem, memUseage }; 
    const infoData = { osType, userInfo, upTime };

    return (
        <div className="widget">
            <h1>System Information</h1>
            <div className="widget-grid">
                <Cpu2 data={cpuData} />
                <Mem2 data={memData} />
                <Info2 data={infoData} />
            </div>
        </div>
    );
}

export default Widget;
