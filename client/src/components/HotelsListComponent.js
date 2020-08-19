import React, {Component} from 'react';
import {Button, Container,Card,Grid,Image,Rating,Header} from 'semantic-ui-react';

class HotelsList extends Component{
    constructor(props){
        super(props);
        this.state={
            reviews:[]
        }
    }
    handleReview(hotelId){

        console.log(hotelId);
        let reviews=[];
        var url="http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id="+hotelId;
        console.log(url);
        fetch(url)
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
            reviews=response;
            console.log(reviews);
            this.setState({reviews:response});
        })
        .catch(error =>  {
            alert("Your request was not successful. Please try again.");
        });
    }
    render(){
        const reviews=this.state.reviews.map((review,index)=>{
            return(
                <li key={index}>{review.comment}</li>
            );
        })
        console.log(reviews);
        const hotels=this.props.hotels.map((hotel)=>{
            return(
                <Grid.Column computer={5} mobile={16} key={hotel.id}>
                    <Card>
                        <Image src={hotel.images[0]} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{hotel.name}</Card.Header>
                            <Card.Meta>
                                <Rating icon='star' defaultRating={hotel.stars} maxRating={5} />
                                <div>{hotel.city},{hotel.country} </div>
                                <div>Price: Rs.{hotel.price}</div>
                            </Card.Meta>
                            <Card.Description>
                                {
                                    hotel.description.substring(0,150)+"..."
                                }
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button onClick={() => this.handleReview(hotel.id)}>Show reviews</Button>
                            <ul>
                            {
                                this.state.reviews.map((review,index)=>{
                                    if(review.hotel_id===hotel.id){
                                        return(
                                            <li key={index}>{review.comment} - {review.name}</li>
                                        );
                                    }
                                 })
                            }
                            </ul>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            );
        })
        if(this.props.hotelLoading === 'false'){
            return(
                <Container className="error-message">
                    <Header as="h1" inverted>Please navigate to Home page and press Load hotels button.</Header>
                </Container>
            )
        }
        else if(this.props.hotelLoading === 'true' ){
            return(
                <Container className="error-message">
                    <Header as="h1" inverted>Loading....</Header>
                </Container>
            )
        }
        return(
            <Container>
                <Grid>
                    <Grid.Row>
                        {hotels}
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default HotelsList;