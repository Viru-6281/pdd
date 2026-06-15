import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarAnimation from "./animations/CarAnimation";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import UserLogin from "./Authorization/UserLogin";
import UserRegistration from "./Authorization/UserRegistration";
import Navbar from "./Lender/Navbar";
import LenderHome from "./Lender/LenderHome";
import AddParkingPlace from "./Lender/AddparkingPlace";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewBookings from "./Lender/ViewBookings";
import Profile from "./Lender/Profile";
import UserHome from "./User/UserHome";
import UserNavbar from "./User/UserNavbar";
import UserProfile from "./User/UserProfile";
import AddVehicle from "./User/AddVehicle";
import ViewMap from "./User/ViewMap";
import BookParkingPlace from "./User/BookParkingPlace";
import UserBookings from "./User/UserBookings";
import GiveRatings from "./User/GiveRatings";
import ViewRatings from "./Lender/ViewRatings";

export default function App() 
{
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarAnimation />} />
        <Route path="/lenderLogin" element={<Login />} />
        <Route path="/lenderRegister" element={<Register/>}/>
        <Route path="/userLogin" element={<UserLogin/>}/>
        <Route path="/userRegister" element={<UserRegistration/>}/>

        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/lenderHome" element={<LenderHome/>}/>
        <Route path="/addParkingPlace" element ={<AddParkingPlace/>}/>
        <Route path="/viewHisBookings" element = {<ViewBookings/>}/>
        <Route path="/lenderProfile" element = {<Profile/>}/>
        <Route path="/ratings" element={<ViewRatings />} />

        <Route path="/userHome" element={<UserHome/>}/>
        <Route path="/userNav" element={<UserNavbar />}/>
        <Route path="/user/viewProfile" element={<UserProfile />} />
        <Route path="/user/add-vehicle" element={<AddVehicle />} />
        <Route path="/user/view-map" element={<ViewMap />} />
        <Route path="/book-parking/:lenderId" element={<BookParkingPlace />} />
        <Route path="/user/viewBookings" element={<UserBookings />} />
        <Route path="/user/give-rating" element={<GiveRatings />} />
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}