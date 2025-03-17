import CircleCanvas from './CircleCanvas'
const Mem = ({ data }) => {
    const { freeMemory, totalMemory, usedMem, memUseage } = data;
  
    return (
      <div>
        <h2>Memory Information</h2>
        <p>Free Memory: {freeMemory} MB</p>
        <p>Total Memory: {totalMemory} MB</p>
        <CircleCanvas percentage={memUseage * 100}/> 
        <p>Used Memory: {usedMem} MB</p>
        <p>Usage: {memUseage}%</p>
      </div>
    );
  };
  
  export default Mem;
  