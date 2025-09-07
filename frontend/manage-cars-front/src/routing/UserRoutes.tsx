import Dashboard from "@/components/Dashboard";
import UserLayout from "@/layouts/UserLayout";
import InfoCar from "@/pages/user/InfoCar";
import MyCars from "@/pages/user/MyCars";
import Profile from "@/pages/user/Profile";
import SaveCar from "@/pages/user/SaveCar";
import SearchCars from "@/pages/user/SearchCars";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="cars/save" element={<SaveCar />} />
        <Route path="cars/search" element={<SearchCars />} />
        <Route path="cars/my-cars" element={<MyCars />} />
        <Route path="cars/:carId" element={<InfoCar />} />
        <Route path="my-profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
