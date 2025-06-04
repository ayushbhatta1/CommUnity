import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MapPin, Clock, Phone, Globe, Check } from 'lucide-react-native';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { mockResources } from '@/data/mockResources';

export default function ResourceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resource = mockResources.find(r => r.id === id);

  if (!resource) {
    return (
      <View style={styles.container}>
        <Header title="Resource Details" />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Resource not found</Text>
        </View>
      </View>
    );
  }

  const handleCall = () => {
    if (resource.phone) {
      Linking.openURL(`tel:${resource.phone}`);
    }
  };

  const handleWebsite = () => {
    if (resource.website) {
      Linking.openURL(resource.website);
    }
  };

  const handleDirections = () => {
    const address = encodeURIComponent(resource.address);
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };

  return (
    <View style={styles.container}>
      <Header title={resource.name} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSection}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{resource.category}</Text>
          </View>
          <Text style={styles.title}>{resource.name}</Text>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MapPin size={18} color={Colors.gray[600]} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{resource.address}</Text>
              <Text style={styles.distanceText}>{resource.distance} away</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={18} color={Colors.gray[600]} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Hours</Text>
              <Text style={styles.infoValue}>{resource.hours}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Phone size={18} color={Colors.gray[600]} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{resource.phone}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Globe size={18} color={Colors.gray[600]} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{resource.website}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{resource.description}</Text>
        </View>
        
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          {resource.services.map((service, index) => (
            <View key={index} style={styles.serviceRow}>
              <Check size={16} color={Colors.secondary[600]} style={styles.checkIcon} />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.requirementsSection}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.requirementsText}>{resource.requirements}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <MapPin size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
            <Globe size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>Was this resource helpful?</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>👍 Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>👎 No</Text>
            </TouchableOpacity>
          </View>
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray[600],
  },
  headerSection: {
    padding: 20,
    backgroundColor: Colors.primary[50],
  },
  categoryContainer: {
    backgroundColor: Colors.primary[100],
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: Colors.primary[700],
    fontWeight: '500',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[800],
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.gray[800],
  },
  distanceText: {
    fontSize: 14,
    color: Colors.primary[600],
    marginTop: 2,
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.gray[700],
    lineHeight: 24,
  },
  servicesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 16,
    color: Colors.gray[700],
  },
  requirementsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  requirementsText: {
    fontSize: 16,
    color: Colors.gray[700],
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  feedbackSection: {
    padding: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: 12,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feedbackButton: {
    backgroundColor: Colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
  },
  feedbackButtonText: {
    fontSize: 16,
    color: Colors.gray[700],
  },
});