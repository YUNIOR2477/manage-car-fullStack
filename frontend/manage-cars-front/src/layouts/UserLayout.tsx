import { UserSidebar } from "@/components/UserSidebar";
import PrincipalLayout from "./PrincipalLayout";

const UserLayout = () => {
  return <PrincipalLayout SidebarComponent={<UserSidebar />} />;
};

export default UserLayout;
