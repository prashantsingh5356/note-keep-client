import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import NoteBlock from "../components/NoteBlock";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../slices/userAuthSlice";
import BASE_URL from "../serverInfo";
import Alert from "../util/Alert";
import MyModal from "../components/AddFolderModal";
import AddNoteModal from "../components/AddNoteModal";

import {
  setFolder,
  clearFolderName,
  addFolderName,
  setSelectedFolderName,
} from "../slices/userFolderSlice";
import ViewNotes from "../components/ViewNotes";

const HomeScreen = () => {
  const folders = useSelector((state) => state.folder.folder);
  const folderName = useSelector((state) => state.folder.selectedFolder);

  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    title: "select note to view title",
    description: "select note to view details",
  });
  let [userData, setUserData] = useState({});
  let [alertMessage, setAlertMessage] = useState("");
  let [alertType, setAlertType] = useState("");
  let [isAddFolderOpen, setIsAddFolderOpen] = useState(false);
  let [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  let [updateNote, setUpdateNote] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchUserNotes(folderName);
  }, [folderName]);

  function showAlertPopup(alertMsg, type) {
    setAlertMessage(alertMsg);
    setAlertType(type);

    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 2000);
  }

  const handleAddNote = () => {
    setIsAddNoteOpen(true);
  };

  function closeModal() {
    setIsAddFolderOpen(false);
  }

  async function fetchUserDetails() {
    let userID = localStorage.getItem("_id");

    await fetch(`${BASE_URL}/api/users/${userID}`)
      .then((res) => res.json())
      .then((result) => {
        setUserData(result?.data?.[0]);
        dispatch(setFolder(result?.data?.[0].userFolders));
      })
      .catch((err) => console.log("Error -> fetchUserDetails:", err));
  }

  async function fetchUserNotes(queryType) {
    let userID = localStorage.getItem("_id");

    await fetch(`${BASE_URL}/api/users/note/${userID}?type=${queryType}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("fetchUserNotes result", result);
        setNotes(result?.data);
      })
      .catch((err) => console.log("Error -> fetchUserDetails:", err));
  }

  async function addUserFolder(folderName) {
    let userID = localStorage.getItem("_id");

    if (folderName.length === 0) {
      showAlertPopup("Enter valid folder name", "warning");
      throw new Error("Enter Folder name");
    }

    await fetch(`${BASE_URL}/api/users/`, {
      method: "PATCH", // HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, id: userID }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("addUserFolder", result);
        if (result.message === "fail") throw new Error("practice more");
        dispatch(addFolderName(folderName));
      })
      .catch((err) => console.log("Error -> addUserFolder:", err));
  }

  async function addNewNote(title, description, type) {
    let userID = localStorage.getItem("_id");

    if (title.length == 0 || description.length == 0 || !type) {
      return showAlertPopup("please select type of document", "warning");
    }

    await fetch(`${BASE_URL}/api/users/note`, {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: userID,
        type: type,
        title: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("addUserFolder", result);
        setNotes((prevNotes) => [...prevNotes, result.data.document]);
      })
      .catch((err) => console.log("Error -> addUserFolder:", err));
  }

  const updateNoteHandlerfunction = async (title, description) => {
    const updateId = updateNoteId;
    const dataObj = {};

    const note = notes.filter((n) => n._id === updateId);

    if (title) dataObj.title = title;
    if (description) dataObj.description = description;

    await fetch(`${BASE_URL}/api/users/note/${updateId}`, {
      method: "PATCH", // HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("update note", result);
        fetchUserNotes(folderName);
      })
      .catch((err) => console.log("Error -> updated note:", err));
  };

  async function logOut() {
    dispatch(clearToken(localStorage.clear("auth")));
    location.reload();
  }

  const removeNoteHandler = (id) => {
    const updatednoteArr = notes.filter((note) => note._id !== id);
    setNotes(updatednoteArr);
    setCurrentNote({
      title: "select note to view title",
      description: "select note to view details",
    });
  };

  return (
    <div className="flex w-screen h-screen bg-gray-200">
      {/* Left Column */}
      <div className="w-[20%] h-screen bg-[#f6f6f6] p-4 flex flex-col justify-between">
        <div className="mb-6 max-h-[80vh]">
          <h2 className="text-[1rem] font-semibold">
            Welcome{" "}
            {Boolean(userData?.userName)
              ? userData?.userName.length > 10
                ? userData?.userName.slice(0, 10) + "..."
                : userData?.userName
              : "Anonymous"}
          </h2>

          <div className="rounded-lg my-6">
            <SearchBar />
          </div>

          <div className="w-[100%] flex-1 mt-10 h-[50vh] overflow-y-auto scrollbar-hide ">
            {folders.map((data, index) => {
              return (
                <Button
                  key={index}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                      />
                    </svg>
                  }
                  buttonName={data}
                  isMore={true}
                  onClick={() => dispatch(setSelectedFolderName(data))}
                />
              );
            })}
          </div>
        </div>

        <div>
          <Button
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            }
            buttonName={"Add new folders"}
            isMore={false}
            onClick={() => setIsAddFolderOpen((p) => !p)}
          />

          <Button
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            }
            buttonName={"Log out"}
            isMore={false}
            onClick={logOut}
          />
        </div>
      </div>
      {/* Middle Column */}
      <div className="w-[30%] bg-white p-4 border-r-2 border-gray-200 border-solid">
        <div className="mb-4 flex flex-col">
          <h2 className="text-2xl font-bold flex-grow mb-6">
            {folderName ? folderName : "Select Folder"}
          </h2>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-start"
            onClick={handleAddNote}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <p className="font-semibold ml-4">Add Note</p>
          </button>
        </div>

        <div className="flex flex-col max-h-[80vh] overflow-y-auto scrollbar-hide ">
          {notes.map((note, index) => {
            return (
              <NoteBlock
                key={index}
                title={note.title}
                description={note.description}
                onClick={() => {
                  setCurrentNote(note);
                }}
                isSelected={currentNote.title}
                date={note.createdAt}
                noteId={note._id}
                removeNote={removeNoteHandler}
                updateNote={setIsAddNoteOpen}
                setUpdateHandler={setUpdateNote}
                updateIdHandler={setUpdateNoteId}
              />
            );
          })}
        </div>
      </div>
      {/* Right Column */}
      <div className="w-[50%] bg-white p-4">
        <ViewNotes currentNote={currentNote} folder={folderName} />
      </div>
      <MyModal
        isOpen={isAddFolderOpen}
        closeModal={closeModal}
        addUserFolder={addUserFolder}
      />

      <AddNoteModal
        isOpen={isAddNoteOpen}
        closeModal={() => {
          setIsAddNoteOpen(false);
          setUpdateNote(false);
        }}
        addNewNote={addNewNote}
        updateStatus={updateNote}
        updateNoteHandler={updateNoteHandlerfunction}
      />

      {alertMessage.length > 0 && (
        <Alert alertMessage={alertMessage} type={alertType} />
      )}
    </div>
  );
};

export default HomeScreen;
