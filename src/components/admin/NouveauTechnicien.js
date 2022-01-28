import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Redirect } from 'react-router-dom'
import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import { BeatLoader } from 'react-spinners'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'
import '../../assets/css/body.css'

export class NouveauTechnicien extends Component {
    
    state = {
        allServices: [],
        isLoading: true,
        nom: "",
        prenom: "",
        email: "",
        service: "",
        role: "Technicien",
        password: "1234",
        showModal: false,
        finish: false
    }

    componentDidMount(){
        this.fetchServices()
    }

    fetchServices = () => {
        fetch(API_URL + "service/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                allServices: responseJson,
                isLoading: false
            })
            
        })
        .catch((error) => console.log(error))
    }

    handleSubmit = (event) => {
        this.setState({isLoading: true})
        event.preventDefault()
        fetch(API_URL + 'technicien/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                service: this.state.service,
                role: "Technicien",
                password: "1234",
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isLoading: false,
                showModal: true,
            })
        })
        .catch((error) =>{
            console.log(error)
            this.setState({
                isLoading: false
            })
        })
    }

    handleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
            finish: true
        })
    }

    render() {
        return (
            this.state.finish
            ?
            <Redirect to="/admin/technicien" />
            :
            <div>
                <Sidebar />
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Formulaire d'inscription d'un Technicien</h5>
                            </CardTitle>

                            <CardBody className='CardBody' style={{padding: 0}}>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <div>
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                            
                                            <div className="form-group" >
                                                <div className="col-md-6">
                                                    <label>Nom</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nom"
                                                        value={this.state.nom}
                                                        onChange={(event) => this.setState({nom: event.target.value})}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <label>Prénom</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Prénom"
                                                        value={this.state.prenom}
                                                        onChange={(event) => this.setState({prenom: event.target.value})}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.setState({email: event.target.value})}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <label>Service</label>
                                                    <select className="form-control" id="service" onChange={(event) => this.setState({service: event.target.value})}>
                                                        <option>---------</option>
                                                        {
                                                            this.state.allServices.map((item, index) => {
                                                                return(
                                                                    <option key={index} value={item.url}>
                                                                        {item.nom}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{width: 300, marginLeft: 15}}>Créer</button>
                                        </form>

                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>
                
                <Modal isOpen={this.state.showModal} toggle={this.handleModal}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        Le nouveau Technicien a été crée
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleModal}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(NouveauTechnicien)
