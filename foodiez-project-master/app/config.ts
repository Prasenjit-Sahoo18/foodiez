import { User } from "next-auth"
import axios from "axios"
import toast from "react-hot-toast"

export type Type = {
    id: string,
    name: string,
    description: string
    image: string
}

export type MenuItem = {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    typeName: string
}

export type OrderItem = {
    id: string;
    menuItem: MenuItem;
    menuItemId: string;
    orderId: string;
    quantity: number;
}


export function addItemToCart(itemId: string, user: User) {
    return axios.post("/api/order", {
        userId: user?.id,
        itemId: itemId
    }).then((response) => {
        // toast.success("Item added to cart.", {
        //     autoClose: 1000,
        //     theme: "colored",
        //     hideProgressBar: true,
        //     className:"w-5000px",
        //     position:"top-center",
        //     transition: Bounce
        // })
       
    }).catch(() => {
        toast.error("Error while adding item to cart.", {
            duration: 1000,
            position: "top-center"
        })
        console.log("error while adding item to cart.")
    })
}

export function deleteCompleteItem(itemId: string) {
    axios.delete(`/api/order/delete?itemId=${itemId}`, {
    }).then(() => {
    }).catch(() => {
        toast.error("Error while removing from cart.", {
            duration: 1000,
            position: "top-center"
        })
        console.log("error while removing item from cart.")
    })
}

export function deleteItemFromCart(itemId: string) {
    axios.delete(`/api/order?itemId=${itemId}`, {
    }).then(() => {
    }).catch(() => {
        toast.error("Error while remooving from cart.", {
            duration: 1000,
            position: "top-center"
        })
        console.log("error while removing item from cart.")
    })
}


