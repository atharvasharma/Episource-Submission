import React, {Component} from 'react';
import Header from './HeaderComponent';
import {Switch,Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import HotelsListComponent from './HotelsListComponent';

class Main extends Component{
    
    constructor(props){
        super(props);
        this.state={
            data:[],
            dataLoading:"false"
        }
    }
    onClicking(data,reviews){
        this.setState({
            data:data,
            dataLoading:"completed"
        })
    }
    hotelLoading(dataLoading){
        this.setState({
            dataLoading:dataLoading
        })
    }
    render(){
        
        return(
            <React.Fragment>
                    <Header></Header>
                    <Switch>
                        <Route path="/home" component={()=><Home onClicking={(data)=>this.onClicking(data)} hotels={this.state.data} hotelLoading={(dataLoading)=>this.hotelLoading(dataLoading)}/>}></Route>
                        <Route path="/hotels" component={()=><HotelsListComponent onClicking={(data)=>this.onClicking(data)} hotels={this.state.data} hotelLoading={this.state.dataLoading}/>}></Route>
                        <Redirect to="/home"></Redirect>
                    </Switch>
                
            </React.Fragment>
            
        );
    }
}

export default Main;