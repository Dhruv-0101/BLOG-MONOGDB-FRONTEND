import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logoutAPI, userProfileAPI } from "../../APIServices/users/usersAPI";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlices";
import NotificationCounts from "../Notification/NotificationCounts";
import Avatar from "../User/Avatar";
import { FaBlog, FaChevronDown } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAPI,
  });

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const logoutHandler = async () => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        dispatch(logout(null));
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    return isLinkActive(path)
      ? "inline-flex items-center border-b-2 border-indigo-600 px-1 pt-1 text-sm font-bold text-slate-900 transition-all duration-200"
      : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:border-slate-200 transition-all duration-200";
  };

  const mobileNavLinkClass = (path) => {
    return isLinkActive(path)
      ? "block border-l-4 border-indigo-600 bg-indigo-50/50 py-2 pl-3 pr-4 text-base font-bold text-indigo-700 transition-all duration-200"
      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-semibold text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200";
  };

  return (
    <Disclosure as="nav" className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              
              <div className="flex items-center gap-8 flex-1">
                {/* Mobile menu button */}
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo & Brand */}
                <Link to="/dashboard" className="flex flex-shrink-0 items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                    <FaBlog size="18" />
                  </div>
                  <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                    Story<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Flow</span>
                  </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex md:space-x-6 h-16">
                  <Link to="/posts" className={navLinkClass("/posts")}>
                    Latest Posts
                  </Link>
                  <Link to="/ranking" className={navLinkClass("/ranking")}>
                    Creators Ranking
                  </Link>
                  <Link to="/pricing" className={navLinkClass("/pricing")}>
                    Pricing
                  </Link>
                </div>
              </div>

              {/* Action Buttons & Profile Dropdown */}
              <div className="flex items-center gap-3">
                {/* Notification */}
                <NotificationCounts />

                {/* Dashboard Text Link */}
                <Link 
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  <MdOutlineDashboard />
                  <span>Dashboard</span>
                </Link>

                {/* Write/Create Post Button */}
                <Link
                  to="/dashboard/create-post"
                  className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusIcon className="-ml-0.5 h-4.5 w-4.5 text-white" aria-hidden="true" />
                  <span>Write</span>
                </Link>

                {/* User Dropdown */}
                <div className="flex flex-shrink-0 items-center">
                  <Menu as="div" className="relative ml-2">
                    <div>
                      <Menu.Button className="relative flex items-center gap-1.5 p-0.5 rounded-full hover:bg-slate-50 hover:border-slate-200/80 transition-all duration-200">
                        {data?.user?.profilePicture ? (
                          <img
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-50/50 shadow-sm"
                            src={data.user.profilePicture.path || data.user.profilePicture}
                            alt="profile"
                          />
                        ) : data?.user?.profilePicture?.path ? (
                          <img
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-50/50 shadow-sm"
                            src={data.user.profilePicture.path}
                            alt="profile"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-indigo-50/50 shadow-sm">
                            <Avatar />
                          </div>
                        )}
                        <FaChevronDown className="text-slate-400 text-[10px] mr-1 hidden md:block" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-50">
                        {/* User identity in menu */}
                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                          <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                          <p className="text-sm font-bold text-slate-800 truncate">{data?.user?.username || "Creator"}</p>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? "bg-slate-50 text-indigo-650" : "text-slate-700",
                                "block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard/create-post"
                              className={classNames(
                                active ? "bg-slate-50 text-indigo-650" : "text-slate-700",
                                "block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                              )}
                            >
                              Write Article
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard/settings"
                              className={classNames(
                                active ? "bg-slate-50 text-indigo-650" : "text-slate-700",
                                "block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-slate-50 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-red-50 text-red-600" : "text-slate-700",
                                "block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Drawer Panel */}
          <Disclosure.Panel className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button as={Link} to="/" className={mobileNavLinkClass("/")}>
                Home
              </Disclosure.Button>
              <Disclosure.Button as={Link} to="/posts" className={mobileNavLinkClass("/posts")}>
                Latest Posts
              </Disclosure.Button>
              <Disclosure.Button as={Link} to="/ranking" className={mobileNavLinkClass("/ranking")}>
                Creators Ranking
              </Disclosure.Button>
              <Disclosure.Button as={Link} to="/pricing" className={mobileNavLinkClass("/pricing")}>
                Pricing
              </Disclosure.Button>
              <div className="border-t border-slate-100 mt-4 pt-4 px-4 flex flex-col gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all duration-200"
                >
                  Settings
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-bold text-white bg-red-655 bg-red-600 hover:bg-red-700 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
