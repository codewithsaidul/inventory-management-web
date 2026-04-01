import { getNavItemsByRole } from "@/config/navItem.config";
import { NavSection } from "@/types/dashboard.types";
import { UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  //   const userInfo = (await getUserInfo()) as UserInfo;

  const userInfo = {
    name: "Saidul Islam",
    email: "saidul.islam@example.com",
    role: UserRole.SUPER_ADMIN,
  };

  const navItems: NavSection[] = getNavItemsByRole(UserRole.SUPER_ADMIN);
  const dashboardHome = getDefaultDashboardRoute(UserRole.SUPER_ADMIN);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
