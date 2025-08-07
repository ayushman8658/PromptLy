import React from "react";
import { BiSolidBot } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
const navbar = () => {
  return (
    <div>
      <div className="nav flex items-center justify-between  h-[100px] px-[150px]">
        <div className="log flex items-center gap-[10px]">
          <i className="text-[50px]">
            <BiSolidBot />
          </i>
          <h3 className="text-[25px] font-[700] text-purple-500">PromptLy</h3>
        </div>
        <div className="user">
            <i className="text-[30px] cursor-pointer"><FaRegUser /></i>
        </div>
      </div>
    </div>
  );
};

export default navbar;
