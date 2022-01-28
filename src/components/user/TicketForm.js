import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Redirect } from 'react-router-dom'
import Sidebar from './SidebarUser'
import Header from './HeaderUser'
import { BeatLoader } from 'react-spinners'

import { API_URL } from '../layouts/constants'
import { connect } from 'react-redux'
import axios from 'axios'
import '../../assets/css/body.css'

class TicketForm extends Component {
    
    state = {
        isLoading: true,
        allServices: [],
        allProblems: [],
        selectedRow: {},
        urlService:"",
        urlProblem:"",
        visible: false,
        description:"",
        finish: false,
        newProbleme: "",
        showModal: false,
        showModal2: false,
        image: null,
        fichier: null,
        source: null
        // urgence: null,
        // dateEcheance: null,
        // priorite: null,
        // impact: null,
    }

    componentDidMount(){
        this.fetchServices()
        this.fetchProblems()
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleFileChange= (e) => {
        this.setState({
            fichier: e.target.files[0]
        })
    }

    handleChangeSource = (event) => {
        this.setState({source: event.target.source})
    }

    // handleDateEcheance= (e) => {
    //     this.setState({
    //         dateEcheance: e.target.value
    //     })
    // }

    // handleChangeUrgence = (event) => {
    //     this.setState({urgence: event.target.urgence})
    // }

    // handleChangeImpact = (event) => {
    //     this.setState({impact: event.target.impact})
    // }

    // handleChangePriorite = (event) => {
    //     this.setState({priorite: event.target.priorite})
    // }

 
    
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

    fetchProblems = () => {
        fetch(API_URL + "probleme/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                allProblems: responseJson,
                isLoading: false
            })
            
        })
        .catch((error) => console.log(error))
    }

    handleProblem = (event) => {
        this.setState({isLoading: false})
        event.preventDefault()
        fetch(API_URL + 'probleme/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.newProbleme,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({showModal: false})
            this.fetchProblems()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleSubmit = (event) => {
        this.setState({isLoading: true})
        event.preventDefault()
        console.log(this.state)

        let form_data = new FormData()
        form_data.append('description', this.state.description)
        form_data.append('service', this.state.urlService)
        form_data.append('probleme', this.state.urlProblem)
        // form_data.append('urgence', this.state.urgence)
        // form_data.append('date_echeance', this.state.dateEcheance)
        form_data.append('source', this.state.source)
        // form_data.append('priorite', this.state.priorite)
        // form_data.append('impact', this.state.impact)
        form_data.append('client', API_URL + 'client/' + this.props.user.id + '/')
        form_data.append('etat', "Nouveau")
        if(this.state.image !== null) {
            form_data.append('uploadImage', this.state.image, this.state.image.name)
        }
        if(this.state.fichier !== null) {
            form_data.append('uploadFile', this.state.fichier, this.state.fichier.name)
        }
        let url = 'http://localhost:8000/api/ticket/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isLoading: false,
                showModal2: true,
            })
        })
        .catch((error) =>{
            console.log(error)
            this.setState({
                isLoading: false
            })
        })
    }

    handleModal = () => this.setState({showModal: !this.state.showModal})

    handleModal2 = () => {
        this.setState({
            showModal2: !this.state.showModal2,
            finish: true
        })
    }

    render() {
        return (
            this.state.finish
            ?
            <Redirect to="/user/dashboard" />
            :
            <div>
                <Sidebar />
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Formulaire de création de ticket</h5>
                            </CardTitle>

                            <CardBody>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <div>
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label htmlFor="service">Service</label>
                                                        <select className="form-control" id="service" required onChange={(event) => this.setState({urlService: event.target.value})}>
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
                                                    <div className="col-md-6">
                                                        <label htmlFor="probleme">Type de Problème</label>
                                                        <select className="form-control" id="probleme" required onChange={(event) => {
                                                            if(event.target.value === "autre"){
                                                                this.setState({showModal: true})
                                                            }
                                                            else{
                                                                this.setState({
                                                                    urlProblem: event.target.value,
                                                                    visible: false
                                                                })
                                                            }
                                                            
                                                        }}>
                                                            <option>---------</option>
                                                            {
                                                                this.state.allProblems.map((item, index) => {
                                                                    return(
                                                                        <option key={index} value={item.url}>
                                                                            {item.nom}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                            <option value="autre" >Autres</option>
                                                        </select>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                            <div>
                                                <label> Ajouter une image  
                                                    <input type="file"
                                                    id="image"
                                                    accept="image/*"  onChange={this.handleImageChange}/>
                                                </label>
                                            </div>
                                            <div>
                                                <label> Ajouter un fichier  
                                                    <input type="file"
                                                    id="fichier"
                                                    accept="fichier/*"  onChange={this.handleFileChange}/>
                                                </label>
                                            </div>
                                            {/* <div>
                                                <div>
                                                    <label>Urgence 
                                                        <select value={this.state.value} onChange={this.handleChangeUrgence}>
                                                            <option value="Moyenne">Moyenne</option>
                                                            <option value="Tres haute">Très haute</option>
                                                            <option value="Haute">Haute</option>
                                                            <option value="Basse">Basse</option>
                                                            <option value="Tres basse">Très basse</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>Impact
                                                        <select value={this.state.value} onChange={this.handleChangeImpact}>
                                                            <option value="Moyen">Moyen</option>
                                                            <option value="Tres haut">Très haut</option>
                                                            <option value="Haut">Haut</option>
                                                            <option value="Bas">Bas</option>
                                                            <option value="Tres bas">Très bas</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>Priorité
                                                        <select value={this.state.value} onChange={this.handleChangePriorite}>
                                                            <option value="1">Moyenne</option>
                                                            <option value="-1">Basse</option>
                                                            <option value="0">Très basse</option>
                                                            <option value="2">Haute</option>
                                                            <option value="3">Très haute</option>
                                                            <option value="4">Majeur</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </div>  */}
                                            <div>
                                                <label>Source
                                                    <select value={this.state.value} onChange={this.handleChangeSource}>
                                                        <option value="3">Autre</option>
                                                        <option value="-1">Téléphone</option>
                                                        <option value="0">E-mail</option>
                                                        <option value="1">Dircete</option>
                                                        <option value="2">Manuscrite</option>
                                                    </select>
                                                </label>
                                            </div>
                                            {/* <div>
                                                <label>
                                                    Date échéance
                                                    <input type="datetime-local" onChange={this.handleDateEcheance}/>
                                                </label>
                                            </div> */}
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="description">Décrivez brièvement le problème rencontré</label>
                                                        <textarea className="form-control" id="description" rows="5" required  onChange={(event) => this.setState({description: event.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{width: 300}}>Créer</button>
                                        </form>

                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <Modal isOpen={this.state.showModal} toggle={this.handleModal}>
                    <ModalHeader toggle={() => this.setState({showModal: false})}>Signalez le type problème</ModalHeader>
                    <ModalBody>
                        
                        <div className="form-group">
                            <div className="col-xs-2">
                            
                                <label htmlFor="autre">Problème</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Donnez un nom au type de problème"
                                    onChange={(event) => this.setState({newProbleme: event.target.value})}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleProblem}>Valider</Button>
                        <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.showModal2} toggle={this.handleModal2}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        <span style={{textAlign: 'center'}}>
                        Le nouveau Ticket a été crée et envoyé à <br/> <strong>l'Administrateur du Système</strong>
                        </span>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleModal2}>Fermer</Button>
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

export default connect(mapStateToProps)(TicketForm)
