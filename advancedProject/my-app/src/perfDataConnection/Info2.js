
const Info2 = ({ data }) => {
    const { osType, upTime, userInfo } = data;

    return (
      <>
        <div></div>
        <div className="circle">
            <div className="circle-label">upTime</div>
            <span>{upTime}%</span>
        </div>
      </>
    );
};

export default Info2;
