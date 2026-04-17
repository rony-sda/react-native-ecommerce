import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Easing,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// --- Pulse Animation Component ---
const PulsingMarker = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 2.5,
          duration: 2000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.markerContainer}>
      <Animated.View 
        style={[
          styles.pulseCircle, 
          { 
            backgroundColor: theme.primary,
            transform: [{ scale: pulseAnim }],
            opacity: opacityAnim
          }
        ]} 
      />
      <LinearGradient
        colors={[theme.primary, theme.primaryDim]}
        style={styles.mainMarker}
      >
        <MaterialIcons name="local-shipping" size={16} color={theme.background} />
      </LinearGradient>
    </View>
  );
};

export default function TrackOrderScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  const timelineSteps = [
    { title: 'Order Placed', time: 'October 24, 09:12 AM', completed: true },
    { title: 'Processed', time: 'October 24, 11:45 AM', completed: true },
    { title: 'Shipped', time: 'In Transit - Expected Today', completed: true, current: true },
    { title: 'Delivered', time: 'Estimated Oct 26', completed: false },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.appBar}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.primary }]}>Track Order</Text>
            </View>
            <TouchableOpacity style={styles.headerIconBtn}>
                <MaterialIcons name="help-outline" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Spotlight Hero */}
        <View style={styles.mapContainer}>
            <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnGeTMxD6L2LaYT6WSNuVNF8NCduj0ZGMk_SKipKtLB-gFbfcyyBSKRxOIzQ0Ni_YQ8XQqT7J_W4jXoE1e9SLuFwdD52hJTFwPAsq5u3gHCtDXyNJI6YNXxf0WsYxTp76_cvDRfynaqd8gy6jEK6FuxX0sCPBXDnFbvQU5Vb2M-AkXsFP7lVeXGw9n5YOfd6YziPwIWy3jdfb9RnNKkK5No2fK2hke26_WRSsgFZHUDfO0OcEI4KIliZeGHn0HG68DiwIpsnpeMQ' }}
                style={[styles.mapImage, { opacity: 0.4 }]}
                contentFit="cover"
            />
            <LinearGradient
                colors={['transparent', theme.surface]}
                style={styles.mapOverlay}
            />
            
            <View style={styles.markerSpotlight}>
                <PulsingMarker />
                <BlurView intensity={40} tint="dark" style={styles.statusBadge}>
                    <Text style={[styles.statusTag, { color: theme.primary }]}>EN ROUTE</Text>
                    <Text style={[styles.locationName, { color: theme.text }]}>Mission District, SF</Text>
                </BlurView>
            </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
            <View style={[styles.bentoCard, { backgroundColor: theme.surfaceLow }]}>
                <Text style={[styles.metaLabel, { color: theme.icon, marginBottom: 24 }]}>SHIPPING STATUS</Text>
                
                <View style={styles.timelineList}>
                    {timelineSteps.map((step, index) => (
                        <View key={index} style={styles.timelineItem}>
                            <View style={styles.stemContainer}>
                                {index !== timelineSteps.length - 1 && (
                                    <View style={[
                                        styles.stemLine, 
                                        { backgroundColor: step.completed ? theme.primary : theme.outline + '33' }
                                    ]} />
                                )}
                                <View style={[
                                    styles.stemCircle, 
                                    step.completed ? { backgroundColor: theme.primary } : { borderVertical: theme.border, borderWidth: 2, backgroundColor: theme.surfaceLow },
                                    step.current && styles.currentCircle
                                ]}>
                                    {step.completed && !step.current && <MaterialIcons name="check" size={10} color={theme.background} />}
                                    {step.current && (
                                        <LinearGradient
                                            colors={[theme.primary, theme.primaryDim]}
                                            style={StyleSheet.absoluteFill}
                                            borderRadius={10}
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[
                                    styles.stepTitle, 
                                    { color: step.current ? theme.primary : step.completed ? theme.text : theme.icon + '66' }
                                ]}>{step.title}</Text>
                                <Text style={[
                                    styles.stepTime, 
                                    { color: step.current ? theme.text : theme.icon }
                                ]}>{step.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>

        {/* Courier Details Card */}
        <View style={styles.courierSection}>
            <View style={[styles.courierCard, { backgroundColor: theme.surfaceHigh }]}>
                <View style={styles.courierInfo}>
                    <View style={[styles.courierIconBox, { backgroundColor: theme.surfaceLow }]}>
                        <MaterialIcons name="bolt" size={24} color={theme.primaryDim} />
                    </View>
                    <View>
                        <Text style={[styles.courierName, { color: theme.text }]}>Emerald Express</Text>
                        <Text style={[styles.trackingNumber, { color: theme.icon }]}>TRK-8829-001X</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.contactBtn, { backgroundColor: theme.primary + '1A' }]}>
                    <Text style={[styles.contactText, { color: theme.primary }]}>Contact</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Items Stack Card */}
        <View style={styles.itemsSection}>
            <View style={[styles.itemsCard, { backgroundColor: theme.surfaceLow }]}>
                <View style={styles.itemsHeader}>
                    <View style={styles.avatarStack}>
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByUhKerskg4Fo-sXP1hxHRD32qfZEzxOmB9FlOOwU9tYmJwQ0PhaHXLsa6NYCCy90Q5nvR8Mqw77_vPMBH-fkozRTC-BeqmzZIZucDqkRvrCczmn_f6m2iQrKzCN4YoikF3Ih-ywVIwI6vr5dry9hlT3mWQoKXiNl2o-bnYjslluRDU1CaG9LWO_6iRlwTYyIriWi-0jCPL8AJzo5uZMhUFaqyEBR6Swen2VqwG2R-X_h5D-KpbWuVNP7wN2Sed3uSgqSNqELtWA' }} 
                            style={styles.avatar}
                        />
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgzH-Pb22MNYuCEya56qUIkxDyEMSGRKgZ0Y-WznHHF7IkTdbvTy4VgVv8H-aDybIpcc3TWd9IxKSdqUPJtuaG3F-K36CYHnvi4SXfOLknZG-5X1b9EMMhXlJ1Q21xj4S5NYu2Kg-hApLr4s0h8IyvGqsZrtI17RBux6OwVa3_bVzxTlIZzgwVd4I9Y1cGP4tobKaQMv_OVmgIpa8dYN5wbsY_6WodlyNv-IZ5LLtY1oAfpwbTa5fNAly16UN_-4GmSFdelrh0ZQ' }} 
                            style={[styles.avatar, { marginLeft: -12 }]}
                        />
                        <View style={[styles.avatarMore, { backgroundColor: theme.surfaceHigh, marginLeft: -12 }]}>
                            <Text style={[styles.moreText, { color: theme.primary }]}>+1</Text>
                        </View>
                    </View>
                    <Text style={[styles.itemsCount, { color: theme.text }]}>3 Items in shipment</Text>
                    <MaterialIcons name="expand-more" size={24} color={theme.icon} />
                </View>
            </View>
        </View>

        <View style={{ height: 40 }} />
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
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 40,
  },
  mapContainer: {
    height: height * 0.45,
    position: 'relative',
    backgroundColor: '#000',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  markerSpotlight: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -40 }],
    alignItems: 'center',
  },
  markerContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  pulseCircle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
  statusBadge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  statusTag: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  locationName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  timelineSection: {
    paddingHorizontal: 24,
    marginTop: -40,
  },
  bentoCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  metaLabel: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 2,
  },
  timelineList: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  stemContainer: {
    width: 20,
    alignItems: 'center',
  },
  stemLine: {
    position: 'absolute',
    top: 20,
    bottom: -10,
    width: 2,
    borderRadius: 1,
  },
  stemCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  currentCircle: {
    shadowColor: '#73ffbc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 32,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  stepTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  courierSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  courierCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  courierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  courierIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    marginBottom: 2,
  },
  trackingNumber: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  contactBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  contactText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  itemsSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  itemsCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#131313',
  },
  avatarMore: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
  },
  itemsCount: {
    flex: 1,
    marginLeft: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  }
});
