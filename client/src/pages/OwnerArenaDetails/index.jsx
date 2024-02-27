import { useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PhoneIcon from '@mui/icons-material/Phone';

import { doGetArenaDetails } from './actions';
import defaultArenaImg from '@static/images/arena-default.jpg';
import "leaflet/dist/leaflet.css";

import classes from './style.module.scss'

const OwnerArenaDetails = () => {
    const dispatch = useDispatch();
    const { arena_id } = useParams()
    useEffect(() => {
        dispatch(doGetArenaDetails(arena_id))
    }, [arena_id]);

    const arenaDetails = useSelector((state) => state.arenaDetails.arenaData);
    console.log(arenaDetails)

    const mapCoordinate = [arenaDetails?.arena_latitude, arenaDetails?.arena_longtitude]

    return (
        <>
            <div className={classes["page-container"]}>
                <h5>Arena Details</h5>
                {
                    arenaDetails ?
                        (
                            <>
                                <h3>{arenaDetails.arena_name}</h3>
                            </>
                        ) :
                        (
                            <>
                                <h3>Arena Name</h3>
                            </>
                        )
                }
                <div className={classes.imageContainer}>
                    {arenaDetails?.arena_img_url.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`arena-image-${index}`}
                            className={classes.arenaImage}
                        />
                    ))}
                </div>
                <div className={classes["phone-box"]}>
                    <PhoneIcon /><p>Phone: {arenaDetails ? arenaDetails.arena_phone : "Not Available"}</p>
                </div>
                {
                    arenaDetails ?
                        (
                            <>
                                <div className={classes.mapContainer}>
                                    <MapContainer center={mapCoordinate} zoom={14} scrollWheelZoom={false} className={classes.map}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={mapCoordinate}>
                                            <Popup>
                                                <h3>{arenaDetails?.arena_name}</h3>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <h3>Map not set up</h3>
                            </>
                        )
                }
            </div>
        </>
    )
}

export default OwnerArenaDetails