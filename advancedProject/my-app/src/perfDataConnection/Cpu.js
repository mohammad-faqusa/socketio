const Cpu = ({ data }) => {
    const { cpuLoad, cpuType, numCores, cpuSpeed } = data;
  
    return (
      <div>
        <h2>CPU Information</h2>
        <p>Load: {cpuLoad}%</p>
        <p>Type: {cpuType}</p>
        <p>Cores: {numCores}</p>
        <p>Speed: {cpuSpeed} GHz</p>
      </div>
    );
  };
  
  
  export default Cpu;
  