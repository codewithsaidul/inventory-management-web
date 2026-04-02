import { NavSection } from "@/types/dashboard.types";
import { UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: [UserRole.SUPER_ADMIN],
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "Inventory Management",
    items: [
      {
        title: "Products",
        href: "/dashboard/products",
        icon: "Box",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: "Layers",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: "ShoppingCart",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Restock Queues",
        href: "/dashboard/restock-queues",
        icon: "RotateCw",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Activity Logs",
        href: "/dashboard/activity-logs",
        icon: "History",
        roles: [UserRole.SUPER_ADMIN],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case UserRole.SUPER_ADMIN:
      return [...commonNavItems, ...adminNavItems];
    default:
      return [];
  }
};
