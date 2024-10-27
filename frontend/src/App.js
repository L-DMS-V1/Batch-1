import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from './Signup/Signup';
import Homepage from './Homepage/Homepage';
import Login from './Login/Login';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Homepage/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
