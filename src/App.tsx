import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "c/:id", element: <ChatPage /> },
    ],
  },
]);

function App() {
  return (
    <div className="w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
