import { NavSection } from "@/types/dashboard.types";
import { UserRole } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/utils/auth";
import { User } from "lucide-react";

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
        title: "Orders",
        href: "/management/dashboard/orders",
        icon: "ShoppingCart",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Products",
        href: "/management/dashboard/products",
        icon: "Box",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Activity Tracking",
        href: "/management/dashboard/activity-tracking",
        icon: "SquareActivity",
        roles: [UserRole.SUPER_ADMIN],
      },
      {
        title: "Restock Queues",
        href: "/management/dashboard/restock-queues",
        icon: "ListOrdered ",
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
