import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const headers = ['Vehicle name', 'Home plants and their population', 'Related pilot names']
export function Table_({ vehicleData }) {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headers.map(text =>
                                <TableCell style={{ fontWeight: '600' }}>{text}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{vehicleData.vehicleName}</TableCell>
                            <TableCell>
                                {vehicleData.populationPerPlanet ? (vehicleData.populationPerPlanet.map(populationPerPlanet => (populationPerPlanet + ', '))) : vehicleData.populationPerPlanet}
                            </TableCell>
                            <TableCell>
                                {vehicleData.vehiclePilotNames ? (vehicleData.vehiclePilotNames.map(vehiclePilotName => (vehiclePilotName + ', '))) : vehicleData.vehiclePilotNames}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
        </Paper >
    )
}