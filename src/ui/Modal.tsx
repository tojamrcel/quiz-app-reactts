import {
    cloneElement,
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react"
import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import { useOutsideClick } from "../hooks/useOutsideClick"
import { useOnKey } from "../hooks/useOnKey"

interface ModalContextType {
    openName: string
    open: Dispatch<SetStateAction<string>>
    close: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

function Modal({ children }: { children: ReactNode }) {
    const [openName, setOpenName] = useState("")
    const open = setOpenName
    const close = () => setOpenName("")

    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

function Open<T extends { onClick?: () => void }>({
    children,
    opens: opensWindowName,
}: {
    children: ReactElement<T>
    opens: string
}) {
    const { open } = useContext(ModalContext)!

    return cloneElement(children, {
        onClick: () => open(opensWindowName),
    } as T)
}
function Window<T extends { onCloseModal: () => void }>({
    children,
    name,
}: {
    children: ReactElement<T>
    name: string
}) {
    const { openName, close } = useContext(ModalContext)!
    const ref = useOutsideClick(close)
    useOnKey("escape", close)
    if (openName !== name) return null

    return createPortal(
        <div className="fixed bottom-0 top-0 h-[100dvh] w-full backdrop-blur-sm">
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                className={`fixed left-1/2 top-1/2 ${openName === "delete" ? "h-auto w-[85%]" : "h-full w-full"} -translate-x-1/2 -translate-y-1/2 overflow-auto bg-gray-300 px-[1.6rem] py-[2rem] shadow-md sm:overflow-hidden md:h-auto md:w-auto md:rounded-xl md:px-[3.2rem] md:py-[4rem]`}
            >
                <button
                    onClick={close}
                    className="absolute right-4 top-4 text-2xl"
                >
                    <HiXMark />
                </button>
                <div>
                    {cloneElement(children, { onCloseModal: close } as T)}
                </div>
            </div>
        </div>,
        document.body,
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
