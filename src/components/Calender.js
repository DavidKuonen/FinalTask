import React, {useState, useEffect} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';



function Calender(){

    const [trainings, setTrainings] = useState([]);

    const locales = {
        'en-US': require('date-fns/locale/en-US'),
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });

    const getTrainings = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
       .then(response => 
        { 
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request');
        })
       .then(data => setTrainings(data))
       .then(err => console.error(err))
    }

    useEffect(() => {
        getTrainings();
    }, []);


    return (
        <div>
            <h1 style={{textAlign: 'center'}} >Calendar</h1>
            <Calendar
                localizer={localizer}
                events={trainings} 
                startAccessor="start"
                endAccessor="end"
                titleAccessor={event => event.activity + " / " + event.customer}
                style={{ height: 1000, margin: '50px' }}               
            />
        </div>
    );

}
export default Calender;