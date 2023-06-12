import "./App.css";
import useConnection from "./Hooks/useConnection";

function App() {
  const { status, Online, Offline } = useConnection();

  return (
    <div>
      <Online>You are now connected to the network!</Online>
      <Offline>Check your internet connection!</Offline>
    </div>
  );
}

export default App;
