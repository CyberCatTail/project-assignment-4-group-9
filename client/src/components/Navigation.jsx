import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Login from "@/components/Login"

function Navigation() {
    const [showLogin, setShowLogin] = React.useState(false);

    const handleProfileClick = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <NavigationMenu className="max-w-full justify-between">
                <div className={`font-serif text-2xl text-yellow-400`}>
                    BeastBuy
                </div>
                <NavigationMenuList className="flex text-gray-800 font-bold">
                    <div className="w-full flex justify-end item-center">
                        <NavigationMenuItem className="mx-2">
                            <Input placeholder="Search Products" />
                        </NavigationMenuItem>
                        <NavigationMenuItem className="mx-2">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <ShoppingCartIcon className="h-full" />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="mx-2">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <UserCircleIcon className="h-full" onClick={handleProfileClick}/>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
            <Login isVisible={showLogin} setIsVisible={setShowLogin} />
        </>

    );
}

export default Navigation;