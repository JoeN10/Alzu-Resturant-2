import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CourseSelector } from '../components/CourseSelector';
import { MenuList } from '../components/MenuList';
import { useMenu } from '../context/MenuContext';
import { CourseId } from '../types/menu';

export const ManageMenuScreen: React.FC = () => {
  const { items, addMenuItem, removeMenuItem } = useMenu();
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<CourseId | ''>('');
  const [price, setPrice] = useState('');

  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  const handleAddItem = () => {
    if (!dishName.trim()) {
      Alert.alert('Validation', 'Please enter a dish name.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Validation', 'Please provide a description.');
      return;
    }

    if (!course) {
      Alert.alert('Validation', 'Select a course for the dish.');
      return;
    }

    const parsedPrice = Number(price);
    if (!price.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Validation', 'Enter a valid price greater than zero.');
      return;
    }

    addMenuItem({
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(parsedPrice.toFixed(2)),
    });

    Alert.alert('Success', `${dishName.trim()} was added to the menu.`);
    resetForm();
  };

  const confirmRemoval = (id: string, name: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeMenuItem(id),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Chef Control Centre</Text>
          <Text style={styles.heroSubtitle}>
            Add new dishes, refine descriptions, and keep the Alzu menu fresh.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Add Menu Item</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              value={dishName}
              onChangeText={setDishName}
              placeholder="e.g. Truffle Wild Mushroom Risotto"
              placeholderTextColor="#90A4AE"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Rich arborio rice cooked in porcini stock..."
              placeholderTextColor="#90A4AE"
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course</Text>
            <CourseSelector value={course} onChange={setCourse} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor="#90A4AE"
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Save Menu Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Current Menu</Text>
          <MenuList
            items={items}
            emptyMessage="Add your first dish to start building the restaurant experience."
            scrollEnabled={false}
            actionSlot={(item) => (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => confirmRemoval(item.id, item.name)}
              >
                <Text style={styles.removeButtonText}>Remove from menu</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF9',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: '#004D40',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#E0F2F1',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004D40',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B2DFDB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#37474F',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#00695C',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#004D40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  listSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#E57373',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#C62828',
    fontWeight: '700',
    fontSize: 14,
  },
});

