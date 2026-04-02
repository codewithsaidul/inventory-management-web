
import DashboardNavbarContent from "./DashboardNavbarContent";
import { UserInfo, UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";
import { getNavItemsByRole } from "@/config/navItem.config";
import { getUserInfo } from "@/services/auth/getUserInfo";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(UserRole.SUPER_ADMIN);
  const dashboardHome = getDefaultDashboardRoute(UserRole.SUPER_ADMIN);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;