import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
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

// ─── Chat Components ──────────────────────────────────────────────────────────

const DateSeparator = ({ label }: { label: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  return (
    <View style={styles.dateSeparator}>
      <View style={[styles.dateBadge, { backgroundColor: theme.surfaceContainer }]}>
        <Text style={[styles.dateText, { color: theme.icon }]}>{label.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const MessageBubble = ({ 
  text, 
  time, 
  isUser, 
  showRead 
}: { 
  text: string; 
  time: string; 
  isUser: boolean; 
  showRead?: boolean 
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  if (isUser) {
    return (
      <View style={styles.userMessageContainer}>
        <LinearGradient
          colors={[theme.primary, theme.primaryDim]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userBubble}
        >
          <Text style={[styles.messageText, { color: theme.background }]}>{text}</Text>
        </LinearGradient>
        <View style={styles.messageFooterUser}>
          <Text style={[styles.timeText, { color: theme.icon }]}>{time}</Text>
          {showRead && <MaterialIcons name="done-all" size={14} color={theme.primary} />}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.agentMessageContainer}>
      <View style={[styles.agentBubble, { backgroundColor: theme.surfaceContainer, borderLeftColor: theme.primary + '33' }]}>
        <Text style={[styles.messageText, { color: theme.text }]}>{text}</Text>
      </View>
      <Text style={[styles.timeText, { color: theme.icon, marginLeft: 4 }]}>{time}</Text>
    </View>
  );
};

const OrderUpdateCard = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'dark'];
    return (
        <View style={[styles.orderCard, { backgroundColor: theme.surfaceContainer, borderColor: theme.surfaceHigh }]}>
            <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5oZsxP7pbbOaytLt1Dt3MME3WO0DXa513aiqm6S7PC14D5g4D2r60gqXuOWs2ZoiYmbiuQQI6805vLttAf6FIzIsOdgVV3StAHLPyhdbGgn_btnLpqsJm8rh8X3qC97vmh9UM4PC8KmfSzFpkcf7wPgH4x-tArxazgqLstGKPMQG-qvdmEHAYkguXazcbUZTeK0MgY6fr7Rw-0ij5Ejxsvg-RPRO0miZHTtSbujv8KcUt41cNPHjpjOWLJO7_cEC9XndN8ejAg" }}
                style={styles.orderImg}
                contentFit="cover"
            />
            <View style={styles.orderInfo}>
                <Text style={[styles.orderLabel, { color: theme.primary }]}>ORDER UPDATE</Text>
                <Text style={[styles.orderTitle, { color: theme.text }]}>Neon Pulse Runners</Text>
                <Text style={[styles.orderStatus, { color: theme.icon }]}>Package is in transit to logistics center</Text>
            </View>
        </View>
    );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function LiveChatScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const [inputText, setInputText] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Top Header */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
              </TouchableOpacity>
              <View style={styles.agentAvatarWrapper}>
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQq6PNf7HDNW0JxIuwM_EClGkG_zJdx3QMcR-Olx7QdW379vQD29P-dWzTViW8DvGMawCEy8arLFsCA1N1pUgVOGLGCX4IZRDdbBMILGLdrsU86fzQccg-eRSzmjpUdw9HObW2haBqIarMnOyd4u5u9uEVv7nc9cfKLZjZ2TAG2TMl4Oqi-7HtIrpg6NsnTpz-pikinUTKaa4WbRtq2tLZDOnA4i2nVwqNkMI2OGMVSfRg4xbr6uelTAKzqiOyydmNnRKoIsnuA" }}
                  style={styles.agentAvatar}
                  contentFit="cover"
                />
                <View style={[styles.statusDot, { backgroundColor: theme.primary, borderColor: theme.surface }]} />
              </View>
              <View>
                <Text style={[styles.agentName, { color: theme.primary }]}>Agent Leo</Text>
                <Text style={[styles.agentStatus, { color: theme.icon }]}>ONLINE</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="videocam" size={24} color={theme.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="more-vert" size={24} color={theme.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <DateSeparator label="Today" />

          <MessageBubble 
            text="Hello! I'm Leo from Expo Shop support. How can I help you with your order today?" 
            time="09:41 AM" 
            isUser={false} 
          />

          <MessageBubble 
            text="Hi Leo, I wanted to check the status of my recent purchase. The order number is #XP-9982." 
            time="09:42 AM" 
            isUser={true} 
          />

          <MessageBubble 
            text="One moment please, I'm checking that for you right now..." 
            time="09:42 AM" 
            isUser={false} 
          />

          <OrderUpdateCard />

          <MessageBubble 
            text="Great news! Your package has left our primary warehouse and is currently at the regional distribution center. You should receive it by Thursday." 
            time="09:44 AM" 
            isUser={false} 
          />

          <MessageBubble 
            text="That's perfect. Thanks for the quick response!" 
            time="09:45 AM" 
            isUser={true} 
            showRead={true}
          />
          
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Input Bar */}
        <BlurView intensity={90} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.inputBar}>
          <View style={[styles.inputContainer, { backgroundColor: theme.surfaceHigh }]}>
            <TouchableOpacity style={styles.addButton}>
              <MaterialIcons name="add-circle" size={24} color={theme.icon} />
            </TouchableOpacity>
            <TextInput 
              placeholder="Type a message..." 
              placeholderTextColor={theme.icon + '80'}
              value={inputText}
              onChangeText={setInputText}
              style={[styles.input, { color: theme.text }]}
              multiline
            />
            <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => setInputText('')}
            >
              <LinearGradient
                colors={[theme.primary, theme.primaryDim]}
                style={styles.sendGradient}
              >
                <MaterialIcons name="send" size={20} color={theme.background} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
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
    height: 72,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  agentAvatarWrapper: {
    position: 'relative',
  },
  agentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#73ffbc',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  agentName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    lineHeight: 18,
  },
  agentStatus: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 16,
    gap: 24,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 8,
  },
  dateBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  agentMessageContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    gap: 4,
  },
  agentBubble: {
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderLeftWidth: 2,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    gap: 4,
  },
  userBubble: {
    padding: 16,
    borderRadius: 16,
    borderTopRightRadius: 0,
    shadowColor: '#73ffbc',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  messageText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  messageFooterUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginRight: 4,
  },
  timeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
  },
  orderCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
  },
  orderImg: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  orderTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
  },
  orderStatus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    fontStyle: 'italic',
  },
  inputBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(72, 72, 71, 0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
  },
  addButton: {
    padding: 4,
  },
  sendButton: {
    padding: 2,
  },
  sendGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
