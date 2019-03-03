import React, { Component } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin/Pin';
import Rippling from './DetectedGif/Rippling';
import styles from './styles.css';

const TOKEN = 'pk.eyJ1IjoiYWpzYW50YW0iLCJhIjoiY2pyZHpmNWt4MXUwZzQ0bndnMGw5MzRjMyJ9.Wun_Glz6UWIONCcdi61btQ';
const DroneMarker = ({marker}) => <Marker
latitude={marker.lat}
longitude={marker.long}
offsetTop={marker.offTop}
offsetLeft={marker.offLeft}>
<div
    className={styles.pin}
    onClick={() => this.setState({ dronePopupInfo: true })}>
    <Rippling />
</div>
</Marker>;
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: parseFloat(this.props.objects.system-stats.systemLat).toPrecision(7), 
                longitude: parseFloat(this.props.objects.system-stats.systemLon).toPrecision(7), 
                zoom: 18.55,
                bearing: 0,
                pitch: 0,
                width: 800,
                height: 800,
            },
            userPopupInfo: false,
            dronePopupInfo: false
        };
        this.renderUserPopup = this.renderUserPopup.bind(this);
        this.renderDronePopup = this.renderDronePopup.bind(this);
    }
    renderUserPopup() {
        const { systemLat, systemLon } = this.props.objects.system-stats;
        return (
            <Popup
                tipSize={5}
                anchor="top"
                latitude={systemLat}
                longitude={systemLon}
                offsetTop={-22}
                offsetLeft={-88}
                onClose={() => this.setState({ userPopupInfo: null })}
                closeOnClick={true}>
                <p>{'Detection array is here'}</p>
            </Popup>
        )
    }

    // renderDronePopup() {
    //     return (
    //         <Popup
    //             tipsize={5}
    //             anchor="top"
    //             latitude={43.4695}
    //             longitude={-80.5319}
    //             offsetTop={48}
    //             offsetLeft={38}
    //             onClose={() => this.setState({ dronePopupInfo: null })}
    //             closeOnClick={true}>
    //             <p>{'Drone 1'}</p>
    //         </Popup>
    //     )
    // }
    
    //makes default 1 marker for detection array and then adds markers for all tracked drones
    render() {
        const { viewport } = this.state;
        const { objects } = this.props;
        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}>
                <div className={styles.navStyle}>
                    <Marker
                        latitude={objects.system-stats.systemLat}
                        longitude={objects.system-stats.systemLon}
                        offsetTop={-50}
                        offsetLeft={-100}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ userPopupInfo: true })} >
                            <Pin />
                        </div>
                    </Marker>
                    {this.state.userPopupInfo ? this.renderUserPopup() : null}
                {objects.tracking-info.items.map((item, i) => {
                    <Marker 
                        key={i}
                        latitude={item.estimatedLat}
                        longitude={item.estimatedLon}
                        offsetTop={0}
                        offsetLeft={0}
                        >
                        <div
                            className={styles.pin}
                        >
                            <Rippling />
                        </div>
                        <div 
                            className={styles.tracked}
                        >
                            <Popup
                                tipsize={5}
                                anchor="top"
                                latitude={item.estimatedLat}
                                longitude={item.estimatedLon}
                                offsetTop={48}
                                offsetLeft={38}
                            />
                        </div>
                    </Marker>
                })}
                    {/* <Marker
                        latitude={43.4695}
                        longitude={-80.5319}
                        offsetTop={-50}
                        offsetLeft={-100}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ userPopupInfo: true })} >
                            <Pin />
                        </div>
                    </Marker>
                    {this.state.userPopupInfo ? this.renderUserPopup() : null}
                    Object.keys(this.state.items).map(item => (
                        <DroneMarker marker={item}/>
                        {this.state.dronePopupInfo ? this.renderDronePopup() : null}
                    )) */}
                    {/* <DroneMarker marker={{lat: 43.4695, long: -80.5319, offTop: 0, offLeft: 0}} /> */}
                        {/* latitude={43.4695}
                        longitude={-80.5319}
                        offsetTop={0}
                        offsetLeft={0}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ dronePopupInfo: true })}>
                            <Rippling />
                        </div>
                    </Marker> */}
                    {/* {this.state.dronePopupInfo ? this.renderDronePopup() : null} */}
                </div>
            </MapGL>
        );
    }
}