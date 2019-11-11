import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, CssBaseline
    , Grid, Fade, CircularProgress, Button, InputBase, IconButton, Box, Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UserTable from '../component/Table';
import api from '../config/config_api';
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
        cursor: 'pointer',
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        margin: theme.spacing(1),
    },
    background: {
        background: 'white'
    }
}));


function analisarResposta(response) {

    if (!response.ok) {

        let mensagemErro = 'There was an error performing remote query.';

        if (response.status === 404) {
            mensagemErro = 'The repository was not found.';
        }

        throw new Error(mensagemErro);
    }
    return response.json();
}

function parseJsonResponse(jsonResponse) {
    return jsonResponse.map(row => {
        return {
            id: row.id,
            username: row.user.login,
            title: row.title,
            state: row.state,
            createatpull: row.created_at,
            urlpull: row.url
        }
    });
}

export default function App() {
    //Using react rooks
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [records, setRecords] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const [termoPesquisa, setTermoPesquisa] = useState('yahoo/kafka-manager');

    const list_pullrequest = () => {
        return api.get('list')
            .then(rows => {
                setRecords(rows.data.data);
                console.log(rows.data.data)
            })
    }
    const gravarPullRequests = async (e) => {

        const data = rows.filter(i => {
            return selectedID === i.id
        })
        api.post('/create', {
            data: qs.stringify(data[0])
        })
            .then(resp => {
                alert("Save Success!")
            })
            .then(() => list_pullrequest())
    };

    useEffect(() => {
        list_pullrequest()
    }, [])

    const consultarPullRequests = async e => {

        // clear lists of pull request
        setRows([]);

        // Endpoint search for url
        const apiEndpoint = `https://api.github.com/repos/${termoPesquisa}/pulls`;

        // initial search
        setLoading(true);

        // query pull requests in github API and render in table
        fetch(apiEndpoint)
            .then(analisarResposta)
            .then(parseJsonResponse)
            .then(rows => {
                setLoading(false);
                setRows(rows);
            })
            .catch(erro => {
                setLoading(false);
                console.log(erro);
            });
    };

    const searchHandle = e => {
        setTermoPesquisa(e.target.value);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.wrapper}>
                <Box component="h2">
                    Search pull request list
                </Box>
                <Typography>Example: input(User+Repository) </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Repository"
                                value={termoPesquisa}
                                onChange={searchHandle} />
                            <Fade unmountOnExit
                                in={loading}
                                style={{
                                    transitionDelay: loading ? '800ms' : '0ms'
                                }}>
                                <CircularProgress />
                            </Fade>
                            <IconButton className={classes.iconButton} aria-label="search" onClick={consultarPullRequests}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.rootTabela}>
                            <Table className={classes.table} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>url Pull</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, i) => (
                                        <TableRow data-space="home" id="forn"
                                            onClick={() => {
                                                setSelectedID(row.id);
                                            }}
                                            selected={selectedID === row.id}
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
                                            <TableCell><Box component='a' href={row.urlpull}>Click Here</Box></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Button item xs={6} variant="contained" color="primary" className={classes.button}
                            disabled={rows.length === 0} onClick={gravarPullRequests}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <Box component="h2">
                    Table users</Box>
                <UserTable rows={records} />
            </Container>
        </React.Fragment>
    );
}
