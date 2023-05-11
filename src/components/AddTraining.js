import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setTraining({...training, customer: props.data.links[0].href});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setTraining(currTraining => ({...currTraining, date: training.date.toISOString()}));
        //gets training from CustomerList
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date: new Date(),
            duration: '',
            activity: '',
            customer: ''
        });
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>ADD TRAINING</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    
                    
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            date={training.date}
            onChange={(newValue) => {
                setTraining({...training, date: newValue});
            }}
            format="DD.MM.YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>

                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTraining;