import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BG = '#080810';
const CARD = '#171421';
const PRIMARY = '#8B5CF6';
const MUTED = '#A1A1AA';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />

      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>

          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  const { ref: _ref, ...buttonProps } = props;

  return (
    <Pressable
      {...buttonProps}
      style={({ pressed }) => [
        styles.tabButton,
        isFocused && styles.activeTab,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[
        styles.tabText,
        isFocused && styles.activeText,
      ]}>
        {children}
      </Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View
      {...props}
      style={[styles.tabListContainer, props.style]}
    >
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#302640',
    borderRadius: 18,
    padding: 7,
    gap: 8,
    zIndex: 100,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: PRIMARY,
  },
  tabText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  activeText: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
});
