import {
    createContext,
    Dispatch,
    FormEvent,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react"
import { HiDotsVertical } from "react-icons/hi"
import { useOutsideClick } from "../hooks/useOutsideClick"
import { IconType } from "react-icons"

interface MenuContextType {
    openId: string
    open: Dispatch<SetStateAction<string>>
    close: () => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

function Menus({ children }: { children: ReactNode }) {
    const [openId, setOpenId] = useState("")
    const open = setOpenId
    const close = () => setOpenId("")

    return (
        <MenuContext.Provider value={{ openId, open, close }}>
            {children}
        </MenuContext.Provider>
    )
}

function Menu({ children }: { children: ReactNode }) {
    return children
}

function Toggle({ id }: { id: string }) {
    const { open, close, openId } = useContext(MenuContext)!

    function handleClick(e: FormEvent) {
        e.stopPropagation()
        if (openId === "" || openId !== id) {
            open(id)
        } else {
            close()
        }
    }

    return (
        <button
            onClick={handleClick}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-400"
        >
            <HiDotsVertical />
        </button>
    )
}

function List({ id, children }: { id: string; children: ReactNode }) {
    const { openId, close } = useContext(MenuContext)!
    const ref = useOutsideClick(close, false)
    if (openId !== id) return null

    return (
        <ul
            ref={ref as React.Ref<HTMLUListElement>}
            className={`absolute right-[-8px] top-[60px] z-10 overflow-clip rounded-md bg-zinc-300 text-left shadow-md`}
        >
            {children}
        </ul>
    )
}

function Button({
    children,
    icon: Icon,
    onClick,
    disabled,
}: {
    children: ReactNode
    icon: IconType
    onClick?: () => void
    disabled?: boolean
}) {
    const { close } = useContext(MenuContext)!

    function handleClick() {
        onClick?.()
        close?.()
    }

    return (
        <li>
            <button
                disabled={disabled}
                onClick={handleClick}
                className={`flex w-full items-center gap-4 px-[1.4rem] py-[0.7rem] transition-colors duration-150 hover:bg-zinc-200 disabled:text-zinc-400`}
            >
                {<Icon />}{" "}
                <span
                    className={`${disabled ? "text-zinc-500" : "text-zinc-800"}`}
                >
                    {children}
                </span>
            </button>
        </li>
    )
}

export function useMenus() {
    const context = useContext(MenuContext)

    return context
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
