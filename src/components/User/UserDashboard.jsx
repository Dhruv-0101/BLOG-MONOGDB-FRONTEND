import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, Link, Outlet } from "react-router-dom";
import {
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { FaBlog } from "react-icons/fa6";
import {
  FaUserEdit,
  FaFileAlt,
  FaUsers,
  FaCalendarPlus,
  FaTags,
  FaWallet,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import Avatar from "../User/Avatar";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Create New Post", href: "/dashboard/create-post", icon: FaUserEdit },
  { name: "My Posts", href: "/dashboard/posts", icon: FaFileAlt },
  { name: "My Followers", href: "/dashboard/my-followers", icon: FaUsers },
  { name: "My Followings", href: "/dashboard/my-followings", icon: FaUsers },
  { name: "Create Plan", href: "/dashboard/create-plan", icon: FaCalendarPlus },
  { name: "Add Category", href: "/dashboard/add-category", icon: FaTags },
  { name: "My Earnings", href: "/dashboard/my-earnings", icon: FaWallet },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Fetch profile to verify if user is admin
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const isAdmin = profileData?.user?.username === "dhruv";

  // Filter navigation items
  const filteredNavigation = navigation.filter((item) => {
    if (item.href === "/dashboard/create-plan") {
      return isAdmin;
    }
    return true;
  });

  const isLinkActive = (href) => {
    if (href === "/dashboard") {
      return (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/"
      );
    }
    return location.pathname.startsWith(href);
  };

  const linkClass = (href) => {
    const active = isLinkActive(href);
    return classNames(
      active
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-100/50 rounded-2xl"
        : "text-slate-600 hover:text-indigo-650 hover:bg-slate-50 rounded-2xl",
      "group flex items-center gap-3.5 py-2.5 px-4 text-sm font-semibold transition-all duration-200",
    );
  };

  const iconClass = (href) => {
    return isLinkActive(href)
      ? "text-white h-5 w-5 shrink-0"
      : "text-slate-400 group-hover:text-indigo-500 h-5 w-5 shrink-0 transition-colors";
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-slate-50/40 relative">
      {/* Ambient background blurs for content depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200/30 via-indigo-200/30 to-purple-100/20 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200/30 via-rose-100/30 to-amber-100/20 rounded-full blur-[130px] opacity-60 pointer-events-none z-0" />

      {/* Mobile Drawer (Sidebar) */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="rounded-xl p-1.5 text-white bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/80 transition-all focus:outline-none"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                {/* Mobile Drawer Panel Content */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar bg-white/95 backdrop-blur-md px-6 pb-4 shadow-2xl">
                  {/* Brand Header */}
                  <div className="flex h-16 shrink-0 items-center border-b border-slate-100/80">
                    <Link to="/dashboard" className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <FaBlog size="16" />
                      </div>
                      <span className="font-extrabold text-lg text-slate-800 tracking-tight">
                        Story
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                          Flow
                        </span>
                      </span>
                    </Link>
                  </div>

                  {/* User Profile Card */}
                  <div className="flex items-center gap-3 px-1 py-3 border-b border-slate-100/80 mb-2">
                    {profileData?.user?.profilePicture ? (
                      <img
                        src={
                          profileData.user.profilePicture.path ||
                          profileData.user.profilePicture
                        }
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-50 bg-slate-50 flex items-center justify-center">
                        <Avatar />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {profileData?.user?.username || "Creator"}
                      </p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">
                        {isAdmin ? "Admin Account" : "Writer Account"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="space-y-1.5">
                          {filteredNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={linkClass(item.href)}
                              >
                                <item.icon
                                  className={iconClass(item.href)}
                                  aria-hidden="true"
                                />
                                <span>{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setSidebarOpen(false)}
                          className={linkClass("/dashboard/settings")}
                        >
                          <Cog6ToothIcon
                            className={iconClass("/dashboard/settings")}
                            aria-hidden="true"
                          />
                          <span>Settings</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Floating sidebar for desktop (sits next to content, top-20 gap) */}
      <div className="hidden lg:fixed lg:top-20 lg:bottom-6 lg:left-6 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar container */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-md px-5 pb-6 pt-5 shadow-sm shadow-slate-200/10">
          {/* User Profile Card */}
          <div className="flex items-center gap-3 px-1 py-3.5 border-b border-slate-100">
            {profileData?.user?.profilePicture ? (
              <img
                src={
                  profileData.user.profilePicture.path ||
                  profileData.user.profilePicture
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50"
              />
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-50 bg-slate-50 flex items-center justify-center">
                <Avatar />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 truncate">
                {profileData?.user?.username || "Creator"}
              </p>
              <p className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider mt-0.5">
                {isAdmin ? "Admin Account" : "Writer Account"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="space-y-1.5">
                  {filteredNavigation.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className={linkClass(item.href)}>
                        <item.icon
                          className={iconClass(item.href)}
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  to="/dashboard/settings"
                  className={linkClass("/dashboard/settings")}
                >
                  <Cog6ToothIcon
                    className={iconClass("/dashboard/settings")}
                    aria-hidden="true"
                  />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Top Header (sticky below main private navbar which is top-0 h-16) */}
      <div className="sticky top-16 z-20 flex h-14 shrink-0 items-center gap-x-4 border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 rounded-lg text-slate-650 hover:bg-slate-50 hover:text-indigo-600 transition-all focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex flex-1 gap-x-4 self-stretch items-center">
          <span className="font-bold text-sm text-slate-800 uppercase tracking-wider">
            Dashboard Menu
          </span>
        </div>
      </div>

      {/* Main content wrapper with exact viewport constraints */}
      <div className="lg:pl-[18.5rem] h-full overflow-y-auto no-scrollbar pb-20">
        <main className="py-6 sm:py-8 relative z-10">
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
