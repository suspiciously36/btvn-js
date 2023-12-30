import { mindmapApi } from "@/redux/services/mindmapApi";
import Link from "next/link";

const NewlyCreatedMindmap = () => {
  const {
    data: mindmapData,
    isLoading,
    error,
  } = mindmapApi.useGetMindmapQuery();
  return (
    <div>
      {mindmapData?.map(({ id, title, description, createdAt }) => (
        <div
          key={id}
          className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg"
        >
          <div className="w-1/6 text-center">
            <input type="checkbox" />
          </div>
          <div className="w-1/2">
            <div className="flex items-center">
              <div className="ml-4">
                <span className="capitalize block text-gray-800">
                  <a href="/my-mindmap/mindmapflow">{title}</a>
                </span>
                <span className="text-sm block text-gray-600">
                  {description}
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <span className="text-gray-600 text-sm">{createdAt}</span>
          </div>
          <div className="w-1/4">
            <a href="/my-mindmap/mindmapflow">
              <span className="text-gray-600 text-sm px-2">
                <i className="fa-solid fa-pen-to-square" />
              </span>
            </a>
            <span className="text-gray-600 text-sm px-2">
              <i className="fa-solid fa-trash" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewlyCreatedMindmap;
