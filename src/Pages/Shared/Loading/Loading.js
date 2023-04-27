import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="radial-progress text-primary" style={{ "--value": 70 }}>
        70%
      </div>
    </div>
  );
};

export default Loading;
