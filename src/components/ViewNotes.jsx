import moment from "moment";

const ViewNotes = ({ currentNote, folder }) => {
  const createdAtDate = moment(currentNote.createdAt).format("MMMM Do YYYY");
  const lastModifiedDate = moment(currentNote.lastModified).format(
    "MMMM Do YYYY"
  );

  return (
    <>
      <div className=" h-[6vh]  w-full mb-1 ">
        <h2 className="text-2xl font-semibold break-words">
          {folder ? folder : "Select Folder"} / {currentNote.title}
        </h2>
      </div>
      <div className=" overflow-y-auto h-[90vh] scrollbar-hide ">
        <div className="border border-slate-100 mb-1 w-[96%]"></div>
        <h2 className="text-4xl font-bold break-words">{currentNote.title}</h2>
        <div className=" w-full mt-4 ">
          <div className="w-full h-[5vh]  mb-2 flex justify-between p-1">
            <div className="w-[20%] h-full text-slate-600 font-semibold ">
              Created At
            </div>
            <div className="w-[78%] h-full ">{createdAtDate}</div>
          </div>
          <div className="w-full h-[5vh]  mb-2 flex justify-between p-1">
            <div className="w-[20%] h-full text-slate-600 font-semibold ">
              Last modified
            </div>
            <div className="w-[78%] h-full ">{lastModifiedDate}</div>
          </div>
          <div className="w-full h-[5vh]  mb-2 flex justify-between p-1">
            <div className="w-[20%] h-full text-slate-600  font-semibold">
              Tags
            </div>
            <div className="w-[78%] h-full ">Some tags</div>
          </div>
        </div>
        <div className="border border-slate-100 w-[96%]"></div>
        <p className="my-4 ">{currentNote.description}</p>
      </div>
    </>
  );
};

export default ViewNotes;
