import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { BeatLoader } from 'react-spinners'

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'

import { API_URL } from '../layouts/constants'
import '../../assets/css/body.css'

export class NouveauProblem extends Component {

    state = {
        isLoading: false,
        allProblems: this.props.location.state,
        id: "",
        nom: "",
        description: "",
        priorite: -1,
        showModal: false
    }

    handleSubmit = (event) => {
        this.setState({isLoading: true})
        event.preventDefault()

        fetch(API_URL + 'update-problem/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                nom: this.state.nom,
                description: this.state.description,
                priorite: this.state.priorite,
                activate: true
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                showModal: true, 
                isLoading: false
            })
        })
        .catch((error) =>{
            console.log(error)
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <div>
                <Sidebar clicked="dashboard" />
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Listes des nouveaux problèmes</h5>
                            </CardTitle>

                            <CardBody className='CardBody' style={{padding: 0}}>
                                {
                                    this.state.isLoading
                                    ?
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <BeatLoader loading={this.state.isLoading} size={20} color="#ffa000" />
                                    </div>
                                    :
                                    <div style={{padding: 20}}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="service">Choisir le nouveau Problème</label>
                                                <select
                                                    className="form-control"
                                                    onChange={(event) => {
                                                        let pb = this.state.allProblems.filter((item) => item.nom===event.target.value)
                                                        
                                                        this.setState({
                                                            id: pb[0].id,
                                                            nom: event.target.value,
                                                        })
                                                    }}
                                                >
                                                    <option>---------</option>
                                                    {
                                                        this.state.allProblems.map((item, index) => {
                                                            return(
                                                                <option key={index} value={item.nom}>
                                                                    {item.nom}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            
                                        </div>
                                        
                                        <hr/>
                                        
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                            <div className="form-group">
                                                <div className="col-md-6">
                                                
                                                    <label htmlFor="autre">Nom</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Donnez un nom au type de problème"
                                                        value={this.state.nom}
                                                        onChange={(event) => this.setState({nom: event.target.value})}
                                                    />
                                                </div>
                                            </div>
                                                
                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <label htmlFor="probleme">Priorité</label>
                                                    <select className="form-control" id="probleme" onChange={(event) => this.setState({priorite: event.target.value})}>
                                                        <option value="-1">Inconnu</option>
                                                        <option value="0" >Normal</option>
                                                        <option value="1" >Urgent</option>
                                                        <option value="2" >Critique</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-12">
                                                    <label htmlFor="description">Description du problème rencontré</label>
                                                    <textarea 
                                                        className="form-control"
                                                        rows="5"
                                                        value={this.state.description}
                                                        onChange={(event) => this.setState({description: event.target.value})} 
                                                    />
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

                <Modal isOpen={this.state.showModal} toggle={() => this.setState({showModal: !this.state.showModal})}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        Ce problème a été mise à jour
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({showModal: !this.state.showModal})}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NouveauProblem
