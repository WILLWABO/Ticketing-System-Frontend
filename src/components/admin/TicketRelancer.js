
import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap"
import { BeatLoader } from 'react-spinners'

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'
import '../../assets/css/body.css'

class TicketRelancer extends Component {
    
    state = {
        isLoading: true,
        waitingTickets: [],
    }

    componentDidMount(){
        this.fetchTickets()
    }

    fetchTickets = () => {
        fetch(API_URL + "relanced-tickets/")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    waitingTickets: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => console.log(error))
    }

    render() {
        const { SearchBar } = Search
        return (
            <div>
                <Sidebar clicked="ticketRelance" />
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Tickets Relancés</h5>
                            </CardTitle>

                            <CardBody className='CardBody' style={{padding: 0}}>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <ToolkitProvider
                                        keyField="id"
                                        data={this.state.waitingTickets}
                                        columns={this.columns}
                                        search
                                    >
                                        {(props) => (
                                            <div>
                                                <div style={{flex: 1, display: 'flex', justifyContent: 'space-around'}}>
                                                <SearchBar {...props.searchProps} style={{fontFamily: 'Tauri'}} />
                                                </div>
                                                
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    {...props.baseProps}
                                                    noDataIndication="Aucun ticket n'est disponible pour l'instant"
                                                    bordered={true}
                                                    rowStyle={{}}
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )}
                                    </ToolkitProvider>
                                }
                                
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            </div>
        )
    }

    priorityFormatter = (cell, row) => {
        
        if (row.priorite === "Inconnu") {
            return(
                <span>
                    <strong style={{color: '#ce93d8', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Normal") {
            return(
                <span>
                    <strong style={{color: '#8bc34a', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Urgent"){
            return(
                <span>
                    <strong style={{color: 'red', fontSize: 18}}>{cell} </strong>
                </span>
            )
        }
        else if (row.priorite === "Critique") {
            return(
                <span>
                    <strong style={{color: '#c62828', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        
    }

    etatFormatter = (cell, row) => {
        if (row.etat === "Attribué"){
            return(
                <span>
                    <strong style={{color: 'blue', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else if (row.etat === "En cours de traitement"){
            return(
                <span>
                    <strong style={{color: 'green', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else if (row.etat === "En attente"){
            return(
                <span>
                    <strong style={{color: 'red', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else{
            return(
                <span>{cell} </span>
            )
        }
    }

    styles = {
        header:{
            fontFamily: 'Montserrat',
            fontSize: 16,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        }
    }

    columns = [
        {
            dataField: 'client',
            text: 'Client',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'service',
            text: 'Service',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_creation',
            text: 'Date de Création',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_created',
            text: 'Date de Relance',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'priorite',
            text: 'Priorité',
            sort: true,
            formatter: this.priorityFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'etat',
            text: 'Etat',
            sort: true,
            formatter: this.etatFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'nombre_relance',
            text: 'Nombre de Relance',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
    ]
    
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(TicketRelancer)

