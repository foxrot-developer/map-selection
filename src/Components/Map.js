import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import "leaflet-area-select";
import L from 'leaflet';

import Objectives from '../objectives.json';
import SelectArea from './SelectArea';
import redMarker from '../images/red-marker.png';
import greenMarker from '../images/green-marker.png';

const Map = () => {

    const red_marker = new L.icon({
        iconUrl: redMarker,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(25, 25)
    });

    const green_marker = new L.icon({
        iconUrl: greenMarker,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(25, 25)
    });

    const [selectedObjectives, setSelectedObjectives] = useState([]);

    const selectedObjectivesHandler = objective => {
        setSelectedObjectives(prev => [...prev, objective]);
    }

    const non_selectionMade = selectedObjectives.length ? Objectives.filter(objective => !selectedObjectives.find(el => el.Name === objective.Name)) : [];


    return (
        <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-xs-12 col-md-3'>
                    <div className='row'>
                        <div className='col-xs-6 col-md-12 text-start bg-white p-3 my-1 border border-primary border-2 rounded'>
                            <h5>Objectives</h5>
                            {Objectives.map((objective, index) => {
                                return <p key={index}>{objective.Name}</p>
                            })}
                        </div>
                        <div className='col-xs-6 col-md-12 text-start bg-white p-3 my-1 border border-primary border-2 rounded'>
                            <h5>Selected Objectives</h5>
                            {selectedObjectives.map((objective, index) => {
                                return <p key={index}>{objective.Name}</p>
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-xs-12 col-md-9'>
                    <MapContainer className='map-container' center={[55.8441028, -121.3102234]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SelectArea Objectives={Objectives} selectedObjectivesHandler={selectedObjectivesHandler} />
                        {!selectedObjectives.length && Objectives.map((eachData, index) => (
                            <Marker key={index} icon={red_marker} position={[eachData.Latitude, eachData.Longitude]}>
                                <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent><p>{eachData.Name}</p></Tooltip>
                            </Marker>
                        ))}
                        {selectedObjectives.length && selectedObjectives.map((selected, index) => {
                            return <Marker key={index} icon={green_marker} position={[selected.Latitude, selected.Longitude]}>
                                <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent><p className='fw-bold text-success h6'>{selected.Name}</p></Tooltip>
                            </Marker>
                        })}
                        {selectedObjectives.length && non_selectionMade.map((selected, index) => {
                            return <Marker key={index} icon={red_marker} position={[selected.Latitude, selected.Longitude]}>
                                <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent><p>{selected.Name}</p></Tooltip>
                            </Marker>
                        })}
                    </MapContainer>
                </div>
            </div>
        </div >
    )
}

export default Map;
