import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import AttendConferenceForm from "./AttendConferenceForm";
import ConferenceForm from "./ConferenceForm";
import PresentationForm from "./PresentationForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="attendees">
            <Route
              path=""
              element={<AttendeesList attendees={props.attendees} />}
            />
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
