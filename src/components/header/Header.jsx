import React from "react";
import { Button, Container, Logo, LogoutButton } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { themeToggler } from "../../../theme/themeSlice";
import useTheme from "../../../theme/useTheme";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="w-full py-3 shadow-md bg-white dark:bg-neutral-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-6">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="flex ml-auto items-center gap-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-blue-500 hover:text-white"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Theme Toggle */}
            <li>
              <Button
                className="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-blue-500 hover:text-white"
                onClick={() => dispatch(themeToggler())}
              >
                {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
              </Button>
            </li>

            {/* Logout */}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;