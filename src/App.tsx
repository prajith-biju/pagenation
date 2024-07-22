import "./App.css";
import { Pagenation } from "./components/Pagenation";

function App() {
  return (
    <>
      <Pagenation count={10} total={3000} currentPage={56} />
    </>
  );
}

export default App;
