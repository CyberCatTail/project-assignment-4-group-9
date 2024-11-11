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

  function Navigation() {
    return (
        <NavigationMenu class="w-full">
            <NavigationMenuList class="flex text-gray-800 font-bold">
                <NavigationMenuItem class="w-1/6">
                    <NavigationMenuLink className={`font-serif text-2xl text-yellow-400`}>
                        BeastBuy
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <div class="w-full flex justify-end item-center">
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
                        <UserCircleIcon className="h-full" />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    );
  }
  
  export default Navigation;