
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import key from '../token/key'
import Search from './Search'

//const URL = 'https://api.spotify.com'

function Music(props) {
    const [artist,setArtist] = useState([])

    const searchArtist = async (artistName) => {
        await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}` //auth keyword
            }
            }).then(res => res.json())
            .then(out =>{
                console.log('out=',out)
                setArtist(out.artists.items)
            })
            .catch(err =>console.log(err.message))
        }

    //react hook->used to call data on mounting stage
    useEffect(()=> {
        searchArtist('SPB')
    },[])
return( 
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className='display-3 text-success'>Spotify Music Player</h3>
            </div>
        </div>
        <Search findArtist={searchArtist} />
        <div className='row'>
        {
            artist && artist.map((item,index)=>{
                const { id, name, popularity, images, genres, href, followers, type } = item
                return(
                    <div className='col-md-6 col-lg-4 col-sm-12 mt-2 mb-2' key={index}>
                        <div className="card">
                            <div className="card-body">
                                {/* image slider */}
                                <div className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner" style={{ height:'200px'}}>
                                        <div className="carousel-item active">
                                            <img src={'https://picsum.photos/300/300'} alt="no img found" height={200} className="d-block w-100" />
                                        </div>
                                        {
                                            images && images.map((item,index) => {
                                                return(
                                                    <div className="carousel-item" key={index}>
                                                        <img src={item.url} alt="no image" height={200} className="d-block w-100"  />
                                                    </div>
                                                )
                                            })
                                            
                                        }

                                    </div>
                                </div>
                                {/* end */}
                                <h6 className="text-success text-center">
                                    {name}
                                </h6>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Type</strong>
                                        <span className="text-success float-end"> {type} </span>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Popularity</strong>
                                        <span className="text-success float-end"> {popularity}% </span>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Followers</strong>
                                        <span className="text-success float-end">
                                            <i className="bi bi-people-fill"></i> {followers.total}
                                             </span>
                                    </li>

                                </ul>
                            </div>
                            <div className="card-footer">
                                <NavLink to={`/tracks/artist/${id}`} className="btn btn-success">Tracks</NavLink>
                            </div>
                        </div>
                    </div>
                )
            })

           }
           </div>
           </div>
    )
}

export default Music

