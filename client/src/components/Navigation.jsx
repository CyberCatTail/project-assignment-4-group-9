import * as React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { ShoppingCartIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Login from "@/components/Login";
import { AuthContext } from '@/context/AuthContext';

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

  return (
    <>
      <NavigationMenu className="max-w-full justify-between">
        <Link to="/" className={`font-serif text-2xl text-yellow-400`}>BeastBuy</Link>
        <NavigationMenuList className="flex text-gray-800 font-bold">
          <div className="w-full flex justify-end item-center">
            <NavigationMenuItem className="mx-2">
              <Input placeholder="Search Products" />
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-2">
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                <ShoppingCartIcon className="h-full" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-2">
              {isLoggedIn ? (
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                  <ArrowRightStartOnRectangleIcon
                    className="h-full"
                    onClick={handeLogout} />
                </NavigationMenuLink>

              ) : (
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                  <UserCircleIcon
                    className="h-full"
                    onClick={handleProfileClick}
                  />
                </NavigationMenuLink>
              )}


            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {showLogin && <Login login={login} close={closeLoginCard}/>}
    </>
  );
}

export default Navigation;
