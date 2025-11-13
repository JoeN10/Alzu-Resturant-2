import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { getCourseLabel } from '../constants/courses';
import { MenuItem } from '../types/menu';

interface MenuListProps {
  items: MenuItem[];
  emptyMessage?: string;
  actionSlot?: (item: MenuItem) => React.ReactNode;
  scrollEnabled?: boolean;
}

export const MenuList: React.FC<MenuListProps> = ({
  items,
  emptyMessage = 'No menu items available yet.',
  actionSlot,
  scrollEnabled = true,
}) => {
  if (items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Menu is empty</Text>
        <Text style={styles.emptySubtitle}>{emptyMessage}</Text>
      </View>
    );
  }

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={scrollEnabled}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.course}>{getCourseLabel(item.course)}</Text>
            </View>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          {actionSlot ? <View style={styles.actionContainer}>{actionSlot(item)}</View> : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 2,
  },
  course: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00897B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00695C',
  },
  description: {
    fontSize: 14,
    color: '#546E7A',
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: 12,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#607D8B',
    textAlign: 'center',
    maxWidth: 260,
  },
});

