import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList(){

    const [Trainings,setTrainings] = useState([]);
    const [CustomerLink, setCustomerLink] = useState('');
    const [Customer,setCustomer] = useState('');
    const [open,setOpen] = useState(false);

    const [columnDefs] = useState([
        { field: 'date', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { cellRenderer: params => getCustomer(params.value[2].href)},
        { cellRenderer: params => 
        <Button 
        size='small' 
        color='error'
        onClick={() => deleteTraining(params)}
        >
        Delete
        </Button>, width: 120}
    ])

    const deleteTraining = (params) => {
        if(window.confirm('Do you want to delete this Training?')){
        fetch(params.data.href, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                setOpen(true);
                getTrainings();
            }
                
            else {
                alert('Something went wrong with the deletion')
            }
        
        })
        .catch(err => console.error(err))
    }
    };

    const getTrainings = () => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings')
       .then(response => 
        { 
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request');
        })
       .then(data => setTrainings(data.content))
       .then(err => console.error(err))
    }

    const getCustomer = (params) => {
        setCustomerLink(params)
        fetch(CustomerLink)
       .then(response => 
        { 
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request');
        })
       .then(data => setCustomer(data.firstname+' '+data.lastname))
       .then(err => console.error(err))
    }

    

    useEffect(() => {
       getTrainings();
    }, []);

    return(
        <>
        <div 
        className='ag-theme-material' 
        style={{width: '90%', height: 600, margin: 'auto'}}>
            <AgGridReact
                rowData={Trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            >
            </AgGridReact>
            <Snackbar 
            open={open}
            message='Training deleted successfully'
            autoHideDuration={3000}  //milliseconds
            onClose={() => setOpen(false)}
            >
            </Snackbar>
            
        </div>        
        </>
    )
}

export default TrainingList;