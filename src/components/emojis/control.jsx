import React from "react";
import SliderX from "./slider-x.jsx";

const Control = ({ ctrlValues, emoji, setEmoji, newEmoji, childRef }) => {
  // map string values denoting what component to use to the actual component to use
  // this will be more useful if other types of components are added, e.g. xy slider
  const compKey = {
    SliderX: SliderX,
  };
  return (
    <div
      ref={childRef}
      className="bg-gray-100 overflow-y-scroll overflow-x-hidden max-w-screen w-screen rounded-xl"
      style={{ height: "50vh" }}
    >
      {/* this div makes content disappear under the header when scrolling */}
      <div className="fixed bg-gray-100 h-6 -mt-0.5 w-full z-30 rounded-xl"></div>
      <span
        className="fixed pointer-events-none mt-2 h-10 z-40 bg-white text-xl font-mond px-4 pt-1 underline rounded-xl mx-2"
        style={{ width: "calc(100vw - 1rem)", color: "#0000ff" }}
      >
        controls & info
      </span>
      <div className="w-full grid grid-cols-2 px-2 pb-24 pt-14 gap-2">
        <Tile extraClasses="col-span-2 flex flex-col space-y-4">
          <p>use the controls below to manipulate the emojis above.</p>
          <p>
            tap the control name to reset it to default, or tap the number to
            input a value.
          </p>
          <p>
            this webpage can, and probably will, crash your browser/phone. be
            careful with lots of emojis, and also watch out for certain effects
            like high blur step & opacity values!
          </p>
          <p>
            {"send any of your creations (or any bugs) to my "}
            <a style={{ color: "#0000ff" }} href="mailto:isaac@isaac.ac">
              email
            </a>
            {", or as a message on "}
            <a style={{ color: "#0000ff" }} href="https://instagram.com/isyuck">
              instagram
            </a>
            {"!"}
          </p>
        </Tile>
        <Tile>
          <div className="flex flex-row justify-between">
            <span
              className="min-w-max max-h-6 text-base font-mont"
              style={{ color: "#0000ff" }}
            >
              emoji
            </span>
            <input
              className="px-1 bg-transparent h-6 rounded-none max-w-full w-16 text-right"
              name=""
              type="text"
              onChange={(e) => setEmoji(e.target.value)}
              defaultValue={emoji}
              value={emoji}
            />
          </div>
          <div
            onClick={() => newEmoji()}
            className="text-center bg-gray-100 rounded-lg mt-2 pb-1 mb-1"
          >
            randomise
          </div>
        </Tile>
        {ctrlValues.map((ctrl) => (
          <Tile>
            {React.createElement(compKey[ctrl.comp], {
              ctrl: ctrl,
            })}
          </Tile>
        ))}
        <Tile extraClasses="col-span-2">
          <p>
            {"see more of my "}
            <a className="underline" style={{ color: "#0000ff" }} href="/">
              {"work"}
            </a>
            {", or view the "}
            <a
              className="underline"
              style={{ color: "#0000ff" }}
              href="https://github.com/isyuck/website"
            >
              {"source code"}
            </a>
            {" for this page."}
          </p>
        </Tile>
      </div>
    </div>
  );
};

export default Control;

const Tile = ({ children, extraClasses = "" }) => {
  return (
    <div
      className={`flex flex-col justify-between font-mont text-base bg-white rounded-xl px-3 py-2 ${extraClasses}`}
    >
      {children}
    </div>
  );
};
