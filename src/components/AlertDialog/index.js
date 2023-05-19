import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog( {open, onClose, action, title, description, firstBtnText, secondBtnText} ) {

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            {
              firstBtnText
                ? <Button onClick={onClose}>{firstBtnText}</Button>
                : null
            }           

            {
              secondBtnText
                ? <Button onClick={action} autoFocus>{secondBtnText}</Button>
                : null
            }
            
          </DialogActions>
        </Dialog>
      </>
    )
  }