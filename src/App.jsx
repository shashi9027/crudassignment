import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import SimpleDialog from "./Components/Dialog";
import DeleteDialog from "./Components/DeleteDialog";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (e) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateOrUpdate = async (user) => {
    try {
      if (editingUser && editingUser.id) {
        await updateUser(editingUser.id, user);
      } else {
        await createUser(user);
      }
      setEditingUser(null);
      await loadUsers();
    } catch {
      setError("Operation failed");
    }
    setOpen(false);
  };

  const handleDelete = async (id) => {
   
    try {
      await deleteUser(id);
      await loadUsers();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="flex-item">
        <div>
         <h2>Users List </h2>
        </div>
        <button style={{background:"lightblue"}} onClick={() => {setEditingUser(null), setOpen(true)}}>
          Add User <span style={{ fontSize: 18 }}>+</span>
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <SimpleDialog open={open}>
         <UserForm
         initialData={editingUser}
         onSubmit={handleCreateOrUpdate}
         onCancel={() => {setEditingUser(null), setOpen(false)}}
        
        
         />
      </SimpleDialog>
      <SimpleDialog open={openDeleteDialog}>
        <DeleteDialog handleDelete={() => {handleDelete(editingUser.id), setOpenDeleteDialog(false)}} onClose={() => setOpenDeleteDialog(false)} />
      </SimpleDialog>
      <UserList setOpenDeleteDialog={setOpenDeleteDialog} setOpen={setOpen} users={users} onEdit={setEditingUser} />
    </div>
  );
}

export default App;
