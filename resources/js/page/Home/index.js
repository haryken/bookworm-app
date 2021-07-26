import React, { PureComponent } from 'react'
import Onsale from './Onsale';
import Feature from './Feature';
import {Col,Container,Row,Button, Card} from 'react-bootstrap';

export default class Home extends PureComponent {

  render() {
    return (
      <>
        <Container>
          <Row>
                <Onsale/>
          </Row>
          <Row>
                <Feature/>
          </Row>
        </Container>
        
      </>
    )
  }
}
