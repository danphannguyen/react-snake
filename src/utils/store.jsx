import { create } from 'zustand'

const useStore = create((set) => ({
    results: [],
    setResults: (param) =>
        set(() => ({
            results: param,
        })),
    gameOver: false,
    setGameOver: (param) =>
        set(() => ({
            gameOver: param,
        })),
    skin: null,
    setSkin: (param) =>
        set(() => ({
            skin: param,
        })),
    mode: [],
    addMode: (param) =>
        set((state) => ({
            mode: [...state.mode, param],
        })),

    removeMode: (param) =>
        set((state) => ({
            mode: state.mode.filter((_mode) => _mode !== param)
        })),
}))

export default useStore