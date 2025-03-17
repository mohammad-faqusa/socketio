import moment from 'moment'; 

const Info = ({ data }) => {
    const { osType, upTime, userInfo } = data;

    return (
      <div>
        <h2>System Information</h2>
        <p>OS Type: {osType}</p>
        <p>Uptime: {upTime} seconds</p>
        <h3>User Info:</h3>
        <p>Username: {userInfo?.username}</p>
        <p>Home Directory: {userInfo?.homedir}</p>
        <div>{moment.duration(data.upTime).humanize()}</div> 
        
      </div>
    );
  };
  
  export default Info;
  