import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import _ from 'lodash';

function Statistics() {
    const [actGroupedData, setActGroupedData] = useState([]);

    /**
     * Calculate the sum of the time spent on each activity
     * @param {List of the trainings} data 
     */
    const handleStatsActivity = (data) => {
        const grouped = _.groupBy(data, 'activity');
        const result = _.map(grouped, (group, key) => ({
            activity: key,
            duration: _.sumBy(group, 'duration')
        }));
        setActGroupedData(result);
    }

    useEffect(() => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
        .then(response => 
            { 
            if(response.ok)
                return response.json();
            else
                alert('Something went wrong in GET request');
            })
           .then(data => handleStatsActivity(data))
           .then(err => console.error(err))
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Statistics</h1>       
                <h2>Duration per activity</h2>
                <BarChart width={800} height={600} data={actGroupedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
        </div>
    );
};

export default Statistics;