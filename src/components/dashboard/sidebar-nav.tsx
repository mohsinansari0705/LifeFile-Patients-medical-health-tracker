'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  User,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentPatient } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SidebarNav() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-2 py-4">
        <Avatar className="h-10 w-10">
          {userAvatar && (
            <AvatarImage
              src={userAvatar.imageUrl}
              alt={currentPatient.name}
              data-ai-hint={userAvatar.imageHint}
            />
          )}
          <AvatarFallback>{currentPatient.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{currentPatient.name}</span>
          <span className="text-sm text-muted-foreground">Patient</span>
        </div>
      </div>

      <SidebarMenu className="flex-1 p-2">
        <SidebarMenuItem>
          <Link href="/dashboard">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip="Dashboard"
            >
              <span>
                <LayoutDashboard />
                Dashboard
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/dashboard/summary">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/summary'}
              tooltip="AI Summary"
            >
              <span>
                <Bot />
                AI Summary
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/dashboard/records">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/records'}
              tooltip="Medical Records"
            >
              <span>
                <FileText />
                Medical Records
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/dashboard/profile">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/profile'}
              tooltip="Profile"
            >
              <span>
                <User />
                Profile
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/dashboard/settings">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/settings'}
              tooltip="Settings"
            >
              <span>
                <Settings />
                Settings
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarMenu className="p-2 mt-auto">
        <SidebarMenuItem>
          <Link href="/login">
            <SidebarMenuButton asChild tooltip="Log Out">
              <span>
                <LogOut />
                Log Out
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
