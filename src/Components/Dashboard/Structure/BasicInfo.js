import React, { useState, useEffect } from "react";
const BasicInfo = ({ allQuestion, count }) => {
  const [level, setLevel] = useState("");
  return (
    <div className="w-[90%] flex flex-col h-56 md:h-64 md:w-96 bg-primary-light  shadow-light-shadow rounded-lg">
      <p className="text-center text-2xl pt-2">Question stats</p>
      <div className="flex w-full h-full ">
        <div className="w-2/4 h-full flex flex-col justify-center items-center">
          <div className="w-[130px] h-[130px] flex flex-col justify-center items-center rounded-full border-8 border-primary shadow-light-shadow">
            <div className="w-10 text-center">
              <p className="text-2xl text-easy">0</p>
              <hr />
            </div>

            <div>{allQuestion.total_count}</div>
          </div>
        </div>
        <div className="w-2/4 h-full flex flex-col items-center justify-center gap-2">
          <div className="w-full">
            <div className="flex w-full justify-between px-3 gap-4">
              <p className="text-easy"> Easy </p>
              <p>0/{count.easy}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-between px-3 gap-4">
              <p className="text-medium">Medium</p>
              <p>0/{count.medium}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-between px-3 gap-4">
              <p className="text-hard">Hard</p>
              <p>0/{count.hard}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-between px-3">
              <p className="text-empty">Not decided</p>
              <p>0/{count.empty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
