import React from "react";

function page() {
  return (
    <main className="bg-white w-full min-h-screen homeLayout pt-28 px-56 gap-12 text-gray-800 flex justify-start flex-col">
      <div className="w-full h-52 bg-slate-100 rounded-md p-5 flex flex-col gap-y-5">
        <p>
          As per Indian factory act, The person who has control over the affairs
          of factory is known as -------
        </p>
        <div className="w-full flex flex-col gap-5">
          <div className="flex">
            <p className="w-[60%]">A.Employee</p>
            <p className="w-[60%]">A.Employee</p>
          </div>
          <div className="flex">
            <p className="w-[60%]">A.Employee</p>
            <p className="w-[60%]">A.Employee</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
