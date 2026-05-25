import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function PublicNavbar() {
  const location = useLocation();

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
    <Disclosure
      as="nav"
      className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 shadow-sm"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center gap-8">
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
                <Link
                  to="/"
                  className="flex flex-shrink-0 items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                    <FaBlog size="18" />
                  </div>
                  <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                    Story
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Flow
                    </span>
                  </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex md:space-x-6 h-16">
                  <Link to="/" className={navLinkClass("/")}>
                    Home
                  </Link>
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

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relative inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Join StoryFlow
                </Link>
                {/* <Link
                  to="/create-post"
                  className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusIcon className="-ml-0.5 h-4.5 w-4.5" aria-hidden="true" />
                  <span>Write</span>
                </Link> */}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <Disclosure.Panel className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                to="/"
                className={mobileNavLinkClass("/")}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/posts"
                className={mobileNavLinkClass("/posts")}
              >
                Latest Posts
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/ranking"
                className={mobileNavLinkClass("/ranking")}
              >
                Creators Ranking
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/pricing"
                className={mobileNavLinkClass("/pricing")}
              >
                Pricing
              </Disclosure.Button>
              <div className="border-t border-slate-100 mt-4 pt-4 px-4 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200"
                >
                  Join StoryFlow
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
