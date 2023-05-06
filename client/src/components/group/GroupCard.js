import React from "react";

const GroupCard = ({ group }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-1/2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.name}</div>
        <p className="text-gray-700 text-base">{group.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #{group.category}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {group.members} members
        </span>
      </div>
    </div>
  );
};

export default GroupCard;
