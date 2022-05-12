import React, { useContext, useEffect } from 'react'
import "../../components/Sign.css";
import { AuthContext } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    FormGroup, Label, Input, Button, Form} from 'reactstrap';





const Sign = (props) => {
    const [isAuth, setIsAuth] = useContext(AuthContext);

    useEffect(() => setIsAuth(false), [])
 
    return (
        <div className='rtn'>
           <div className='rtn-1'>
             <div className='rtn-2' style={{
                 display: 'block', width: 550, color: 'white'
             }}>
                 <h2 className='sine'>SIGN IN</h2>
                 <p style={{color: '#D3006C'}}>Welcome To The Love Family</p>
                 <Form className='form-group'>
                     <FormGroup>
                         
                         <Input className='handle'type='email' name='email' id='emailField' placeholder='Handle/Email'/>
                     </FormGroup>
                     <FormGroup>
                         
                         <Input className='pass-word' type='password' name='password' id='passwordField' placeholder='password' />
                     </FormGroup>
                     <Button className='sine-1' style={{background: '#D3006C'}}>SIGN IN</Button>
                     {/* <p className='text-center'>
                         <link to="/signup">
                             Don't Have An Account? <span className='text-sign'>Sign Up</span>
                         </link>
                     </p> */}
                 </Form>
             </div>
           </div>
        </div>
    )
}

export default Sign