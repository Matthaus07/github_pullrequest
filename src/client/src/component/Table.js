import React, { Fragment } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, CssBaseline
    , Grid, Box, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: '2em'
    },
    rootTabela: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    }
}));


export default function UserTable({ rows }) {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={12}>

                <Grid item xs={12}>
                    <Paper className={classes.rootTabela}>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>url Pull</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length > 0 ? (
                                    rows.map((row, i) => (
                                        <TableRow data-space="home" id="forn"

                                            key={row.id}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.username}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell>{row.createatpull}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>{row.urlpull}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan={3}>{rows[0]} No Users</td>
                                        </tr>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>

    )

}
