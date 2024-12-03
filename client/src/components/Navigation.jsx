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
import Profile from "@/components/Profile";
import { AuthContext } from '@/context/AuthContext';
import * as authApi from "@/api/authApi";
import * as userApi from "@/api/userApi"

function Navigation() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [user] = React.useState({ email: localStorage.getItem("email") });
  const [showProfile, setShowProfile] = React.useState(false);
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
    if (isLoggedIn) {
      setShowProfile(!showProfile);
    } else {
      setShowLogin(!showLogin);
    }
  };

  const handeLogout = () => {
    logout();
    window.location.href = '/'
  }

  const closeLoginCard = () => {
    setShowLogin(false);
  };

  const loginButton = () => {
    return <Button type="submit" className='w-full'>Login / Create Account</Button>
  }

  const loginSubmit = async (values) => {
    await authApi.login(values.email, values.password)
    login()
    closeLoginCard()
    localStorage.setItem("email", values.email);    
    window.location.reload();
  };

  const closeProfileCard = () => {
    setShowProfile(false);
  }

  const profileSubmit = async (values) => {
    await userApi.changePassword(values.password)
  }

  return (
    <>
      <NavigationMenu className="max-w-full justify-between">
        <Link to="/" className={`font-serif text-2xl`}>BeastBuy</Link>
        <NavigationMenuList className="flex text-gray-800 font-bold">
          <div className="w-full flex justify-end item-center">
            <NavigationMenuItem className="mx-2">
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                <ShoppingCartIcon className="h-full" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-2">
              <NavigationMenuLink onClick={handleProfileClick} className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                <UserCircleIcon
                  className="h-full"
                />
              </NavigationMenuLink>
            </NavigationMenuItem>
            {isLoggedIn &&
              <NavigationMenuItem className="mx-2">

                <NavigationMenuLink onClick={handeLogout} className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                  <ArrowRightStartOnRectangleIcon
                    className="h-full"
                  />
                </NavigationMenuLink>
              </NavigationMenuItem>
            }

          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {showLogin &&
        <Login className="overflow-auto w-svw md:w-[500px] h-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" handleClose={closeLoginCard} onSubmit={loginSubmit} LoginButton={loginButton} />
      }
      {showProfile &&
        <Profile className="overflow-auto w-svw md:w-[500px] h-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" handleClose={closeProfileCard} onSubmit={profileSubmit} user={user}/>
      }
    </>
  );
}

export default Navigation;
