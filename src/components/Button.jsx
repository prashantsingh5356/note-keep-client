import React from 'react'
import FolderDropdown from "./FolderDropdown";

function Button({icon, buttonName, onClick, isMore}) {
  return (
    <div
      className="flex z-50 bg-[#ffffff] py-4 px-4 justify-between items-center rounded mt-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}

        <h4 className="ml-4 break-words text-sm font-medium">{buttonName}</h4>
      </div>

      {isMore && <FolderDropdown folderName={buttonName} />}
    </div>
  );
}

export default Button