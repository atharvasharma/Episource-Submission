import React, {Component} from 'react';
import {Button, Container,Image, Grid,Header} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


class Home extends Component{
    constructor(props){
        super(props);
        this.handleHotels=this.handleHotels.bind(this);
        
    }
    handleHotels(){
        let data=[];
        this.props.hotelLoading("true");
        fetch("http://fake-hotel-api.herokuapp.com/api/hotels?count=5")
        .then(response => {
            if (response.ok) {
                return response;
            }else {
                var error = new Error('Error ' + response.status + ': ' + response.errmsg);
                error.response = response;
                throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((response)=>{
            data=response;
            this.props.onClicking(data);
        })
        .catch(error =>  {
            this.props.hotelLoading("false");
            alert("Your request was not successful. Please try again.");
        });

    }
    
    render(){
        return(
            
            <Container className="home-container">
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={12}>
                            <Header as='h1'>Click on the button to see the hotels!</Header>
                        </Grid.Column>
                        <Grid.Column computer={9} mobile={12}>
                            <Image src="./undraw_travel_booking_6koc.svg" wrapped ui={false} className="home-page-image"/>
                            
                        </Grid.Column>
                        <Grid.Column computer={7} mobile={12} className="hotel-button">
                            <NavLink to="/hotels"><Button onClick={this.handleHotels} size="massive" color="violet">Load Hotels</Button></NavLink>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
        
        
    }
}
export default Home;