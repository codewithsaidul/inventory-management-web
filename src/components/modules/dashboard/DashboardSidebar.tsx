import { getNavItemsByRole } from "@/config/navItem.config";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo, UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfo } from "@/services/auth/getUserInfo";

const DashboardSidebar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;



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
