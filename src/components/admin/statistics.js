import React, { Component } from 'react'
import { Card, CardBody, CardTitle, } from "reactstrap";

import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'
import '../../assets/css/body.css'

export default class Statistics extends Component {
    render() {
        return (
            <div>
                <Sidebar clicked="statistic"/>
                <div className="child-grid-container" style={{marginLeft:0}}>
                    <Header />
                    <div className="container-fluid" style={{backgroundColor: '#f8f7f3'}}>
                        <Card className="shadow" style={{backgroundColor:'#f8f7f3', border: 'none'}}>
                            <CardTitle className="border-0">
                            <h5 className="mb-0" style={{margin:0, textAlign:'center'}}>Statistiques</h5>
                            </CardTitle>

                            <CardBody className='CardBody' style={{padding: 0}}>
                                <p>Test</p>
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            </div>
        )
    }
}

