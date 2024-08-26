"use client";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const DashboardSidebar = () => {
  return (
    <div
      id="sidebar-mini"
      className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-20 bg-white border-e border-gray-200 sm:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="flex flex-col justify-center items-center gap-y-2 py-4">
        <div className="mb-4">
          <Link href="/admin/dashboard">
            <div className="font-extrabold text-3xl bg-slate-950 text-white px-3 py-1.5 rounded-md">
              D
            </div>
          </Link>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="hs-tooltip [--placement:right] inline-block">
                <Link href="/admin/dashboard">
                  <div className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <HomeOutlinedIcon className="text-gray-500 " />
                    <TooltipContent side="right">
                      <p>Home</p>
                    </TooltipContent>
                  </div>
                </Link>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="hs-tooltip [--placement:right] inline-block">
                <Link href="/admin/dashboard/test">
                  <div className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <PostAddOutlinedIcon className="text-gray-500 " />
                    <TooltipContent side="right">
                      <p>Test</p>
                    </TooltipContent>
                  </div>
                </Link>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="hs-tooltip [--placement:right] inline-block">
                <Link href="/admin/dashboard/orders">
                  <div className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <AddBusinessOutlinedIcon className="text-gray-500 " />
                    <TooltipContent side="right">
                      <p>Orders</p>
                    </TooltipContent>
                  </div>
                </Link>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="hs-tooltip [--placement:right] inline-block">
                <Link href="/admin/dashboard/users">
                  <div className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <PeopleOutlineOutlinedIcon className="text-gray-500 " />
                    <TooltipContent side="right">
                      <p>Users</p>
                    </TooltipContent>
                  </div>
                </Link>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardSidebar;
