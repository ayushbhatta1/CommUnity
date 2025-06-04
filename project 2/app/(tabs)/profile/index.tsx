import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { Settings, BookOpen, Heart, MapPin, LogOut, AlertTriangle } from 'lucide-react-native';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteAccount = () => {
    // Implement actual account deletion logic here
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Profile" 
        showBackButton={false}
        rightComponent={
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={22} color={Colors.gray[700]} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Maria Johnson</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={Colors.gray[500]} />
                <Text style={styles.locationText}>San Francisco, CA</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Language Preference</Text>
            <View style={styles.settingValueContainer}>
              <Text style={styles.settingValue}>English</Text>
              <Text style={styles.changeText}>Change</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Location</Text>
            <View style={styles.settingValueContainer}>
              <Text style={styles.settingValue}>San Francisco, CA</Text>
              <Text style={styles.changeText}>Change</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Notification Settings</Text>
            <Text style={styles.changeText}>Manage</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <BookOpen size={20} color={Colors.primary[600]} />
            <Text style={styles.menuText}>Saved Resources</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={20} color={Colors.primary[600]} />
            <Text style={styles.menuText}>Favorite Jobs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color={Colors.primary[600]} />
            <Text style={styles.menuText}>Privacy Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Account Management</Text>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => setDeleteModalVisible(true)}
          >
            <AlertTriangle size={20} color={Colors.error[600]} />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
          <Text style={styles.dangerText}>
            Deleting your account will permanently remove all your data, saved resources, and preferences.
            This action cannot be undone.
          </Text>
        </View>
        
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color={Colors.error[600]} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About CommUnity</Text>
          <Text style={styles.aboutText}>
            CommUnity is designed to connect you with local resources, job opportunities, and language tools to help you thrive in your community.
          </Text>
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AlertTriangle size={32} color={Colors.error[600]} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmDeleteButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.confirmDeleteText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.primary[100],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.gray[800],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.gray[500],
  },
  editButton: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: Colors.primary[600],
    fontSize: 14,
    fontWeight: '500',
  },
  settingsSection: {
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.gray[700],
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: Colors.gray[900],
    marginRight: 8,
  },
  changeText: {
    color: Colors.primary[600],
    fontSize: 14,
    fontWeight: '500',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  menuText: {
    fontSize: 16,
    marginLeft: 16,
    color: Colors.gray[700],
  },
  dangerSection: {
    padding: 16,
    backgroundColor: Colors.error[50],
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error[700],
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error[100],
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: Colors.error[700],
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  dangerText: {
    fontSize: 14,
    color: Colors.error[600],
    lineHeight: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.error[200],
    borderRadius: 8,
  },
  signOutText: {
    color: Colors.error[600],
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  aboutSection: {
    padding: 16,
    marginBottom: 24,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.gray[800],
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  versionInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: Colors.gray[400],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.error[700],
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.gray[700],
    fontSize: 16,
    fontWeight: '600',
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: Colors.error[600],
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});