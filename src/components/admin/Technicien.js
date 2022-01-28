import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap"
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { API_URL } from '../layouts/constants'
import '../../assets/css/body.css'

export default class Technicien extends Component {
    
    state = {
        isLoading: true,
        allTechnicians: [],
        selectedRow: {}
    }

    componentDidMount(){
        this.fetchTechnicians()
    }

    fetchTechnicians = () => {
        fetch(API_URL + "techniciens/")
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({
                    allTechnicians: responseJson.data,
                    isLoading: false
                })
            }
        })
        .catch((error) => {
            this.setState({isLoading: false})
            console.log(error)
        })
    }

    render() {
        const { SearchBar } = Search
        return (
            <div>
                <Sidebar clicked="technicien" />
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Techniciens</h5>
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
                                        data={this.state.allTechnicians}
                                        columns={this.columns}
                                        search
                                    >
                                        {(props) => (
                                            <div>
                                                <div style={{flex: 1, display: 'flex', justifyContent: 'space-around'}}>
                                                    <button
                                                        style={this.styles.button}
                                                    >
                                                        <Link to="/admin/new-technicien" style={{textDecoration: 'none', color: 'white'}}>Nouveau Technicien</Link>
                                                    </button>
                                                    
                                                    <SearchBar {...props.searchProps} style={{fontFamily: 'Tauri'}} />
                                                </div>
                                                
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    {...props.baseProps}
                                                    noDataIndication="Aucun technicien n'est disponible pour l'instant"
                                                    bordered={true}
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
    
    styles = {
        header:{
            fontFamily: 'Montserrat',
            fontSize: 17,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        },

        button:{
            backgroundColor: '#ffa000',
            color: 'white',
            width: 200,
            height: 40,
            marginRight: 50,
            borderRadius: 5,
            fontFamily: 'Montserrat',
            fontSize: 16
        }
    }

    columns = [
        {
            dataField: 'nom',
            text: 'Nom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'prenom',
            text: 'Prénom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_inscription',
            text: "Date d'Incription",
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
            dataField: 'number_ticket',
            text: 'Ticket en cours',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
    ]
    
}

