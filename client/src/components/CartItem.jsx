import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {ParsePrice} from "@/lib/utils"
import * as React from "react"

function CartItem({product, handleSubClick, handleDelClick, handleAddClick, handleInputQuantity, ...props}) {   
   const handleInput = (event) => {
    handleInputQuantity(product, event.target.value)
   }
  return (
    <div {...props}>
        <div className="flex items-center space-x-4">
            <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                <img src={product.img} className="w-full h-full object-contain" />
            </div>

            <div className="w-full mt-3">
                <h3 className="text-base font-semibold text-gray-800">{product.model}</h3>
                <h6 className="text-sm text-gray-800 font-bold cursor-pointer mt-0.5">{ParsePrice(product.price)}</h6>

                <div className="flex gap-4 mt-4">
                    <div>
                        <div 
                            className="flex items-center  pb-1.5 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                            <div className="pr-4" onClick={() => handleSubClick(product)}>
                                <Button className="size-5" > - </Button>
                            </div>

                            <Input type="text" className="size-11 bg-zinc-100" placeholder={product.quantity} onChange = {handleInput} />

                            <div className="px-4" onClick={() => {handleAddClick(product)}} >
                                <Button className="size-5" > + </Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-auto">
                        <TrashIcon className="size-4 stroke-2 stroke-red-500 inline cursor-pointer"  onClick={() => handleDelClick(product)}/>
                    </div>
                </div>
            </div>
        </div>

        <hr className="border-gray-300" />
    </div>

  )
}

export default CartItem;