import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from '../../components/FadeIn';
import { Card, PageHeading, Screen } from '../../components/Screen';
import useNotices from '../../hooks/useNotices';
import { colors } from '../../theme';

function NoticeCard({ item, index }) {
  return (
    <FadeIn delay={Math.min(index, 6) * 55} style={styles.noticeWrap}>
      <Card>
        <View style={styles.noticeTop}>
          <View style={styles.noticeIcon}>
            <Ionicons name="notifications-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.noticeTag}>AVISO DO CAMPUS</Text>
        </View>
        <Text style={styles.noticeTitle}>{item.title}</Text>
        <Text style={styles.noticeBody}>{item.body}</Text>
      </Card>
    </FadeIn>
  );
}

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      await reload();
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <Screen>
      <FlatList
        data={notices}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <NoticeCard item={item} index={index} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <PageHeading
              eyebrow="CampusGo · seu campus em movimento"
              title="Bom dia! 👋"
              description="Fique por dentro das novidades da sua comunidade."
            />
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionHeading}>Avisos do campus</Text>
              <Text style={styles.count}>{notices.length ? `${notices.length} avisos` : 'Agora'}</Text>
            </View>
            {isLoading && notices.length === 0 ? (
              <View style={styles.state}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.stateText}>Buscando novidades…</Text>
              </View>
            ) : null}
            {error ? (
              <Card style={styles.errorCard}>
                <Text style={styles.errorTitle}>Não foi possível carregar os avisos</Text>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable onPress={reload} accessibilityRole="button" style={styles.retry}>
                  <Text style={styles.retryText}>Tentar novamente</Text>
                </Pressable>
              </Card>
            ) : null}
          </View>
        }
        ListEmptyComponent={!isLoading && !error ? (
          <Card><Text style={styles.stateText}>Nenhum aviso disponível no momento.</Text></Card>
        ) : null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 28 },
  noticeWrap: { marginHorizontal: 20, marginBottom: 12 },
  noticeTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  noticeIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  noticeTag: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginLeft: 9 },
  noticeTitle: { color: colors.ink, fontSize: 17, fontWeight: '700', textTransform: 'capitalize' },
  noticeBody: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 7 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, marginBottom: 13 },
  sectionHeading: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  count: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  state: { alignItems: 'center', paddingVertical: 30 },
  stateText: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' },
  errorCard: { marginHorizontal: 20, marginBottom: 14, borderColor: '#F0D1D4' },
  errorTitle: { color: colors.red, fontSize: 15, fontWeight: '800' },
  errorText: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 6 },
  retry: { alignSelf: 'flex-start', marginTop: 14, paddingVertical: 4 },
  retryText: { color: colors.primary, fontWeight: '800' },
});
