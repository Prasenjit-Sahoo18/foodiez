import { DeleteIcon } from "./Icons";
import { FC } from "react";
import { deleteCompleteItem } from "@/app/config";



interface CartItemProps {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  price: number;
  quantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  addItem: () => void;
  deleteItem: () => void;
  onDeleteItem: (itemId: string) => void;
}

export const CartItem: FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  type,
  price,
  quantity,
  onQuantityChange,
  addItem,
  deleteItem,
  onDeleteItem
}) => {

  return <div className="flex lg:max-w-[700px] md:max-w-[700px] max-w-[500px] justify-center items-center gap-4 w-full bg-blue-100 md:px-4 px-4 lg:py-3 md:py-3 py-2 md:rounded-lg rounded-md lg:h-32 md:h-28 h-24">
   <div> <img src={imageUrl} alt="" className="flex lg:w-36 lg:h-20 md:w-32 md:h-16 w-20 h-13 rounded-lg" /></div>
    <div className="flex justify-between w-full h-full">
      <div className="flex  justify-between items-center ">
        <div className="flex flex-col md:gap-2 gap-1">
          <h2 className="lg:text-xl text-md text-blue-300 font-medium"> {title}</h2>
          <h2 className="lg:text-[14px] md:text-[13px] text-xs">{type} </h2>
          <p className="lg:text-[14px] md:text-[13px] text-xs font-sans">&#8377; {price}</p>
        </div>

      </div>
      <div className="flex flex-col justify-between items-end h-full  w-fit lg:text-[14px] md:text-[13px] text-xs">
        <div className="flex lg:w-4 md:w-[12px] w-[11px]"><DeleteIcon onClick={() => {
          onDeleteItem(id)
          deleteCompleteItem(id)
        }} /></div>
        <div className="flex md:h-5 h-5 lg:gap-3 md:gap-2 gap-2 ">
          <button onClick={() => {
            onQuantityChange(id, quantity >= 1 ? quantity - 1 : 0)
            deleteItem()
          }} className="bg-gray-600 px-2  rounded-xs cursor-pointer hover:scale-110 transition transform hover:bg-slate-500 flex justify-center items-center text-center">-</button>
          <div className="">{quantity}</div>
          <button onClick={() => {
            onQuantityChange(id, quantity + 1)
            addItem()
          }} className="bg-gray-600 px-2  rounded-xs cursor-pointer hover:scale-110 transition transform hover:bg-slate-500 flex justify-center items-center">+</button>
        </div>
        <h2 className="flex gap-2 lg:text-[16px] md:text-[13px] text-xs"><p className="text-green-500">Total:</p> {price * quantity}</h2>
      </div>
    </div>

  </div>
}