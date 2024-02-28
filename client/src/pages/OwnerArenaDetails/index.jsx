import { useEffect, useState } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PhoneIcon from '@mui/icons-material/Phone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';



import { selectToken } from '@containers/Client/selectors';
import { doGetArenaDetails, doGetDailyCourtSchedule, doCreateCourt } from './actions';
import defaultArenaImg from '@static/images/arena-default.jpg';
import "leaflet/dist/leaflet.css";

import classes from './style.module.scss'

const OwnerArenaDetails = ({ token }) => {
    const dispatch = useDispatch();
    const { arena_id } = useParams();
    const [selectedDay, setSelectedDay] = useState(0);
    const [createCourtModal, setcreateCourtModal] = useState(false);
    const handleCreateCourtModalOpen = () => setcreateCourtModal(true);
    const handleCreateCourtModalClose = () => setcreateCourtModal(false);
    const data = { token, arena_id };
    const scheduleData = { arena_id, selectedDay }
    useEffect(() => {
        dispatch(doGetArenaDetails(data))
    }, [arena_id]);
    useEffect(() => {
        console.log(scheduleData)
        dispatch(doGetDailyCourtSchedule(scheduleData))
    }, [selectedDay]);

    const arenaDetails = useSelector((state) => state.arenaDetails.arenaData);
    console.log(arenaDetails)
    const courtData = useSelector((state) => state.arenaDetails.court);
    console.log(courtData)
    const dailyCourtSchedule = useSelector((state) => state.arenaDetails.scheduleData);
    console.log(dailyCourtSchedule)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const roles = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };

    const toggleSelection = (dayIndex) => {
        setSelectedDay(dayIndex);
    };

    const notifyError = (message) => toast.error(message, {
        position: 'bottom-right'
    });

    const notifySuccess = (message) => toast.success(message, {
        position: 'bottom-right'
    });

    const createCourtSubmit = async (formData) => {
        const court_name = formData?.court_name
        const arena_id = arenaDetails?.arena_id;
        const data = { court_name, arena_id, token }
        try {
            dispatch(doCreateCourt(data, () => {
                notifySuccess("Create court successful");
            }, (error) => {
                console.log(error)
                notifyError(error || "Create court failed");
            }))
        } catch (error) {
            console.error(error);
        }
    };

    const mapCoordinate = [arenaDetails?.arena_latitude, arenaDetails?.arena_longtitude]

    return (
        <>
            <div className={classes["page-container"]}>
                <h5>Arena Details</h5>
                <h1>{arenaDetails ? arenaDetails.arena_name : "Arena Name"}</h1>
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
                <div className={classes["arena-desc-box"]}>
                    <h5>Arena Description</h5>
                    <p>{arenaDetails && arenaDetails.arena_desc != null ? arenaDetails.arena_desc : "No description available"}</p>
                </div>
                <div className={classes["phone-box"]}>
                    <PhoneIcon /><p>Phone: {arenaDetails ? arenaDetails.arena_phone : "Not Available"}</p>
                </div>
                <div className={classes["court-box"]}>
                    <h5>Court Information</h5>
                    <p>Schedule</p>
                    <div className={classes["day-row"]}>
                        {Object.entries(roles).map(([dayIndex, day]) => (
                            <>
                                <div className={selectedDay == dayIndex ? classes["day-box"] : classes["day-box-unselected"]} key={dayIndex} onClick={() => toggleSelection(dayIndex)}>
                                    {day}
                                </div>
                            </>
                        ))}
                    </div>
                    {
                        courtData ? (
                            <>
                                {
                                    courtData?.map((item, index) => (
                                        <>
                                            <div className={classes["court-detail-box"]} key={index} >
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                    >
                                                        {item.court_name}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div>
                                                            <h5>Daily Schedule</h5>
                                                            < button className={classes["add-button"]}>
                                                                <AddCircleIcon />
                                                                <p>
                                                                    Add new schedule
                                                                </p>
                                                            </button>
                                                            {
                                                                dailyCourtSchedule && dailyCourtSchedule.filter(schedule => schedule.court_id == item.court_id).length > 0 ? (
                                                                    <>
                                                                        <div className={classes["schedule-grid"]}>
                                                                            {dailyCourtSchedule
                                                                                .filter(schedule => schedule.court_id == item.court_id)
                                                                                .map((scheduleItem, scheduleIndex) => (
                                                                                    <div key={scheduleIndex} className={classes["schedule-item-box"]}>
                                                                                        <div>
                                                                                            {scheduleItem.schedule_start.substring(0, 5)} - {scheduleItem.schedule_end.substring(0, 5)}
                                                                                        </div>
                                                                                        <div>
                                                                                            Rp {scheduleItem.schedule_price}
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div>
                                                                            <p>
                                                                                Schedule not found for this day.
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div >
                                        </>
                                    )
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <h3>No Court Available</h3>
                            </>
                        )
                    }
                    <Modal
                        open={createCourtModal}
                        onClose={handleCreateCourtModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes["create-court-modal"]}>
                            <form onSubmit={handleSubmit(createCourtSubmit)} >
                                <div className={classes["form-modal"]}>
                                    <label htmlFor='court_name'>Court Name:</label><br />
                                    <input type='text' id='court_name' name='court_name' required {...register("court_name")} /><br />
                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <button onClick={handleCreateCourtModalOpen} className={[`${classes["add-button"]} ${classes["full-width"]}`]}>
                        <AddCircleIcon />
                        <p>
                            Add new court
                        </p>
                    </button>
                </div>
                {
                    arenaDetails && arenaDetails?.arena_latitude != undefined && arenaDetails?.arena_longtitude != undefined ?
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
            </div >
            <Toaster />
        </>
    )
}

OwnerArenaDetails.propTypes = {
    token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    token: selectToken
});


export default connect(mapStateToProps)(OwnerArenaDetails);