import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import key from '../token/key'

const URL = 'https://api.spotify.com'

function Tracks(props) {
    const [tracks,setTracks] = useState([])
    const params = useParams()

    //logic to play and pause
    const [audio,setAudio] = useState(null)
    const [playing,setPlaying] = useState(false)
    const [preUrl,setPreUrl] = useState(null)

    const readTracks = async () => {
        await fetch(`${URL}/v1/artists/${params.id}/top-tracks?market=IN`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}` // auth keyword
              }
        }).then(res => res.json())
        .then(out => {
            console.log('tracks out =', out)
                setTracks(out.tracks)
        })
        .catch(err =>console.log(err.message))
    }

    useEffect(() => {
        readTracks()
    },[])

    // display track icons
    const trackIcon = (url) => {
        if(!url) 
            return <span className="text-danger">No Track</span>
        if(playing && preUrl === url)
            return <span className="text-warning text-center"> <i className="bi bi-pause-circle"></i> </span>

        return <span className="text-center text-success"> <i className="bi bi-play-circle"></i> </span>
    }

    // play and pause logic
    const playAudio = (url) => {
        const myAudio = new Audio(url)
            if(!playing) {
                myAudio.play() // play
                setPlaying(true)
                setPreUrl(url)
                setAudio(myAudio)
            } else {
                // pause
                audio.pause()
                if(preUrl === url) {
                    setPlaying(false) //pause
                } else {
                    //pause to play
                    myAudio.play()
                    setAudio(myAudio)
                    setPreUrl(url)
                }
            }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="diplay-3 text-success">Music tracks</h3>
                </div>
            </div>

            <div className="row">
                {
                    tracks && tracks.map((item,index) => {
                        const { id, name, album, preview_url } = item
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2" key={index} onClick={() => playAudio(preview_url)}>
                                <div className="card">
                                    <img src={album.images[1].url} alt="no image" className="card-img-top" />
                                    <div className="card-body">
                                        <h6 className="text-center text-success"> {name} </h6>
                                    </div>
                                    <div className="card-footer">
                                        { trackIcon(preview_url) }
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

export default Tracks