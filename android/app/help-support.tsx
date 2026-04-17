import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
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

// ─── FAQ Item Component ────────────────────────────────────────────────────────

interface FAQItemProps {
  icon: string;
  question: string;
  children?: React.ReactNode;
  isExpanded?: boolean;
  onToggle: () => void;
  theme: any;
}

const FAQItem: React.FC<FAQItemProps> = ({ icon, question, children, isExpanded, onToggle, theme }) => {
  return (
    <View style={[styles.faqWrapper, { backgroundColor: theme.surfaceContainer }]}>
      <TouchableOpacity 
        style={[styles.faqHeader, isExpanded && { backgroundColor: theme.surfaceHigh }]} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeaderLeft}>
          <MaterialIcons name={icon as any} size={22} color={theme.primaryDim} />
          <Text style={[styles.faqQuestion, { color: theme.text }]}>{question}</Text>
        </View>
        <MaterialIcons 
          name={isExpanded ? "expand-less" : "expand-more"} 
          size={24} 
          color={isExpanded ? theme.primary : theme.icon} 
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.faqContent}>
          {children}
        </View>
      )}
    </View>
  );
};

// ─── Main Screen Component ────────────────────────────────────────────────────

export default function HelpSupportScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const [expandedId, setExpandedId] = useState<string | null>('returns');

  const handleAction = (type: string) => {
    if (type === 'Live Chat') {
      router.push('/live-chat');
    } else {
      Alert.alert(type, `Starting ${type.toLowerCase()} support session...`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Top Bar / App Bar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>HELP & SUPPORT</Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/chat-history')}>
              <MaterialIcons name="history" size={24} color={theme.primary} />
            </TouchableOpacity>
            <View style={styles.avatarMini}>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8QBUQXotESGLn3cT3lNkHE89ixT8z9Epi9sQXod6UwLd3UAhd3C0gl0iI4jQ8Aetir5yww6R2cL3GVmFuuslZDk5ZtHwCkArhchYRU29v9Y_DoStnYsU_74LLhfGzq4pYJiYxQNAS2eNvFO2VIMQHf1lJR81BQj_csF0g4Ph9t1lPzjMrjHaVCZj0GQhJ_bb2zOdx7rnN5RKJ1RfmvuAZDh1USjD83peLwNaktTvk70d8P9NKbwwfUrxy69nzJkaxwfEA-aMBeg" }}
                style={styles.avatarImg}
                contentFit="cover"
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: theme.text }]}>How can we{'\n'}
            <Text style={[styles.heroTitleHighlight, { color: theme.primary, fontStyle: 'italic' }]}>help?</Text>
          </Text>
          <View style={[styles.searchContainer, { backgroundColor: theme.surfaceHigh }]}>
            <MaterialIcons name="search" size={20} color={theme.icon} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search topics, orders, or guides..." 
              placeholderTextColor={theme.icon + '80'}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Quick Actions Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Live Chat - Large Card */}
          <TouchableOpacity 
            style={[styles.bentoLarge, { backgroundColor: theme.surfaceContainer }]}
            onPress={() => handleAction('Live Chat')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[theme.primary, theme.primaryDim]}
              style={styles.chatIconBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialIcons name="chat-bubble" size={24} color={theme.background} />
            </LinearGradient>
            <View style={styles.bentoTextGroup}>
              <Text style={[styles.bentoTitle, { color: theme.text }]}>Live Chat</Text>
              <Text style={[styles.bentoSubtitle, { color: theme.icon }]}>Average wait: 2 mins</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={theme.primary} style={styles.bentoArrow} />
          </TouchableOpacity>

          {/* Small Cards */}
          <View style={styles.bentoSmallRow}>
            <TouchableOpacity 
              style={[styles.bentoSmall, { backgroundColor: theme.surfaceContainer }]}
              onPress={() => handleAction('Email Support')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="mail" size={28} color={theme.primary} style={{ opacity: 0.8 }} />
              <View>
                <Text style={[styles.bentoTitleSmall, { color: theme.text }]}>Email Us</Text>
                <Text style={[styles.bentoSubtitleSmall, { color: theme.icon }]}>24h Response</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.bentoSmall, { backgroundColor: theme.surfaceContainer }]}
              onPress={() => handleAction('Call Support')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="call" size={28} color={theme.primary} style={{ opacity: 0.8 }} />
              <View>
                <Text style={[styles.bentoTitleSmall, { color: theme.text }]}>Call Support</Text>
                <Text style={[styles.bentoSubtitleSmall, { color: theme.icon }]}>9AM - 6PM EST</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.icon }]}>COMMON QUESTIONS</Text>
          <View style={styles.faqList}>
            <FAQItem 
              icon="local-shipping" 
              question="Orders & Shipping" 
              isExpanded={expandedId === 'shipping'} 
              onToggle={() => setExpandedId(expandedId === 'shipping' ? null : 'shipping')}
              theme={theme}
            />
            
            <FAQItem 
              icon="assignment-return" 
              question="Returns & Refunds" 
              isExpanded={expandedId === 'returns'} 
              onToggle={() => setExpandedId(expandedId === 'returns' ? null : 'returns')}
              theme={theme}
            >
              <View style={styles.faqCardList}>
                {['How do I start a return process?', 'Refund timelines for credit cards', 'International return policy'].map((text, i) => (
                  <View key={i} style={styles.faqBulletRow}>
                    <View style={[styles.faqBullet, { backgroundColor: theme.primary }]} />
                    <Text style={[styles.faqBulletText, { color: theme.icon }]}>{text}</Text>
                  </View>
                ))}
              </View>
            </FAQItem>

            <FAQItem 
              icon="lock" 
              question="Account Security" 
              isExpanded={expandedId === 'security'} 
              onToggle={() => setExpandedId(expandedId === 'security' ? null : 'security')}
              theme={theme}
            />
          </View>
        </View>

        {/* Resource Spotlight */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.icon }]}>DEEP DIVE</Text>
          <TouchableOpacity 
            style={styles.spotlightCard}
            activeOpacity={0.9}
            onPress={() => handleAction('Advanced Guide')}
          >
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq-UYJ4_jISqH92TopswfTTFLhlfPCtrC_OSTxOBvSUm22eDskZGprXsUbyDZGH1m5OhtQ8akKCeZT1rfpuX8Ey5AWaECcggDtw8b7DZqFq3FGwplfdHKE9CCjjcmI0ecZlePWhfy0gBFx3tH9hJCySIvkoJiBpvdkfskqnTM7R6J6kiBA-VQw6eiWksaFz1BVFwwUb8FHLZFWuNYC1CeerLds_ZrOvFtZ1al5q-A1MEo5tDIaiYiF865zQSUG3XwDjtQDReJeSA" }}
              style={styles.spotlightImg}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.9)']}
              style={styles.spotlightOverlay}
            >
              <View style={styles.spotlightContent}>
                <View style={[styles.spotlightBadge, { backgroundColor: theme.primary + '33', borderColor: theme.primary + '4D' }]}>
                  <Text style={[styles.spotlightBadgeText, { color: theme.primary }]}>ADVANCED GUIDE</Text>
                </View>
                <Text style={styles.spotlightTitle}>Mastering Stealth{'\n'}Account Protections</Text>
                <Text style={styles.spotlightSubtitle}>Learn how to enable hardware-level 2FA.</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    letterSpacing: 2,
    marginLeft: 8,
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#262626',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: -8,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  heroSection: {
    marginBottom: 40,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: -2,
    marginBottom: 24,
  },
  heroTitleHighlight: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 64,
    ...Platform.select({
      ios: {
        shadowColor: '#73ffbc',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      }
    })
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
  },
  bentoGrid: {
    marginBottom: 48,
    gap: 16,
  },
  bentoLarge: {
    borderRadius: 24,
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
  },
  chatIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  bentoTextGroup: {
    marginTop: 'auto',
  },
  bentoTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    marginBottom: 4,
  },
  bentoSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
  bentoArrow: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  bentoSmallRow: {
    flexDirection: 'row',
    gap: 16,
  },
  bentoSmall: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    height: 140,
    justifyContent: 'space-between',
  },
  bentoTitleSmall: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bentoSubtitleSmall: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    opacity: 0.6,
  },
  section: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    letterSpacing: 2.2,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  faqList: {
    gap: 12,
  },
  faqWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  faqHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  faqQuestion: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
  },
  faqContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
  },
  faqCardList: {
    gap: 16,
  },
  faqBulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  faqBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  faqBulletText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  spotlightCard: {
    borderRadius: 32,
    height: 220,
    overflow: 'hidden',
    position: 'relative',
  },
  spotlightImg: {
    width: '100%',
    height: '100%',
  },
  spotlightOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'flex-end',
    padding: 24,
  },
  spotlightContent: {
    gap: 4,
  },
  spotlightBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  spotlightBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  spotlightTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: '#ffffff',
    lineHeight: 28,
  },
  spotlightSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  }
});
