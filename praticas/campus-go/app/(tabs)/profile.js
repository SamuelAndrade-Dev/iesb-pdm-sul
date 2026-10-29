import { useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, Card, PageHeading, Screen } from '../../components/Screen';
import { pickProfileImage } from '../../services/media';
import { colors } from '../../theme';

const PHOTO_KEY = '@campusgo/profile-photo';

export default function ProfileScreen() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then(setPhoto)
      .catch((error) => console.error('Não foi possível carregar a foto do perfil.', error));
  }, []);

  async function selectPhoto(source) {
    try {
      const uri = await pickProfileImage(source);
      if (uri) {
        await AsyncStorage.setItem(PHOTO_KEY, uri);
        setPhoto(uri);
      }
    } catch (error) {
      if (error.code === 'MEDIA_PERMISSION_DENIED') {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à câmera ou às fotos nas configurações do dispositivo.',
          [
            { text: 'Agora não', style: 'cancel' },
            { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
          ],
        );
      } else {
        Alert.alert('Não foi possível escolher a foto', error.message || 'Tente novamente.');
      }
    }
  }

  return (
    <Screen>
      <View style={styles.content}>
        <PageHeading
          eyebrow="Seu espaço no CampusGo"
          title="Meu perfil"
          description="Personalize seu perfil para deixar o app com a sua cara."
        />
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <Ionicons name="person" size={43} color={colors.primary} />
            )}
          </View>
          <Text style={styles.name}>Estudante</Text>
          <Text style={styles.subtitle}>Comunidade CampusGo</Text>
          <View style={styles.buttons}>
            <ActionButton label="Escolher da galeria" icon="▧" onPress={() => selectPhoto('gallery')} />
            <ActionButton label="Tirar uma foto" icon="◎" variant="secondary" onPress={() => selectPhoto('camera')} />
          </View>
        </Card>
        <Pressable style={styles.settings} onPress={() => Linking.openSettings()} accessibilityRole="button">
          <Ionicons name="settings-outline" size={20} color={colors.muted} />
          <Text style={styles.settingsText}>Configurações e permissões</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1 },
  profileCard: { marginHorizontal: 20, alignItems: 'center', paddingVertical: 26 },
  avatar: { width: 112, height: 112, borderRadius: 56, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 4, borderColor: '#F2F6FC' },
  photo: { width: '100%', height: '100%' },
  name: { color: colors.ink, fontSize: 20, fontWeight: '800', marginTop: 15 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 4 },
  buttons: { width: '100%', gap: 10, marginTop: 22 },
  settings: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 23, paddingVertical: 22 },
  settingsText: { flex: 1, color: colors.ink, fontSize: 14, fontWeight: '600' },
});
