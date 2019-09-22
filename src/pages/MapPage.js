import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import PersonLocator from '../components/PersonLocator';
import {View} from 'react-native';
import { Button, ButtonGroup, ThemeProvider, Card } from 'react-native-elements';

import { connect } from "react-redux";
import DisasterPopup from '../components/DisasterPopup';


class RenderMe extends Component{

    fixUndefined(val) {
        if(!val || val == NaN || val == undefined) {
            return 0;
        } else {
            return val;
        }
    }

    render() {
        const latlng = {
            latitude: this.fixUndefined(this.props.x), 
            longitude: this.fixUndefined(this.props.y)
        }
        return <Circle center = {latlng} radius = {this.props.rad} />;
    }
}

class MainMap extends Component {

    renderVehicles() {
        // renders all of the vehicles on the map
        // if you need help, highlights the car that should be coming to your area
        // or to pick you up
    }

    renderPeople() {
        // renders all the people on the map
        // if you need to help someone, highlights the person you have to pick up
    }

    fixUndefined(val) {
        if(!val || val == NaN || val == undefined) {
            return 0;
        } else {
            return val;
        }
    }

    // draws the disaster radius you are contained in
    renderZone(x, y, rad) {
        return <Circle zIndex = {999} strokeColor = {rgba(255, 0, 0, 1)} coordinate = {{latitude: this.fixUndefined(x), longitude: this.fixUndefined(y)}} radius = {rad} />
    }

    render() {
        return <View> 
        <MapView provider={ PROVIDER_GOOGLE } style={ { flex: 0, paddingBottom: 600 } }
            initialRegion = {{latitude: this.fixUndefined(this.props.pickupLat), longitude: this.fixUndefined(this.props.pickupLong), latitudeDelta: 1, longitudeDelta: 1}} >
            </MapView>
            <RenderMe x = {this.props.myLat} y = {this.props.myLong} rad = {500} />
        <PersonLocator/> 
        </View>;
    }
}

function mapStateToProps (state) {
    return {
        myLat: state.Reducer.curLat,
        myLong: state.Reducer.curLong,
        pickupLat: state.Reducer.pickupLat,
        pickupLong: state.Reducer.pickupLong,
        pending: state.Reducer.pending
    }
}

const MapPage = connect(mapStateToProps)(MainMap);
export default MapPage;