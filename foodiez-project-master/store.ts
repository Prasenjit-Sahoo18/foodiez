import { create } from 'zustand'
import { MenuItem } from './app/config'

type profileModalStore = {
    modal: boolean,
    closeModal: ()=>void,
    openModal: ()=>void
}
type updateModalStore = {
    modal: boolean,
    closeModal: ()=>void,
    openModal: ()=>void
}
type updatedItemStore = {
    id: string | null,
    setId: (menuItemId:string)=>void
}

export const useProfileModalStore = create<profileModalStore>((set)=>({
    modal: false,
    closeModal: ()=>set(()=>({modal: false})),
    openModal: ()=>set(()=>({modal: true}))
}))

export const useUpdateModalStore = create<updateModalStore>((set)=>({
    modal: false,
    closeModal: ()=>set(()=>({modal: false})),
    openModal: ()=>set(()=>({modal: true}))
}))

export const useUpdateItemStore = create<updatedItemStore>((set)=>({
    id: null,
    setId: (menuItemId: string)=>set((state)=>({id: menuItemId}))
}))

type menuItemStore = {
    menuItems: MenuItem[],
    setItems: (item:MenuItem[])=>void
}

export const useMenuItemsStore = create<menuItemStore>((set)=>({
    menuItems: [],
    setItems: (item: MenuItem[] )=>set((state)=>({menuItems: item}))
}))