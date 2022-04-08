import CityHeader from "./cityStuff/CityHeader";
import CityList from "./cityStuff/CityList";

export default function App() {
  return (
    <div className="container">
      <a href="/">Site Root</a>
      <hr />
      <CityHeader />
      <CityList />
    </div>
  );
}
