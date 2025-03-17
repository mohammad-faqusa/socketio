import './App.css';
import socket from './utilities/socketConnection';
import { useEffect, useState } from 'react';
import Widget from './perfDataConnection/Widget';

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    const handlePerfData = (data) => {
      setPerformanceData(prevData => ({ ...prevData, ...data }));
    };

    socket.on('perfData', handlePerfData);

    return () => {
      socket.off('perfData', handlePerfData);
    };
  }, []);

  return (
    <div className="App">
      <Widget data={performanceData} />
    </div>
  );
}

export default App;
