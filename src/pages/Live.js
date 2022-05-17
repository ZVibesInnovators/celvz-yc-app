import React from 'react';
import { Col, Row } from 'reactstrap';
import { LiveShow } from '../components/home/livePageStyles';
import Footer from '../components/Footer';



const Live = (props) => {
    return (
        <div>
      <LiveShow>
        <Row className='mask'>
        <Col>
            <div>
                <div className='live-txt'>
                    <h2 className='big-txt mb-0 mt-5'>DISCOVER YOUR PURPOSE</h2>
                    <span className='youth-con'> Youth Conference</span>
                </div>
            </div>
        </Col>
      </Row>
      </LiveShow>
      <Footer />
      </div>
    )
    }
  
    export default Live



