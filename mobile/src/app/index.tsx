import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#8B5CF6';
const RED = PRIMARY;
const ACCENT = '#A78BFA';
const BG = '#080810';
const CARD = '#171421';
const TEXT = '#FFFFFF';
const MUTED = '#A1A1AA';
const BORDER = '#302640';

const modules = [
  { icon: '🔍', title: 'Deep Search', desc: 'ค้นหาข้อมูลเชิงลึก', prompt: 'ค้นหาข้อมูลเชิงลึกเกี่ยวกับ ' },
  { icon: '🎬', title: 'AI Video', desc: 'สร้างวิดีโอจากข้อความ', prompt: 'สร้างวิดีโอเกี่ยวกับ ' },
  { icon: '🎵', title: 'AI Music', desc: 'แต่งเพลงและดนตรี', prompt: 'แต่งเพลงแนว ' },
  { icon: '🎨', title: 'AI Image', desc: 'สร้างภาพด้วย AI', prompt: 'สร้างภาพเกี่ยวกับ ' },
];

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const sendMessage = () => {
    const message = prompt.trim();
    if (!message) return;

    setMessages(prev => [
      ...prev,
      { role: 'user', text: message },
      {
        role: 'ai',
        text: 'ได้รับคำสั่งแล้ว NEXTGEN AI Engine ยังอยู่ระหว่างเชื่อมต่อระบบ AI กรุณารอติดตั้ง Backend ในขั้นตอนถัดไป',
      },
    ]);
    setPrompt('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>N</Text>
              </View>
              <View>
                <Text style={styles.brandName}>
                  NEXTGEN<Text style={{ color: RED }}> AI</Text>
                </Text>
                <Text style={styles.brandSub}>INTELLIGENCE PLATFORM</Text>
              </View>
            </View>

            <View style={styles.status}>
              <View style={styles.dot} />
              <Text style={styles.statusText}>ONLINE UI</Text>
            </View>
          </View>

          {/* HERO */}
          <View style={styles.hero}>
            <Text style={styles.tag}>✦ THE NEXT GENERATION AI</Text>
            <Text style={styles.heroTitle}>
              THINK BEYOND.{'\n'}
              <Text style={{ color: RED }}>CREATE ANYTHING.</Text>
            </Text>
            <Text style={styles.heroDesc}>
              Your intelligent assistant for searching,
              creating and exploring the future.
            </Text>
          </View>

          {/* CHAT */}
          <View style={styles.chatCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>AI ASSISTANT</Text>
                <Text style={styles.sectionSub}>Your personal intelligence</Text>
              </View>
              <Text style={styles.aiBadge}>NEXTGEN CORE</Text>
            </View>

            <View style={styles.welcome}>
              <Text style={styles.welcomeIcon}>✦</Text>
              <Text style={styles.welcomeTitle}>
                สวัสดี! ยินดีต้อนรับสู่ NEXTGEN AI
              </Text>
              <Text style={styles.welcomeDesc}>
                วันนี้อยากให้ฉันช่วยค้นหา สร้างสรรค์
                หรือทำอะไรให้คุณ?
              </Text>
            </View>

            {messages.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  item.role === 'user' ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <Text style={styles.messageLabel}>
                  {item.role === 'user' ? 'YOU' : 'NEXTGEN AI'}
                </Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            ))}

            <View style={styles.inputBox}>
              <TextInput
                value={prompt}
                onChangeText={setPrompt}
                placeholder="พิมพ์คำสั่งของคุณ..."
                placeholderTextColor="#777985"
                style={styles.input}
                multiline
                maxLength={2000}
              />
              <Pressable
                style={styles.sendButton}
                onPress={sendMessage}
              >
                <Text style={styles.sendText}>↑</Text>
              </Pressable>
            </View>
            <Text style={styles.inputHint}>
              NEXTGEN AI can make mistakes. Verify important information.
            </Text>
          </View>

          {/* MODULES */}
          <View style={styles.modulesSection}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>AI STUDIO</Text>
                <Text style={styles.sectionSub}>Explore your creative tools</Text>
              </View>
              <Text style={styles.viewAll}>4 MODULES</Text>
            </View>

            <View style={styles.grid}>
              {modules.map((item, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.module,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => setPrompt(item.prompt)}
                >
                  <Text style={styles.moduleIcon}>{item.icon}</Text>
                  <Text style={styles.moduleTitle}>{item.title}</Text>
                  <Text style={styles.moduleDesc}>{item.desc}</Text>
                  <Text style={styles.moduleArrow}>↗</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>NEXTGEN AI</Text>
            <Text style={styles.footerText}>
              BUILT FOR THE FUTURE · VERSION 1.0
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  logo: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  brandSub: {
    color: MUTED,
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 3,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#171A20',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#F5B942',
  },
  statusText: {
    color: '#D5D5DB',
    fontSize: 9,
    fontWeight: '700',
  },
  hero: {
    paddingTop: 32,
    paddingBottom: 30,
  },
  tag: {
    color: RED,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 17,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 43,
    letterSpacing: -1,
  },
  heroDesc: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 14,
    maxWidth: 300,
  },
  chatCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#302640',
    borderRadius: 20,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionSub: {
    color: MUTED,
    fontSize: 11,
    marginTop: 5,
  },
  aiBadge: {
    color: RED,
    fontSize: 9,
    fontWeight: '800',
    backgroundColor: '#261B38',
    padding: 8,
    borderRadius: 8,
  },
  welcome: {
    backgroundColor: '#211A30',
    borderRadius: 13,
    padding: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  welcomeIcon: {
    color: RED,
    fontSize: 24,
    marginBottom: 9,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  welcomeDesc: {
    color: '#A5A6B1',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  message: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#382451',
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  aiMessage: {
    backgroundColor: '#211D30',
    alignSelf: 'stretch',
  },
  messageLabel: {
    color: RED,
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 6,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 19,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#090A0F',
    borderWidth: 1,
    borderColor: '#403452',
    borderRadius: 13,
    padding: 8,
    marginTop: 5,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    maxHeight: 100,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  sendButton: {
    width: 39,
    height: 39,
    backgroundColor: RED,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  inputHint: {
    color: '#686A75',
    fontSize: 9,
    marginTop: 10,
  },
  modulesSection: {
    marginTop: 30,
  },
  viewAll: {
    color: RED,
    fontSize: 9,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  module: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#302640',
    borderRadius: 17,
    padding: 15,
    minHeight: 145,
  },
  moduleIcon: {
    fontSize: 27,
    marginBottom: 15,
  },
  moduleTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  moduleDesc: {
    color: MUTED,
    fontSize: 11,
    marginTop: 7,
  },
  moduleArrow: {
    color: RED,
    fontSize: 19,
    textAlign: 'right',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 35,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#302640',
  },
  footerBrand: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerText: {
    color: '#666875',
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 7,
  },
});

