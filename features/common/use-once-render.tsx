import {create} from "zustand";

type OnceRenderState = {
    isRender: boolean
    setIsRender: () => void
}

export const useOnceRender = create<OnceRenderState>((set) => ({
    isRender: false,
    setIsRender: () => set({isRender: true}),
}))