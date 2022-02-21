import { useEffect } from 'react';
import { useMap } from "react-leaflet";
import L from "leaflet";

const SelectArea = (props) => {
    const map = useMap();

    useEffect(() => {
        if (!map.selectArea) return;

        map.selectArea.enable();

        map.on("areaselected", (e) => {
            // console.log(e.bounds.toBBoxString());
            L.rectangle(e.bounds, { color: "blue", weight: 1 }).addTo(map);

            props.Objectives.map(objective => {
                if (e.bounds.contains([objective.Latitude, objective.Longitude])) {
                    props.selectedObjectivesHandler(objective);
                }
            })
        });

        const bounds = map.getBounds().pad(1);
        map.selectArea.setValidate((layerPoint) => {
            console.log(bounds.contains(this._map.layerPointToLatLng(layerPoint)));
            return bounds.contains(this._map.layerPointToLatLng(layerPoint));
        });
        map.selectArea.setValidate();
    }, [props, map]);

    return null;
}

export default SelectArea;
