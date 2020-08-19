import React, {Component} from 'react';
import { Menu,Container,Icon,Responsive,Dropdown } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
   
    render() {
        return(
            <Menu secondary pointing inverted size="massive">
                    <Container>
                        <NavLink to="/home" activeClassName="active">
                            <Responsive as={Menu.Item} minWidth={790}
                                name='home'> 
                                        <Icon name='home'  />Home
                            </Responsive>
                        </NavLink>
                        
                        <Responsive as ={Menu.Menu} maxWidth={789}  position='right'>
                            <Dropdown
                                item
                                icon ='bars'
                                >
                                <Dropdown.Menu>
                                    <NavLink to="/home"><Dropdown.Item text="Home" secondary className="mobile-dropdown"/></NavLink>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Responsive>
                    </Container>
                </Menu>
        );
    }
  }
  
export default Header;