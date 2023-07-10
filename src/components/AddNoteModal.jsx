import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";

export default function AddNoteModal({
  isOpen,
  closeModal,
  addNewNote,
  updateStatus,
  updateNoteHandler,
}) {
  const folderType = useSelector((state) => state.folder.selectedFolder);

  const titleRef = useRef();
  const descriptionRef = useRef();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[60vw] min-h-[50vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Note
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="py-2 w-[100%] font-semibold text-xl px-4 rounded my-2 outline-none border-2 border-solid border-black-500"
                      placeholder="Title"
                      ref={titleRef}
                    />

                    <textarea
                      name="note"
                      id="note"
                      cols="30"
                      rows="10"
                      placeholder="Take a note..."
                      ref={descriptionRef}
                      className="w-[100%] px-4 py-2 border-2 resize-none border-solid border-black-500 outline-none rounded min-h-[50vh] max-h-[60vh]"
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    {!updateStatus && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          addNewNote(
                            titleRef.current.value,
                            descriptionRef.current.value,
                            folderType
                          );
                          closeModal();
                        }}
                      >
                        Create
                      </button>
                    )}

                    {updateStatus && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          updateNoteHandler(
                            titleRef.current.value,
                            descriptionRef.current.value
                          );
                          closeModal();
                        }}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
