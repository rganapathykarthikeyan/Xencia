import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "c/:id", element: <ChatPage /> }],
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
