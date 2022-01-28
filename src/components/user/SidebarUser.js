import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaDesktop, FaSignOutAlt, FaSpinner, FaUserCircle } from 'react-icons/fa'
import { BsFileEarmarkCheck, BsFileEarmarkDiff } from 'react-icons/bs'
import '../../assets/css/sidebar.css'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class SidebarUser extends Component {
    constructor(props){
        super(props)
        this.state =  {
            navState : false
        }
    }
    render() {
        return(
            <div>
                <div style={styles.user}>
                    <FaUserCircle color='white' size={30} />
                    <p style={styles.text}>{this.props.user.nom} {this.props.user.prenom} </p>
                    <p style={styles.text}>Utilisateur</p>
                </div>
                <nav id="nav" >
                <ul className={`side-nav ${this.state.navState ? 'active' : ''}`}>
                    <li className="link row" >
                        <FaDesktop color='#ffc107' size={16} style={{marginTop: 6}} />
                        <Link to="/user/dashboard" style={styles.links}>Dashboard</Link>
                    </li>
                    
                    <li className="link row">
                        <FaSpinner color='#17a2b8' size={16} style={{marginTop: 6}} />
                        <Link to="/user/ticket-en-attente" style={styles.links}>Tickets en attente</Link>
                    </li>
                    
                    <li className="link row">
                        <BsFileEarmarkCheck color='#00FF00' size={16} style={{marginTop: 6}} />
                        <Link to="/user/ticket-resolu" style={styles.links}>Tickets résolus</Link>
                    </li>

                    <li className="link row">
                        <BsFileEarmarkDiff color='#007bff' size={16} style={{marginTop: 6}} />
                        <Link to="/user/ticket-relancer" style={styles.links}>Tickets relancés</Link>
                    </li>
                    
                    <li className="link row">
                        <FaSignOutAlt color='red' size={16} style={{marginTop: 6}} />
                        <Link to="/" style={styles.links}>
                            <span onClick={() => {
                                this.props.save_user({
                                    authentifie: false,
                                    userType: "",
                                    id: "",
                                    nom: "",
                                    prenom: "",
                                    email: "",
                                    url: ""
                                })
                            }}>
                                Déconnecter
                            </span>
                        </Link>
                    </li>
                </ul>
                    <button className='mob' onClick={() => this.setState({navState:!this.state.navState}) } >Menu</button>
                </nav>
 
            </div>
        )
    }
}

const styles = {
    links:{
        textDecoration: 'none',
        margin: 0,
        color: 'white'
    },

    user:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B2F62'
    },

    text:{
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontWeight: 'bold',
        margin: 0,
        color: 'white'
    },
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        save_user : (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUser)
