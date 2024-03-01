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
import { doGetArenaDetails, doGetDailyCourtSchedule, doCreateCourt, doAddSchedule, doEditSchedule, doDeleteSchedule } from './actions';
import "leaflet/dist/leaflet.css";

import classes from './style.module.scss'

const OwnerArenaDetails = ({ token }) => {
    const dispatch = useDispatch();
    const { arena_id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [createCourtModal, setcreateCourtModal] = useState(false);
    const handleCreateCourtModalOpen = () => setcreateCourtModal(true);
    const handleCreateCourtModalClose = () => {
        setcreateCourtModal(false)
        reset();
    };
    const [editScheduleModal, setEditScheduleModal] = useState(false);
    const handleEditScheduleModalOpen = (scheduleItem) => {
        setSelectedSchedule(scheduleItem)
        setEditScheduleModal(true)
    };
    const handleEditScheduleModalClose = () => {
        setEditScheduleModal(false)
        setSelectedSchedule(null)
        reset();
    };
    const [addScheduleModal, setAddScheduleModal] = useState(false);
    const [selectedCourtId, setSelectedCourtId] = useState(null)
    const handleAddScheduleModalOpen = (court_id) => {
        setSelectedCourtId(court_id)
        setAddScheduleModal(true)
    };
    const handleAddScheduleModalClose = () => {
        setAddScheduleModal(false)
        reset();
    };
    const data = { token, arena_id };
    const scheduleData = { arena_id, selectedDay }
    useEffect(() => {
        dispatch(doGetArenaDetails(data))
    }, [arena_id]);
    useEffect(() => {
        dispatch(doGetDailyCourtSchedule(scheduleData))
    }, [selectedDay]);
    const arenaDetails = useSelector((state) => state.arenaDetails.arenaData);
    console.log(arenaDetails)
    const courtData = useSelector((state) => state.arenaDetails.court);
    console.log(courtData)
    const dailyCourtSchedule = useSelector((state) => state.arenaDetails.scheduleData);
    console.log(dailyCourtSchedule)

    const roles = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };

    const timeToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
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
        const isCourtNameExists = courtData?.some(court => court.court_name == court_name);
        if (isCourtNameExists) {
            notifyError("Court name already exists. Please choose a different name.");
            handleCreateCourtModalClose()
        } else {
            try {
                dispatch(doCreateCourt(data, () => {
                    notifySuccess("Create court successful");
                    handleCreateCourtModalClose()
                    dispatch(doGetArenaDetails(data))
                }, (error) => {
                    console.log(error)
                    notifyError(error || "Create court failed");
                    handleCreateCourtModalClose()
                }))
            } catch (error) {
                console.error(error);
                handleCreateCourtModalClose()
            }
        }
    };

    const addUpdateschedule = async (formData) => {
        const { schedule_start, schedule_end } = formData
        const schedule_price = parseInt(formData.schedule_price)
        let isConflict = false
        console.log(dailyCourtSchedule)
        if (dailyCourtSchedule != null) {
            const selectedDaySchedules = dailyCourtSchedule.filter(schedule => {
                return schedule.schedule_day == selectedDay && schedule.court_id == selectedCourtId;
            });
            console.log(selectedDaySchedules)
            const newStartTime = timeToMinutes(schedule_start);
            const newEndTime = timeToMinutes(schedule_end);
            selectedDaySchedules.forEach(schedule => {
                const existingStartTime = timeToMinutes(schedule.schedule_start);
                const existingEndTime = timeToMinutes(schedule.schedule_end);
                if (
                    newStartTime >= existingStartTime && newStartTime < existingEndTime ||
                    newEndTime > existingStartTime && newEndTime <= existingEndTime ||
                    newStartTime <= existingStartTime && newEndTime >= existingEndTime
                ) {
                    isConflict = true;
                }
            });
        } else if (dailyCourtSchedule == null) {
            isConflict = false
        }
        if (isConflict == true) {
            notifyError("Schedule conflict with the existing ones.")
        } else {
            if (selectedSchedule != null) {
                try {
                    const selectedScheduleId = selectedSchedule?.schedule_id
                    const data = { selectedScheduleId, token, selectedCourtId, selectedDay, schedule_start, schedule_end, schedule_price }
                    dispatch(doEditSchedule(data, () => {
                        notifySuccess("Create schedule successful");
                        handleAddScheduleModalClose()
                        dispatch(doGetDailyCourtSchedule(scheduleData))
                    }, (error) => {
                        console.log(error)
                        notifyError(error || "Create court failed");
                        handleAddScheduleModalClose()
                    }))
                } catch (error) {
                    console.error(error);
                    handleAddScheduleModalClose()
                }
            } else {
                try {
                    console.log(selectedCourtId)
                    const data = { token, selectedCourtId, selectedDay, schedule_start, schedule_end, schedule_price }
                    dispatch(doAddSchedule(data, () => {
                        notifySuccess("Create schedule successful");
                        handleAddScheduleModalClose()
                        dispatch(doGetDailyCourtSchedule(scheduleData))
                    }, (error) => {
                        console.log(error)
                        notifyError(error || "Create court failed");
                        handleAddScheduleModalClose()
                    }))
                } catch (error) {
                    console.error(error);
                    handleAddScheduleModalClose()
                }
            }
        }
    };

    const deleteSchedule = () => {
        try {
            const selectedScheduleId = selectedSchedule?.schedule_id
            const data = { selectedScheduleId, token }
            dispatch(doDeleteSchedule(data, () => {
                notifySuccess("Delete schedule successful");
                handleEditScheduleModalClose()
                dispatch(doGetDailyCourtSchedule(scheduleData))
            }, (error) => {
                notifyError(error || "Delete court failed");
                handleEditScheduleModalClose()
            }))
        } catch (error) {
        }
    }

    const mapCoordinate = [arenaDetails?.arena_latitude, arenaDetails?.arena_longtitude]

    return (
        <>
            <div className={classes["page-container"]}>
                <div className={classes["arena-property-box"]}>
                    <div>
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
                    </div>
                    <div>
                        <h1>&nbsp;</h1>
                        <div className={classes["arena-desc-box"]}>
                            <h5>Arena Description</h5>
                            <p>{arenaDetails && arenaDetails.arena_desc != null ? arenaDetails.arena_desc : "No description available"}</p>
                        </div>
                        <div className={classes["phone-box"]}>
                            <PhoneIcon /><p>Phone: {arenaDetails ? arenaDetails.arena_phone : "Not Available"}</p>
                        </div>
                        <div>

                        </div>
                    </div>
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
                                                            <button onClick={() => handleAddScheduleModalOpen(item.court_id)} className={classes["add-button"]}>
                                                                <AddCircleIcon />
                                                                <p>
                                                                    Add new schedule
                                                                </p>
                                                            </button>
                                                            {
                                                                dailyCourtSchedule && dailyCourtSchedule.filter(schedule => schedule.court_id == item.court_id).length > 0 ? (
                                                                    <>
                                                                        <div className={classes["schedule-grid"]}  >
                                                                            {dailyCourtSchedule
                                                                                .filter(schedule => schedule.court_id == item.court_id).sort((scheduleA, scheduleB) => {
                                                                                    const timeA = scheduleA.schedule_start.split(":");
                                                                                    const timeB = scheduleB.schedule_start.split(":");
                                                                                    const hoursA = parseInt(timeA[0]);
                                                                                    const minutesA = parseInt(timeA[1]);
                                                                                    const hoursB = parseInt(timeB[0]);
                                                                                    const minutesB = parseInt(timeB[1]);
                                                                                    if (hoursA !== hoursB) {
                                                                                        return hoursA - hoursB;
                                                                                    } else {
                                                                                        return minutesA - minutesB;
                                                                                    }
                                                                                })
                                                                                .map((scheduleItem, scheduleIndex) => (
                                                                                    <div key={scheduleIndex} className={classes["schedule-item-box"]} onClick={() => handleEditScheduleModalOpen(scheduleItem)}>
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
                    <button onClick={handleCreateCourtModalOpen} className={[`${classes["add-button"]} ${classes["full-width"]}`]}>
                        <AddCircleIcon />
                        <p>
                            Add new court
                        </p>
                    </button>
                </div>
                <h5>Arena Location</h5>
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
            <Modal
                open={addScheduleModal}
                onClose={handleAddScheduleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={classes["form-modal"]}>
                    <h3>Create Schedule</h3>
                    <form onSubmit={handleSubmit(addUpdateschedule)} >
                        <div>
                            <label htmlFor='schedule_start'>Start Time:</label><br />
                            <input type='time' id='schedule_start' name='schedule_start' required {...register("schedule_start")} /><br />
                            <label htmlFor='schedule_end'>End Time:</label><br />
                            <input type='time' id='schedule_end' name='schedule_end' required {...register("schedule_end")} /><br />
                            <label htmlFor='schedule_price'>Price:</label><br />
                            <div className={classes["price-input-box"]}>
                                <h5>Rp</h5>
                                <input type='number' id='schedule_price' name='schedule_price' required {...register("schedule_price")} /><br />
                            </div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                open={createCourtModal}
                onClose={handleCreateCourtModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={classes["form-modal"]}>
                    <h3>Create Court</h3>
                    <form onSubmit={handleSubmit(createCourtSubmit)} >
                        <div>
                            <label htmlFor='court_name'>Court Name:</label><br />
                            <input type='text' id='court_name' name='court_name' required {...register("court_name")} /><br />
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                open={editScheduleModal}
                onClose={handleEditScheduleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <div className={classes["form-modal"]}>
                        <h3>Edit Schedule</h3>
                        <form onSubmit={handleSubmit(addUpdateschedule)} >
                            <div>
                                <label htmlFor='schedule_start'>Start Time:</label><br />
                                <input defaultValue={selectedSchedule?.schedule_start?.substring(0, 5)} type='time' id='schedule_start' name='schedule_start' required {...register("schedule_start")} /><br />
                                <label htmlFor='schedule_end'>End Time:</label><br />
                                <input defaultValue={selectedSchedule?.schedule_end?.substring(0, 5)} type='time' id='schedule_end' name='schedule_end' required {...register("schedule_end")} /><br />
                                <label htmlFor='schedule_price'>Price:</label><br />
                                <div className={classes["price-input-box"]}>
                                    <h5>Rp</h5>
                                    <input defaultValue={selectedSchedule?.schedule_price} type='number' id='schedule_price' name='schedule_price' required {...register("schedule_price")} /><br />
                                </div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                        <button onClick={deleteSchedule} className={classes["delete-button"]}>Delete Schedule</button>
                    </div>
                </>
            </Modal>
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