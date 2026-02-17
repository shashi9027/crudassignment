
export default function DeleteDialog({handleDelete, onClose}) {
    return (
        <div>
            <h3>Are you sure you want to delete this user?</h3>

            <button style={{ background: "lightblue" }} onClick={handleDelete}>Yes</button>
            <button onClick={onClose} style={{ marginLeft: 10 }}>
                No            
            </button>

        </div>

    )
}

