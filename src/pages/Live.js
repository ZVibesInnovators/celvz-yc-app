import React from 'react';
import { LiveShow } from '../components/home/livePageStyles';
import { Button, Form, FormGroup, Input, Row, Col, Label } from "reactstrap";
import { FaPlay } from "react-icons/fa";




const Live = (props) => {
    return (
        <div  style={{ zIndex: 0 }}>
          <LiveShow>
        <Row className='mask'>
        <Col>
            <div>
                <div className='live-txt'>
                    <h2 className='big-txt mb-0 mt-5'>DISCOVER YOUR PURPOSE</h2>
                    <span className='youth-con'> Youth Conference</span>
                    <span className='youth-spy'>Showing Live</span>
                </div>
                <div id='box'></div>
                <Button onClick={() => window.open()}>
                <FaPlay />
                </Button>
            </div>
        </Col>
        <Col md={5}>
        <FormGroup>
        <input className="right"
               type="text" 
               id="comment" 
               name="comments"
               placeholder="comments">
               </input>
            {/* <button type="submit">SUBMIT</button> */}
        </FormGroup>
            
        </Col>
      </Row>
      </LiveShow>
    
      </div>
    )
    }
  
    export default Live



