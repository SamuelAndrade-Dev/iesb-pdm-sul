import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== 'granted') {
    const error = new Error('Permissão de localização negada.');
    error.code = 'LOCATION_PERMISSION_DENIED';
    throw error;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = location.coords;

  try {
    const places = await Location.reverseGeocodeAsync({ latitude, longitude });
    const place = places[0];
    if (place) {
      const description = [place.name, place.street, place.district, place.city]
        .filter(Boolean)
        .filter((value, index, values) => values.indexOf(value) === index)
        .join(', ');
      if (description) {
        return { description, latitude, longitude };
      }
    }
  } catch (error) {
    console.warn('Não foi possível converter as coordenadas em um endereço.', error);
  }

  return {
    description: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
    latitude,
    longitude,
  };
}
