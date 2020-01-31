import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Marker } from 'react-native-maps';
import { NavigationStackProp } from 'react-navigation-stack';


function isEqual(x, y) {
  if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
  if (x.constructor !== y.constructor) { return false; }
  if (x instanceof Function) { return x === y; }
  if (x instanceof RegExp) { return x === y; }
  if (x === y || x.valueOf() === y.valueOf()) { return true; }
  if (Array.isArray(x) && x.length !== y.length) { return false; }

  if (x instanceof Date) { return false; }

  if (!(x instanceof Object)) { return false; }
  if (!(y instanceof Object)) { return false; }

  const p = Object.keys(x);
  return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
    p.every(function (i) { return isEqual(x[i], y[i]); });
}


type Props = {
  navigation: NavigationStackProp;
};

const ANCHOR = { x: 0.5, y: 0.5 };

const colorOfmyLocationMapMarker = 'blue';

export function MapScreen(props: Props) {
  const { navigation } = props;
  const [mounted, setMounted] = useState(false);
  const [myPosition, setMyPosition] = useState();
  const [watchId, setWatchId] = useState();
  const [coordinate, setCoordinate] = useState({
    latitude: 49.988358,
    longitude: 36.232845
  });
  const [heading, setHeading] = useState();

  const watchLocation = () => {
    const _watchId = navigator.geolocation.watchPosition(
      position => {
        const myLastPosition = myPosition;
        setMyPosition(position.coords);
        if (!isEqual(myPosition, myLastPosition)) {
          // ???
          setMyPosition({ myPosition });
        }
      },
      undefined,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
    setWatchId(_watchId);
  };


  useEffect(() => {
    setMounted(true);
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted && mounted) {
          watchLocation();
        }
      });
    } else {
      watchLocation();
    }
    return () => {
      setMounted(false);
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  if (!coordinate) {
    if (!myPosition) {
      return null;
    }
    setCoordinate(myPosition)
    setHeading(myPosition.heading);
  }

  const rotate =
    typeof heading === 'number' && heading >= 0 ? `${heading}deg` : null;

  return (
    <Marker
      anchor={ANCHOR}
      style={styles.mapMarker}
      {...props}
      coordinate={coordinate}
    >
      <View style={styles.container}>
        <View style={styles.markerHalo} />
        {rotate && (
          <View style={[styles.heading, { transform: [{ rotate }] }]}>
            <View style={styles.headingPointer} />
          </View>
        )}
        <View style={styles.marker}>
          <Text style={styles.markerText}>
            {rotate}
          </Text>
        </View>
      </View>
    </Marker>
  );
}

const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const styles = StyleSheet.create({
  mapMarker: {
    zIndex: 1000,
  },
  // The container is necessary to protect the markerHalo shadow from clipping
  container: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
    alignItems: 'center',
  },
  headingPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: ARROW_SIZE * 0.75,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colorOfmyLocationMapMarker,
    borderLeftColor: 'transparent',
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: colorOfmyLocationMapMarker,
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  markerText: { width: 0, height: 0 },
});
