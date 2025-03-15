function ConfirmDelete({ onCloseModal, onConfirm }) {
    return (
        <div className="flex max-h-[15rem] max-w-[40rem] flex-col gap-[1.2rem]">
            <h3 className="text-3xl font-bold">Delete Quiz</h3>
            <p className="mb-[1.2rem] text-lg text-zinc-800">
                Are you sure you want to delete this quiz permamently? This
                action cannot be undone.
            </p>
            <div className="flex justify-end gap-6">
                <button
                    onClick={onCloseModal}
                    className="text-zinc-700 hover:text-zinc-900"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm?.()
                        onCloseModal()
                    }}
                    className="transition-color text-md rounded-md bg-red-700 px-[1.6rem] py-[0.8rem] font-bold text-gray-300 duration-200 hover:bg-red-800"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ConfirmDelete
