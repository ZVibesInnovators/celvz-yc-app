import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import "../../components/Register.css";

const Register = (props) => {
    // const [isAuth, setIsAuth] = useContext(AuthContext);

    // useEffect(() => setIsAuth(false), [])
 
    return (
        <div className='rtn'>
           <div className='rtn-4'>
             <div className='rtn-3' style={{
                 display: 'block', width: 550, color: 'white'
             }}>
                 <div style={{marginLeft: 120}}>
                 <h2 className='sine'>SIGN UP</h2>
                 <p style={{color: '#D3006C'}}>Welcome To The Love Family</p>
                 </div>
                 <Form className='form-group'>
                     <FormGroup>
                         
                         <Input className='handle'type='email' name='email' id='emailField' placeholder='Handle/Email'/>
                     </FormGroup>
                     <FormGroup>
                         
                         <Input className='pass-word' type='password' name='password' id='passwordField' placeholder='password' />
                     </FormGroup>
                     <Button className='sine-1' style={{background: '#D3006C'}}>SIGN UP</Button>
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

export default Register