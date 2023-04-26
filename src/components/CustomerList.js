import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList(){

    const [Customers,setCustomers] = useState([]);
    const [open,setOpen] = useState(false);

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true },
        { cellRenderer: params => 
        <Button 
        size='small' 
        color='error'
        onClick={() => deleteCustomer(params)}
        >
        Delete
        </Button>, width: 120}
    ])

    const deleteCustomer = (params) => {
        if(window.confirm('Do you want to delete this Customer?')){
        fetch(params.data.href, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                setOpen(true);
                getCustomers();
            }
                
            else {
                alert('Something went wrong with the deletion')
            }
        
        })
        .catch(err => console.error(err))
    }
    };

    const getCustomers = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
       .then(response => 
        { 
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request');
        })
       .then(data => setCustomers(data.content))
       .then(err => console.error(err))
    }

    useEffect(() => {
       getCustomers();
    }, []);

    return(
        <>
        <div 
        className='ag-theme-material' 
        style={{width: '90%', height: 600, margin: 'auto'}}>
            <AgGridReact
                rowData={Customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            >
            </AgGridReact>
            <Snackbar 
            open={open}
            message='Customer deleted successfully'
            autoHideDuration={3000}  //milliseconds
            onClose={() => setOpen(false)}
            >
            </Snackbar>
            
        </div>        
        </>
    )
}

export default CustomerList;