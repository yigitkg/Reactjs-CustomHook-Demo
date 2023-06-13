import "./App.css";
import useConnection from "./Hooks/useConnection";
import useBattery from "./Hooks/useBattery";
import useCopyToClipboard from "./Hooks/useCopyToClipboard";

/**
 * Renders the main application component
 * @returns {JSX.Element} - The component's rendered output
 */
function App() {
  // Destructure the values returned from the hooks
  const { status, Online, Offline, StatusIndicator } = useConnection();
  const { level, charging, CriticalBattery } = useBattery();
  const { isCopied, error, copyToClipboard } = useCopyToClipboard();

  // Log whether the device is charging or not
  if (charging) {
    console.log(charging);
  } else {
    console.log("not charging");
  }

  // Render the component's JSX
  return (
    <div>
      <div>
        <Online>You are now connected to the network!</Online>
        <Offline>Check your internet connection!</Offline>
        <div className="fixed top-0 left-0 w-full bg-gray-400 text-white p-4 text-sm text-center">
          {status ? "Online" : "Offline"}
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full bg-green-400 text-white mt-12 p-4 text-sm text-center">
        <p>Level: {level}</p>
        {charging && <p>charging</p>}
      </div>
      <div className="fixed top-0 left-0 w-full flex flex-col items-center mt-[7.5rem]">
        <div className="bg-red-600 text-white p-4 rounded">
          <p>Level: {level}</p>
          <p>not charging</p>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full flex flex-col items-center mt-[13rem]">
        <button
          className="w-[6rem] h-[3rem] rounded bg-indigo-700 text-white hover:bg-indigo-500 transition-colors"
          onClick={() => copyToClipboard("Testing copy hook")}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default App;
