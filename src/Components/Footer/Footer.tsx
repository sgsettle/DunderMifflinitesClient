import React from 'react';
import './Footer.css';

import { TableFooter } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


export default class Footer extends React.Component {
    render(){
        return(
            <div id='footerDiv'>
                <TableFooter>
                    <h6 className='footerP'>Authors: <a className='linkName' href='https://www.linkedin.com/in/brad-dozier-956a09a4/' target='blank'><LinkedInIcon className='linkedInSymbol'/> Brad Dozier</a>, <a className='linkName' href='https://www.linkedin.com/in/katelynlockhart' target='blank'><LinkedInIcon className='linkedInSymbol'/> Kate Lockhart</a>, & <a className='linkName' href='https://www.linkedin.com/in/slayde-settle-b9547769/' target='blank'><LinkedInIcon className='linkedInSymbol'/> Slayde Settle</a>. </h6>
                    <h6 className='footerP'>© Copyright Dunder Mifflinites 2020. All rights reserved.</h6> 
                    <h6 className='footerP'>Disclaimer: We are not associated with The Office or NBC, nor do we claim any ownership or licensening. For fair use by fans only.</h6>
                </TableFooter>
            </div>
        )
    }
}