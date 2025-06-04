import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Search, MapPin, ArrowRight } from 'lucide-react-native';
import ChatInterface from '@/components/ChatInterface';
import ResourceCard from '@/components/ResourceCard';
import Colors from '@/constants/Colors';
import { mockResources } from '@/data/mockResources';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const featuredResources = mockResources.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome to{' '}
            <Text style={{ color: Colors.primary[600] }}>Comm</Text>
            <Text style={{ color: Colors.secondary[600] }}>Unity</Text>
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Find resources, jobs, and support in your community
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="I need help with..."
              value={query}
              onChangeText={setQuery}
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => console.log('Search pressed')}
          >
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.locationContainer}>
          <MapPin size={16} color={Colors.primary[600]} />
          <Text style={styles.locationText}>San Francisco, CA</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <ChatInterface />

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Resources</Text>
            <Link href="/resources" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.resourcesContainer}>
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Job Opportunities</Text>
            <Link href="/jobs" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <TouchableOpacity style={styles.jobCard}>
            <View style={styles.jobCardContent}>
              <Text style={styles.jobTitle}>Customer Service Representative</Text>
              <Text style={styles.jobCompany}>Local Retail Store</Text>
              <Text style={styles.jobLocation}>
                <MapPin size={14} color={Colors.gray[500]} /> 2 miles away
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
  },
  searchContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.gray[900],
  },
  searchButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: Colors.gray[700],
    marginLeft: 6,
    marginRight: 8,
  },
  changeText: {
    fontSize: 14,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  resourcesContainer: {
    paddingHorizontal: 16,
  },
  jobCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
  },
  jobCardContent: {
    padding: 16,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.gray[900],
  },
  jobCompany: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  jobLocation: {
    fontSize: 12,
    color: Colors.gray[500],
    flexDirection: 'row',
    alignItems: 'center',
  },
});