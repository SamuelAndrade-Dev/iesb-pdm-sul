import * as ImagePicker from 'expo-image-picker';

export async function pickProfileImage(source) {
  const permission = source === 'camera'
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permission.status !== 'granted') {
    const error = new Error('Permissão negada para acessar a câmera ou as fotos.');
    error.code = 'MEDIA_PERMISSION_DENIED';
    throw error;
  }

  const result = source === 'camera'
    ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 })
    : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 });

  return result.canceled ? null : result.assets[0]?.uri || null;
}
