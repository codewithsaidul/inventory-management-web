import { UserRole } from "./user.types";


export interface NavItem {
    title: string;
    href: string;
    icon: string; // ✅ Changed from LucideIcon to string
    badge?: string | number;
    description?: string;
    roles: UserRole[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}