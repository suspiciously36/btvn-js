"use client";

import { mindmapApi } from "@/redux/services/mindmapApi";
import Link from "next/link";
import { useState } from "react";
import NewlyCreatedMindmap from "./components/NewlyCreatedMindmap";

const MyMindmap = () => {
  const [mindmap, setMindmap] = useState({});
  const [addMindmap, result] = mindmapApi.useAddNewMindmapMutation();
  const handleClick = (e) => {
    e.preventDefault();
    addMindmap({ mindmap });
  };
  return (
    <div className="container px-4 mx-auto">
      <div className="text-start">
        <h1 className="text-3xl md:text-4xl font-medium my-2">
          Mindmap của tôi
        </h1>
        <div className="py-4">
          <Link
            onClick={handleClick}
            className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
            href="/my-mindmap/"
          >
            Thêm mới
          </Link>
        </div>
        <div className="py-4">
          <div className="flex items-center py-2">
            <span className="w-1/6 text-center">
              <input type="checkbox" />
            </span>
            <span className="w-1/2">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Tên
              </span>
            </span>
            <span className="w-1/4">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Tạo lúc
              </span>
            </span>
            <span className="w-1/4">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Hành động
              </span>
            </span>
          </div>
        </div>
      </div>
      <NewlyCreatedMindmap />
    </div>
  );
};

export default MyMindmap;
