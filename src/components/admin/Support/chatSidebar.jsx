import React, { useEffect } from "react";

const Sidebar = ({ Users, selectuser }) => {

  const userSelect = (userId,username) => {
    selectuser(userId,username);
  };

  return (
    <div className="max-w-2xl h-screen w-96">
      <div className=" py-4 h-screen  bg-blue-900">
        <ul className="px-3">
          <li className="text-3xl font-semibold text-white">QuickServe</li>
          <li className="text-2xl font-semibold text-yellow-400">Support Panel</li>
        </ul>
        <div className="h-[94%] overflow-auto ">
        <ul className="mt-10 ">
          {Users &&
            Users.map((item) => (
              <li
                key={item._id}
                onClick={() => userSelect(item._id,item.username)}
                className="flex items-center  my-2 py-2 mr-2 rounded-r-lg bg-black text-white"
              >
                <img
                  className="w-10 h-10 rounded-full mr-3"
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  alt="Profile"
                />
                <span className="rounded items-center flex ">{item.username}</span>
              </li>
            ))}
        </ul>
        </div>
       
      </div>
    </div>
  );
};

export default Sidebar;
