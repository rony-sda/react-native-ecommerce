import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Animated,
  Platform, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// ─── Status Badge Component ───────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: 'In Progress' | 'Resolved' }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const pulseAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (status === 'In Progress') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [status]);

  const isProgress = status === 'In Progress';

  return (
    <View style={styles.badgeRow}>
      <View style={[
        styles.badgeContainer, 
        { backgroundColor: isProgress ? theme.primary + '1A' : theme.surfaceHigh }
      ]}>
        <Text style={[
          styles.badgeText, 
          { color: isProgress ? theme.primary : theme.icon }
        ]}>
          {status.toUpperCase()}
        </Text>
      </View>
      {isProgress && (
        <Animated.View 
          style={[
            styles.pulseDot, 
            { backgroundColor: theme.primary, opacity: pulseAnim }
          ]} 
        />
      )}
    </View>
  );
};

// ─── Chat History Card ─────────────────────────────────────────────────────────

interface ChatCardProps {
  name: string;
  message: string;
  time: string;
  status: 'In Progress' | 'Resolved';
  avatar?: string;
  icon?: string;
  hasBorder?: boolean;
}

const ChatCard = ({ name, message, time, status, avatar, icon, hasBorder }: ChatCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: theme.surfaceContainer },
        hasBorder && { borderLeftWidth: 4, borderLeftColor: theme.primary + '4D' }
      ]}
      activeOpacity={0.7}
      onPress={() => {
        if (status === 'In Progress') {
          router.push('/live-chat');
        } else {
          Alert.alert("Conversation", `Viewing history with ${name}...`);
        }
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatarBox, { backgroundColor: theme.surfaceHigh }]}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImg} contentFit="cover" />
            ) : (
              <MaterialIcons name={icon as any} size={28} color={theme.icon} />
            )}
          </View>
          {status === 'In Progress' && (
            <View style={[styles.onlineIndicator, { backgroundColor: theme.primary, borderColor: theme.surfaceContainer }]} />
          )}
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.cardTopRow}>
            <Text style={[styles.cardName, { color: theme.text }]}>{name}</Text>
            <Text style={[styles.cardTime, { color: theme.icon }]}>{time}</Text>
          </View>
          <Text style={[styles.cardMessage, { color: theme.icon }]} numberOfLines={1}>
            {message}
          </Text>
          <StatusBadge status={status} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function ChatHistoryScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Decorative Glows */}
      <View style={[styles.glowTop, { backgroundColor: theme.primary + '0D' }]} />
      <View style={[styles.glowBottom, { backgroundColor: theme.primary + '0D' }]} />

      {/* Top Bar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.primary }]}>SUPPORT HISTORY</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="search" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        
      >
        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={[styles.searchContainer, { backgroundColor: theme.surfaceHigh }]}>
            <MaterialIcons name="search" size={18} color={theme.icon} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search past conversations..." 
              placeholderTextColor={theme.icon + '80'}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Hero Title */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroLabel, { color: theme.primaryDim }]}>ARCHIVE</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Your Interactions</Text>
        </View>

        {/* History List */}
        <View style={styles.historyList}>
          <ChatCard 
            name="Agent Leo"
            message="I've looked into your order #EX-9021 and the shipping delay is due to..."
            time="10:24 AM"
            status="In Progress"
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCHNlPLy_wBAtNmbT9UQjHmU9wRXpw7lL4Sc9_CjsGa6IvnfuIyEkNpcB4QCivpez9wOwe8bzoZRBy49IvsNzA-BiJQ_uW_XqrEy8suLfRmGhIvQO6qZ7disNjM5GvPvgANyMMqkTUtM0-BjhdlCFMsp527bohI4PRFJU0aYS-KR_Yh3VzER45pv5c_TrtwjPw5mkM_vyTTRNCfz1EphU8gdbsvl-wPDzyDeQpvP44MX6VrxOKsD3gx7AO18EhKZdCSsEVwMI612A"
          />

          <ChatCard 
            name="AI Support Assistant"
            message="Your return request for the Emerald Watch has been successfully processed."
            time="Yesterday"
            status="Resolved"
            icon="smart-toy"
          />

          <ChatCard 
            name="Agent Sarah"
            message="Is there anything else I can help you with regarding your account security?"
            time="Oct 22"
            status="Resolved"
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBZsaFsixL50G9D0k_SlOZUZBUhZAJnfnwssuf4WZTfaXtQalKyz_EzWIuwQUVQ6PlF_L7L6vicDPU31RIcxeLARTzInspfN3HQ5gyu4kfDscpu74X7O2XWZNTq6AlKv33yFwLk175FnaPZXb_4fHnQZGRcdReYfv7nCVgFujqxxY2CCSgpWXykMnwRPWs3HNwVnl4SssLx8IbOX36cqxJdwsMWDzhFTf2rOiXxGZ5zXLRAOj_2qpj9ll3K7zrbfb2_12g4rrYwJA"
            hasBorder={true}
          />

          <ChatCard 
            name="Support Team"
            message="Ticket #9822 has been updated. The coupon code was applied to your wallet."
            time="Oct 18"
            status="Resolved"
            icon="support-agent"
          />
        </View>

        {/* Empty State / CTA */}
        <View style={[styles.ctaCard, { borderColor: theme.surfaceHigh }]}>
          <View style={[styles.ctaIconBox, { backgroundColor: theme.surfaceHigh }]}>
            <MaterialIcons name="history-toggle-off" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.ctaTitle, { color: theme.text }]}>Need a new hand?</Text>
          <Text style={[styles.ctaSubtitle, { color: theme.icon }]}>
            Our experts are standing by 24/7 to help you with any issues.
          </Text>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push('/help-support')}
          >
            <LinearGradient
              colors={[theme.primary, theme.primaryDim]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>START NEW CHAT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  safeAreaHeader: {
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  searchSection: {
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  heroSection: {
    marginBottom: 24,
    paddingLeft: 8,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    letterSpacing: -1,
  },
  historyList: {
    gap: 16,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
    height: 56,
  },
  avatarBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
  },
  cardInfo: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
  cardTime: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
  },
  cardMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    marginBottom: 12,
    opacity: 0.8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 0.5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  ctaCard: {
    marginTop: 48,
    alignItems: 'center',
    padding: 32,
    borderRadius: 32,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  ctaIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: '80%',
  },
  ctaButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  ctaButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    letterSpacing: 1,
    color: '#0e0e0e',
  }
});
