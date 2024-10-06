import "./App.css";
import ReneeForm from "./components/BirthdayForm/ReneeForm";
import PirateMessage from "./components/PirateComponent/PirateMessage";

function App() {
  return (
    <>
      <div>
        <h1>A Pirate looks at 40</h1>
        <PirateMessage />
      </div>
      <div>
        <ReneeForm />
      </div>
    </>
  );
}

export default App;
