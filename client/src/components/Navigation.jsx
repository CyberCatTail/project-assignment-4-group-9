import * as React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Login from "@/components/Login";
import { AuthContext } from '@/context/AuthContext';
import * as authApi from "@/api/authApi";

function Navigation() {
  const [showLogin, setShowLogin] = React.useState(false);
  const { isLoggedIn, login, logout } = React.useContext(AuthContext);

  React.useEffect(() => {
    const handle401Error = () => {
      setShowLogin(true);
    };

    window.addEventListener('show-login-card', handle401Error);

    return () => {
        window.removeEventListener('show-login-card', handle401Error);
    };
}, []);

  const handleProfileClick = () => {
    setShowLogin(!showLogin);
  };

  const handeLogout = () => {
    logout();
  }

  const closeLoginCard = () => {
    setShowLogin(false);
  };

  const loginButton = () => {
    return <Button type="submit" className='w-full'>Login / Create Account</Button>
  }

  const loginSubmit = async (values) => {
    await authApi.login(values.username, values.password)
    login()
    closeLoginCard()
    window.location.reload();
  };

  return (
    <>
      <NavigationMenu className="max-w-full justify-between">
        <Link to="/" className={`font-serif text-2xl text-yellow-400`}>BeastBuy</Link>
        <NavigationMenuList className="flex text-gray-800 font-bold">
          <div className="w-full flex justify-end item-center">
            <NavigationMenuItem className="mx-2">
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                <ShoppingCartIcon className="h-full" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-2">
              {isLoggedIn ? (
                <NavigationMenuLink onClick={handeLogout} className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                  <ArrowRightStartOnRectangleIcon
                    className="h-full"
                     />
                </NavigationMenuLink>

              ) : (
                <NavigationMenuLink onClick={handleProfileClick} className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                  <UserCircleIcon
                    className="h-full"
                  />
                </NavigationMenuLink>
              )}

            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {showLogin && <Login handleClose={closeLoginCard} onSubmit={loginSubmit} LoginButton={loginButton} className="w-1/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"/>}
    </>
  );
}

export default Navigation;
