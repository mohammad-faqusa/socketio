const Mem = ({ data }) => {
    const { freeMemory, totalMemory, usedMem, memUseage } = data;

    return (
      <>
        <div className="circle">
            <div className="circle-label">freeMemory</div>
            <span>{freeMemory}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">totalMemory</div>
            <span>{totalMemory}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">usedMem</div>
            <span>{usedMem}%</span>
        </div>
        <div className="circle">
            <div className="circle-label">memUseage</div>
            <span>{memUseage}%</span>
        </div>
      </>
    );
};

export default Mem;
