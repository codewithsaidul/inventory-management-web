// import { getUserInfo } from "@/service/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";
import { getNavItemsByRole } from "@/config/navItem.config";

const DashboardNavbar = async () => {
//   const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(UserRole.SUPER_ADMIN);
  const dashboardHome = getDefaultDashboardRoute(UserRole.SUPER_ADMIN);

  const userInfo = {
    name: "Saidul Islam",
    email: "saidul.islam@example.com",
    role: UserRole.SUPER_ADMIN,
  }

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;