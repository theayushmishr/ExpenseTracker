import "./App.css";
import Nav from "./components/nav";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <section className="flex bg-neutral-950 h-screen text-white p-4 gap-6">
      <Check />
    </section>
  );
}

function Check() {
  const get = async () => {
    const response = await fetch("http://localhost:8800/");
    const data = response.json();
    console.log(data);
  };
  return (
    <>
      <button className="bg-amber-500 text-white" onClick={get}>
        Click
      </button>
    </>
  );
}

export default App;
