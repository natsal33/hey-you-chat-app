import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Root from "./Routes/Root.jsx";
import Login from "./Routes/Login.jsx";
import Chat from "./Routes/Chat.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path="/" element={<Root />}>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/chat" element={<Chat />}></Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
