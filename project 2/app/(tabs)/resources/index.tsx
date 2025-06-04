import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Search, Filter, MapPin } from 'lucide-react-native';
import ResourceCard from '@/components/ResourceCard';
import CategoryButton from '@/components/CategoryButton';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { mockResources } from '@/data/mockResources';
import { ResourceCategory } from '@/types';

export default function ResourcesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);

  const categories: ResourceCategory[] = ['Housing', 'Food', 'Healthcare', 'Education', 'Employment', 'Legal', 'Financial'];

  const filteredResources = selectedCategory 
    ? mockResources.filter(r => r.category === selectedCategory)
    : mockResources;

  return (
    <View style={styles.container}>
      <Header title="Find Resources" showBackButton={false} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray[400]}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <CategoryButton 
          title="All" 
          isSelected={selectedCategory === null} 
          onPress={() => setSelectedCategory(null)} 
        />
        {categories.map(category => (
          <CategoryButton
            key={category}
            title={category}
            isSelected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>
      
      <FlatList
        data={filteredResources}
        renderItem={({ item }) => <ResourceCard resource={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.resourcesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.gray[900],
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray[100],
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  resourcesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});