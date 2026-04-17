import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Pressable,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

type OrderStatus = 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';

interface OrderItem {
    id: string;
    image: string;
}

interface Order {
    id: string;
    number: string;
    date: string;
    status: OrderStatus;
    items: OrderItem[];
    total: string;
}

const ordersData: Order[] = [
    {
        id: '1',
        number: 'EXPO-9821',
        date: 'Placed on Oct 24, 2023',
        status: 'Delivered',
        items: [
            { id: 'p1', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwRftHZs76be2NhafAwYGRV8rxavYDWMb6Y7ovNkjFaxsZENZSc7O0Vva3Y9rKYXMUOarIlCknJcVQwEK_LRCQAQGGTj5ermvTGa_jzLvyWG20b06LkJpW3Hj038XfpBiulXFHb9LSuYP7ZAfWlNXFHwhcVWjKJCl7tH4rC7UEz__6YPK9r3vPNQIqlZgPQjmjGTosxe8BvgNJNkiTibUcODwazmFdKKIFmgVfk57hgPCf7V_72P8DZGp2paeWo-Gi-Lb1kiJXfQ' },
            { id: 'p2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWNrmF0dX0D7tKHb-wTo-GkbdKyX1b3PlSRFugxvbt4tX_JETINVQ0FTiB17VhzX6b7RGiaT4pDkbFKO-aHigH-EhA38zqvjoV52maIC3lvVWtqlxpN8hlTwIbrCmBmdYQOJ62V48mldIkWD1cWm-jFlYOEADGyrtFhoTH7leeZYWHt0u6J_Z3ZXG_BEkbWlTs556qTW_K2kBjL2KlUawXOG9bAV4M-PyPLGYAJU5Mc4pywyBOFolxafE2dqybQH_CMLbygdU5cg' },
            { id: 'p3', image: '' } // +1 indicator
        ],
        total: '$249.00'
    },
    {
        id: '2',
        number: 'EXPO-9912',
        date: 'Placed on Oct 28, 2023',
        status: 'Processing',
        items: [
            { id: 'p4', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJJjS9yn5YJ5NubI-Gik2sSunOc2kDgFYLZdN0sNLT0BZjyx1HPmKb5xhT8oY48O8bRwn7U7dEq93OzDHHhAWMCwpOS50_IpLg06jecZ3-qehbiDrBqwMMTQUEW334FACDYUl8utM8T_mj1lzU1OtWM-qYYwV_APqjgXvh2M8XSpki-zasdkNHJsI-L4sNSnkeMXGfRxzW1Di2TZTRUoy1eiacpsLMo5tMCQfqtGLJmpFxlWTmSJv7-ITvO5-juEz9OoapmiK2WA' }
        ],
        total: '$399.00'
    },
    {
        id: '3',
        number: 'EXPO-9744',
        date: 'Placed on Oct 15, 2023',
        status: 'Shipped',
        items: [
            { id: 'p5', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC11hrzapmSsmp8Q0-ODn14jL9_h5NZ_vqDgWPYRO-Unc_f1fA-JELh-z6e3XIp4j0SyxHiEnJ6s9Jn-dZAbtV58_eWFtPvnWhpiTae5v8qozvbWR_yFrBbWjIsYUUL_DIP1bIIO1TmLTEeLsXCtyzdhE0Vq94QzJ_KurEN6XOGJMPqOl6ZDo64L3iqfPvIWyjHL3GYC93-E00Fyf_XqRmMFUer-u8dQHxXLeN1X5gB1xK53bwNQtm2mBsAXBpO7ouT16-KKHSlAg' },
            { id: 'p6', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnQe0zDbuXWd7PcjPi4JZAeTqMFaZQxAMawChHirHr3Jq_UBQKjOMcYdzZ4AWyEkUUsj32fC4lCSjOS72HHI9KoMN7X2lXX8aD2M5UPZ9w4XQa1QUvqPmiAmFlNDFwL6U6yoIB2l3kJPED1QdXb2B-Gr9mCtx2_C3nFy4R4rf6lwb4lkDzF2LQ2iLBVBln1eYaTjJGDn8Xyd_h0IOlPx1pxDcQAU-xyPz6RogJJgVXwCXjxCbOhCz6L3l6jtTutdU20BmD-eSC7Q' }
        ],
        total: '$1,120.00'
    }
];

const FilterChip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'dark'];

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.chip, 
                active ? { backgroundColor: theme.primary + '20', borderColor: theme.primary + '4D', borderWidth: 1 } : { backgroundColor: theme.surfaceHigh }
            ]}
        >
            {active && (
                <LinearGradient
                    colors={[theme.primary + '1A', theme.primary + '05']}
                    style={StyleSheet.absoluteFill}
                    borderRadius={99}
                />
            )}
            <Text style={[styles.chipText, { color: active ? theme.primary : theme.icon }]}>{label}</Text>
        </TouchableOpacity>
    );
};

const OrderCard = ({ order }: { order: Order }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'dark'];

    const getStatusColors = (status: OrderStatus) => {
        switch (status) {
            case 'Delivered': return { bg: theme.primary + '1A', text: theme.primary, border: theme.primary + '33' };
            case 'Processing': return { bg: '#00e0fd1A', text: '#00e0fd', border: '#00e0fd33' };
            case 'Shipped': return { bg: '#5efcce1A', text: '#5efcce', border: '#5efcce33' };
            default: return { bg: theme.icon + '1A', text: theme.icon, border: theme.icon + '33' };
        }
    };

    const statusStyle = getStatusColors(order.status);

    return (
        <TouchableOpacity activeOpacity={0.9} style={[styles.orderCard, { backgroundColor: theme.surfaceHigh + '99', borderColor: theme.border + '1A' }]}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={[styles.orderId, { color: theme.text }]}>#{order.number}</Text>
                    <Text style={[styles.orderDate, { color: theme.icon }]}>{order.date}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>{order.status}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.avatarStack}>
                    {order.items.map((item, index) => (
                        <View key={item.id} style={[styles.avatarWrapper, { marginLeft: index === 0 ? 0 : -20, zIndex: 10 - index }]}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.avatarImage} />
                            ) : (
                                <View style={[styles.avatarMore, { backgroundColor: theme.surfaceHigh }]}>
                                    <Text style={[styles.moreText, { color: theme.icon }]}>+1</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
                <View style={styles.orderValuation}>
                    <Text style={[styles.totalAmount, { color: theme.text }]}>{order.total}</Text>
                    <Text style={[styles.itemsCount, { color: theme.icon }]}>{order.items.length} items</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                {order.status === 'Delivered' && (
                    <>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surfaceContainer, flex: 1 }]}>
                            <Text style={[styles.actionBtnText, { color: theme.primary }]}>Reorder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtnPrimary, { flex: 1 }]}>
                            <LinearGradient
                                colors={[theme.primary, theme.primaryDim || '#0eb77b']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.actionBtnTextPrimary}>Rate Product</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                )}
                {order.status === 'Processing' && (
                    <>
                        <TouchableOpacity disabled style={[styles.actionBtn, { opacity: 0.4, flex: 1 }]}>
                            <Text style={[styles.actionBtnText, { color: theme.icon }]}>Cancel Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surfaceContainer, flex: 1 }]}>
                            <Text style={[styles.actionBtnText, { color: theme.primary }]}>View Details</Text>
                        </TouchableOpacity>
                    </>
                )}
                {order.status === 'Shipped' && (
                    <TouchableOpacity 
                        style={[styles.trackBtn, { backgroundColor: theme.surfaceHigh }]}
                        onPress={() => router.push('/orders/track')}
                    >
                        <MaterialIcons name="local-shipping" size={18} color={theme.primary} />
                        <Text style={[styles.trackBtnText, { color: theme.primary }]}>Track Shipment</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default function MyOrdersScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'dark'];
    const [activeFilter, setActiveFilter] = useState('All Orders');

    const filters = ['All Orders', 'Ongoing', 'Completed', 'Cancelled'];

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
                            <Text style={[styles.headerTitle, { color: theme.text }]}>My Orders</Text>
                        </View>
                        <TouchableOpacity style={styles.headerIconBtn}>
                            <MaterialIcons name="filter-list" size={24} color={theme.icon} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Spotlight Background Effect */}
                <View style={styles.spotlightWrapper} pointerEvents="none">
                    <RadialGradient 
                        color={theme.primary + '0D'}
                        size={600}
                        style={styles.spotlight}
                    />
                </View>

                {/* Filter Chips */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.filterContainer}
                    contentContainerStyle={styles.filterContent}
                >
                    {filters.map((filter) => (
                        <FilterChip 
                            key={filter} 
                            label={filter} 
                            active={activeFilter === filter}
                            onPress={() => setActiveFilter(filter)}
                        />
                    ))}
                </ScrollView>

                {/* Orders List */}
                <View style={styles.ordersList}>
                    {ordersData.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

// Simple Radial Gradient Mock for the spotlight
const RadialGradient = ({ color, size, style }: { color: string; size: number; style: any }) => (
    <View style={[style, { 
        width: size, 
        height: size, 
        borderRadius: size / 2, 
        backgroundColor: color,
        opacity: 0.5,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 100,
    }]} />
);

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
        fontSize: 20,
        letterSpacing: -0.5,
    },
    scrollContent: {
        paddingTop: 100,
        paddingBottom: 40,
    },
    spotlightWrapper: {
        position: 'absolute',
        top: -300,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: -1,
    },
    spotlight: {
        transform: [{ scaleY: 0.5 }],
    },
    filterContainer: {
        maxHeight: 60,
        marginBottom: 32,
    },
    filterContent: {
        paddingHorizontal: 24,
        gap: 12,
        alignItems: 'center',
    },
    chip: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 99,
        overflow: 'hidden',
    },
    chipText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },
    ordersList: {
        paddingHorizontal: 24,
        gap: 20,
    },
    orderCard: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    orderId: {
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        fontSize: 18,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    orderDate: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 99,
        borderWidth: 1,
    },
    statusText: {
        fontFamily: 'PlusJakartaSans_700Bold',
        fontSize: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarStack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#0e0e0e',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarMore: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreText: {
        fontFamily: 'PlusJakartaSans_700Bold',
        fontSize: 14,
    },
    orderValuation: {
        alignItems: 'flex-end',
    },
    totalAmount: {
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        fontSize: 18,
        marginBottom: 2,
    },
    itemsCount: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    actionBtnPrimary: {
        height: 48,
        borderRadius: 12,
        overflow: 'hidden',
    },
    btnGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionBtnText: {
        fontFamily: 'PlusJakartaSans_700Bold',
        fontSize: 14,
    },
    actionBtnTextPrimary: {
        fontFamily: 'PlusJakartaSans_700Bold',
        fontSize: 14,
        color: '#0e0e0e',
    },
    trackBtn: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    trackBtnText: {
        fontFamily: 'PlusJakartaSans_700Bold',
        fontSize: 14,
    }
});
