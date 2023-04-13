import React from 'react'
import { NavLink } from 'react-router-dom'

function Pnf(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className='display-3 text-danger'>404 Error</h3>
                    <h5 className='display-5 text-warning'>Requested path not found</h5>
                    <NavLink to={`/`} className="btn btn-outline-secondary">Back to Home</NavLink>

                </div>
            </div>
        </div>
    )
}
export default Pnf