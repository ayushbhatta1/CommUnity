import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  const formatSalary = (min: number, max: number, period: string) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} ${period}`;
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => console.log('Job details', job.id)}
    >
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{job.title}</Text>
          <View style={[
            styles.typeBadge, 
            job.type === 'Full-time' ? styles.fullTimeBadge : 
            job.type === 'Part-time' ? styles.partTimeBadge : 
            styles.contractBadge
          ]}>
            <Text style={styles.typeText}>{job.type}</Text>
          </View>
        </View>
        
        <Text style={styles.company}>{job.company}</Text>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.gray[500]} />
          <Text style={styles.infoText}>{job.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <DollarSign size={14} color={Colors.gray[500]} />
          <Text style={styles.infoText}>
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={14} color={Colors.gray[500]} />
          <Text style={styles.infoText}>Posted {job.postedDate}</Text>
        </View>
        
        <View style={styles.skillsContainer}>
          {job.skills.slice(0, 3).map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 3 && (
            <View style={styles.moreBadge}>
              <Text style={styles.moreText}>+{job.skills.length - 3}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  fullTimeBadge: {
    backgroundColor: Colors.secondary[100],
  },
  partTimeBadge: {
    backgroundColor: Colors.primary[100],
  },
  contractBadge: {
    backgroundColor: Colors.accent[100],
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray[800],
  },
  company: {
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray[600],
    marginLeft: 6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: Colors.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: Colors.gray[700],
  },
  moreBadge: {
    backgroundColor: Colors.gray[200],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  moreText: {
    fontSize: 12,
    color: Colors.gray[700],
  },
  actionsRow: {
    flexDirection: 'row',
  },
  applyButton: {
    flex: 2,
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  applyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[600],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: Colors.primary[600],
    fontSize: 14,
    fontWeight: '600',
  },
});