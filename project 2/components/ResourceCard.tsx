import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, Phone } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Resource } from '@/types';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({
        pathname: '/home/resource-details',
        params: { id: resource.id }
      })}
    >
      <View style={styles.cardContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{resource.category}</Text>
        </View>
        
        <Text style={styles.title}>{resource.name}</Text>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.primary[500]} />
          <Text style={styles.infoText}>{resource.distance} away</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={14} color={Colors.primary[500]} />
          <Text style={styles.infoText}>{resource.hours}</Text>
        </View>
        
        {resource.phone && (
          <View style={styles.infoRow}>
            <Phone size={14} color={Colors.primary[500]} />
            <Text style={styles.infoText}>{resource.phone}</Text>
          </View>
        )}
        
        <Text 
          style={styles.description}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {resource.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: Colors.primary[900],
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  cardContent: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary[100],
  },
  categoryText: {
    fontSize: 13,
    color: Colors.primary[700],
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray[700],
    marginLeft: 8,
    fontWeight: '500',
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.gray[600],
    lineHeight: 20,
  },
});