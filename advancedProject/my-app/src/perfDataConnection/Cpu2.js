
  
  const Cpu = ({ data }) => {
    const { cpuLoad, cpuType, numCores, cpuSpeed } = data;

    return (
      <>
        <div className="circle">
            <div className="circle-label">cpuLoad</div>
            <span>{cpuLoad}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">cpuType</div>
            <span>{cpuType}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">numCores</div>
            <span>{numCores}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">cpuSpeed</div>
            <span>{cpuSpeed}%</span>
        </div>
      </>
    );
};

export default Cpu;
