import "./App.css";
import { Pagenation } from "./components/Pagenation";

function App() {
  return (
    <>
      <Pagenation count={10} total={3000} currentPage={2} />
    </>
  );
}

export default App;
