/* eslint-disable react/prop-types */
const Loading = ({open}) => {
  return (
    <div className="">
      <div  className={`loading flex justify-center transition-all duration-200 items-center ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div>
          <div className="outerCircle" />
          <div className="innerCircle" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
