import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { requestVehiclePopulationPilot, requestPopulationList } from "../../utils/Utils";
import { Table_ } from "./Table_";
import { BarChart } from "./BarChart";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        display: "inline"
    }
}));

function MainContent({ content }) {
    const classes = useStyles();
    const [vehicle, setVehicle] = useState([]);
    const [populationList, setPopulationList] = useState([]);

    const getTableData = async () => {
        const data = await requestVehiclePopulationPilot();
        setVehicle(data);
    }
    const getPopulationList = async () => {
        const data = await requestPopulationList();
        setPopulationList(data);
    }

    useEffect(() => {
    }, [content]);

    useEffect(() => {
        getPopulationList()
            .then()
            .catch(err => console.log(err));
        getTableData()
            .then()
            .catch(err => console.log(err));
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    return (
        <>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>{content}</h1>
                {content === 'Table' ?
                    <Table_ vehicleData={vehicle} />
                    : <BarChart populationPlanetData={populationList} />}
            </main>
        </>
    )
}
export default MainContent;