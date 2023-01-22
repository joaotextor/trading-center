import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog( {open, onClose, action, description} ) {

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Disagree</Button>
            <Button onClick={action} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }