import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Search, Filter, MapPin } from 'lucide-react-native';
import Header from '@/components/Header';
import JobCard from '@/components/JobCard';
import Colors from '@/constants/Colors';
import { mockJobs } from '@/data/mockJobs';

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Find Jobs" showBackButton={false} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray[400]}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Your Skills</Text>
        <View style={styles.skillsRow}>
          <TouchableOpacity style={styles.skillTag}>
            <Text style={styles.skillText}>Customer Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skillTag}>
            <Text style={styles.skillText}>Retail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skillTag}>
            <Text style={styles.skillText}>Cashier</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.addSkillText}>+ Add more skills</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.jobListContainer}>
        <Text style={styles.sectionTitle}>Recommended Jobs</Text>
        <FlatList
          data={mockJobs}
          renderItem={({ item }) => <JobCard job={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobList}
        />
      </View>
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
  skillsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.gray[800],
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  skillTag: {
    backgroundColor: Colors.primary[100],
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: Colors.primary[700],
    fontSize: 14,
    fontWeight: '500',
  },
  addSkillText: {
    color: Colors.primary[600],
    fontWeight: '500',
    fontSize: 14,
  },
  jobListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  jobList: {
    paddingBottom: 16,
  },
});