import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  

  return (
    <Dialog  onClose={handleClose} open={open}>
       <DialogContent sx={{ p: 3 }}>
        {props.children}
    </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
