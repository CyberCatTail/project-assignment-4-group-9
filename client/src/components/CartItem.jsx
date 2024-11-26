import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";


import {ParsePrice} from "@/lib/utils"
import * as React from "react"

function CartItem({product, handleSubClick, handleDelClick, handleAddClick, ...props}) {   
  return (
    <div {...props}>
        <div className="flex items-center gap-4">
            <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                <img src={product.img} className="w-full h-full object-contain" />
            </div>

            <div className="w-full">
                <h3 className="text-base font-semibold text-gray-800">{product.model}</h3>
                <h6 className="text-sm text-gray-800 font-bold cursor-pointer mt-0.5">{ParsePrice(product.price)}</h6>

                <div className="flex gap-4 mt-4">

                    <div>
                        <button type="button"
                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                            <MinusIcon className="size-3 stroke-[3px]" onClick={() => handleSubClick(product)}/>
                            <span className="mx-2.5">{product.quantity}</span>
                            {/* <span className="mx-2.5">1</span> */}
                            <PlusIcon className="size-3 stroke-[3px]" onClick={() => handleAddClick(product)}/>
                        </button>
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