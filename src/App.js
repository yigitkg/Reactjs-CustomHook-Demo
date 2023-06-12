import "./App.css";
import useConnection from "./Hooks/useConnection";

function App() {
  const { status } = useConnection();

  return (
    <div>
      Connection Status = <strong>{status ? "Online" : "Offline"}</strong>
    </div>
  );
}

export default App;
