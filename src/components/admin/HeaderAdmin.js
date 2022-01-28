import React, { Component } from 'react'
import { FaUserCircle, FaBell } from 'react-icons/fa'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap"
import { API_URL } from '../layouts/constants'
import { Link} from 'react-router-dom'
import '../../assets/css/header.css'

class Header extends Component {
    
    state = {
        stats: {},
        problems: []
    }

    componentDidMount(){
        this.fetchStats()
        this.fetchNewProb()
    }

    fetchStats = () => {
        fetch(API_URL + "admin-stats/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                stats: responseJson,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    fetchNewProb = () => {
        fetch(API_URL + "new-problems/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                problems: responseJson.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="head">
                <div className="container-fluid" style={{padding: 0, margin: 0, flex: 1, display: 'flex', justifyContent: 'center', height:5}}>
                        {
                            this.state.problems.length !== 0 && (
                                <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                                    <FaBell className="heart" size={25} />
                                    <Link 
                                        className="notif"
                                        to={{
                                            pathname: "/admin/new-problem",
                                            state: this.state.problems
                                        }}
                                    >
                                        {this.state.problems.length} 
                                    </Link>
                                    
                                </div>
                                
                            )
                        }     
                </div>
                
                <div className="header pb-8 pt-5 pt-md-8">
                    <Container fluid>
                        <div className="header-body">
                        {/* Card stats */}
                            <Row>
                                <Col lg="3" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0" style={{ backgroundColor: 'rgb(255 193 7 / 50%)'}}>
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase-text-muted-mb-0" >
                                                    Nouveaux Tickets
                                                </CardTitle>
                                                <span className="h3 font-weight-bold mb-0">
                                                {this.state.stats.num_new_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>
                                
                                <Col lg="3" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0" style={{ backgroundColor: 'rgb(23 162 184 / 50%)'}} >
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase-text-muted-mb-0" >
                                                    Tickets en attente
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                {this.state.stats.num_wait_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="3" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0" style={{ backgroundColor: 'rgb(0 123 255 / 50%)'}} >
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase-text-muted-mb-0" >
                                                    Tickets relancés
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                {this.state.stats.num_rel_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>

                                <Col lg="3" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0" style={{ backgroundColor: 'rgb(255 160 0 / 50%)'}} >
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h6" className="text-uppercase-text-muted-mb-0" >
                                                    Techniciens
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {this.state.stats.num_tech_tik}
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(Header)
