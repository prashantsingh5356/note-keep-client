import React from "react";
import BASE_URL from "../serverInfo";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";

let months = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

function NoteBlock({
  isSelected,
  onClick,
  title,
  description,
  date,
  noteId,
  removeNote,
  updateNote,
  setUpdateHandler,
  updateIdHandler,
}) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;

  const deleteNoteHandler = async (id) => {
    console.log(id);
    await fetch(`${BASE_URL}/api/users/note/${id}`, {
      method: "DELETE", // HTTP method
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        removeNote(id);
      })
      .catch((err) => console.log(err));
  };

  const editNoteHandler = (id) => {
    updateNote(true);
    setUpdateHandler(true);
    updateIdHandler(id);
  };

  return (
    <div
      className={`w-[100%] min-h-[15vh] px-2 py-2 mb-4 rounded-lg ${
        isSelected === title ? "bg-gray-200" : "bg-slate-200/50"
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <p
          className={`font-bold text-xs ${
            isSelected === title ? "text-black" : "text-gray-400"
          }`}
        >
          {`${day} ${months[month]}`}
        </p>
        <div className="flex ">
          <BiSolidEditAlt
            className="mr-3"
            onClick={() => editNoteHandler(noteId)}
          />
          <AiFillDelete onClick={() => deleteNoteHandler(noteId)} />
        </div>
      </div>
      <h2
        className={`font-bold text-lg  my-2 ${
          isSelected === title ? "text-black" : "text-gray-400"
        }`}
      >
        {title}
      </h2>
      <p
        className={`font-bold text-sm ${
          isSelected === title ? "text-black" : "text-gray-400"
        } break-words`}
      >
        {description.length > 80
          ? description.slice(0, 80) + "..."
          : description}
      </p>
    </div>
  );
}

export default NoteBlock;
