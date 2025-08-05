import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Modal, // Import Modal for the full-screen image view
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // Import Location services
import * as MediaLibrary from 'expo-media-library'; // Import Media Library for downloading
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Main application component for the News Channel app.
 * Features a news feed, live streaming options, and camera functionality with geotagging.
 */
export default function App() {
  // State variables for managing news data, loading states, and UI interaction
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]); // Will now store objects { uri, city, preciseLocation }
  const [activeTab, setActiveTab] = useState('Home');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // State for the image object in the modal

  // Load custom fonts for the application
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Roboto_400Regular,
  });

  // Sample data for the news feed
  const sampleNews = [
    {
      id: 1,
      title: "Breaking: Major Economic Summit Begins Today",
      description: "World leaders gather to discuss global economic policies and trade agreements.",
      image: "https://placehold.co/600x400/3498db/ffffff?text=Economy",
      category: "Politics",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Tech Giant Announces Revolutionary AI Platform",
      description: "New artificial intelligence platform promises to transform various industries.",
      image: "https://placehold.co/600x400/e67e22/ffffff?text=AI",
      category: "Technology",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Climate Change Conference Reaches Historic Agreement",
      description: "Nations commit to ambitious carbon reduction targets for the next decade.",
      image: "https://placehold.co/600x400/2ecc71/ffffff?text=Climate",
      category: "Environment",
      time: "6 hours ago",
    },
    {
      id: 4,
      title: "Sports: Championship Finals This Weekend",
      description: "Two powerhouse teams prepare for the ultimate showdown in this year's finals.",
      image: "https://placehold.co/600x400/e74c3c/ffffff?text=Sports",
      category: "Sports",
      time: "8 hours ago",
    },
  ];

  // Load news data and any saved image from storage when the component mounts
  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const imagesJson = await AsyncStorage.getItem('capturedImagesArray');
        if (imagesJson !== null) {
          setCapturedImages(JSON.parse(imagesJson));
        }
      } catch (e) {
        console.error("Failed to load images from storage.", e);
      }
    };

    loadStoredImages();
    loadNews();
  }, []);

  // Simulates fetching news data from an API
  const loadNews = () => {
    setLoading(true);
    setTimeout(() => {
      setNews(sampleNews);
      setLoading(false);
    }, 1000);
  };

  // Handles the pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true);
    loadNews();
    setRefreshing(false);
  };

  // Shows an alert with options for going live
  const handleGoLive = () => {
    Alert.alert(
      "Go Live",
      "Choose your streaming option:",
      [
        { text: "Cancel", style: "cancel" },
        { text: "YouTube Live", onPress: () => openYouTubeLive() },
        { text: "Open Camera", onPress: () => openCamera() }
      ]
    );
  };

  // Opens the YouTube app or prompts the user to install it
  const openYouTubeLive = async () => {
    const youtubeUrl = "https://www.youtube.com";
    const supported = await Linking.canOpenURL(youtubeUrl);
    if (supported) {
      await Linking.openURL(youtubeUrl);
    } else {
      Alert.alert("YouTube App Not Found", "To use this feature, please install the YouTube app.");
    }
  };

  // Opens the device camera, gets location, and saves the geotagged image
  const openCamera = async () => {
    // Request camera permissions
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermissionResult.granted) {
      Alert.alert("Permission Denied", "Permission to access the camera is required!");
      return;
    }

    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    let city = null;
    let preciseLocation = null;
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied. Location will not be added to photos.');
    } else {
      try {
        // Fetch location with high accuracy
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (geocode.length > 0) {
          const address = geocode[0];
          city = address.city || address.subregion;
          // Create a more detailed address string, filtering out null parts
          preciseLocation = [address.street, address.city, address.region, address.country].filter(Boolean).join(', ');
        }
      } catch (e) {
        console.error("Error getting location", e);
        Alert.alert("Location Error", "Could not fetch location.");
      }
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const newImage = { uri, city, preciseLocation }; // Create image object with detailed location
      // Prepend the new image to show it first
      const newImages = [newImage, ...capturedImages];
      setCapturedImages(newImages);
      try {
        await AsyncStorage.setItem('capturedImagesArray', JSON.stringify(newImages));
        Alert.alert("Success", "Image captured and saved! Tap on the photo to view it full screen.");
      } catch (e) {
        console.error("Failed to save image to storage.", e);
        Alert.alert("Error", "Could not save the image.");
      }
    }
  };

  // Function to dismiss a specific captured image and remove it from storage
  const dismissImage = async (uriToRemove) => {
    const newImages = capturedImages.filter(image => image.uri !== uriToRemove);
    setCapturedImages(newImages);
    try {
      await AsyncStorage.setItem('capturedImagesArray', JSON.stringify(newImages));
    } catch (e) {
      console.error("Failed to remove image from storage.", e);
    }
  };

  // Function to download an image to the device's media library
  const downloadImage = async (uri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access media library is required to download images.');
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Image downloaded successfully to your gallery!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  // Simulates sharing a news item
  const shareNews = (item) => {
    Alert.alert("Share", `Sharing: ${item.title}`);
  };

  // Returns a color based on the news category
  const getCategoryColor = (category) => {
    const colors = {
      Politics: '#3498db',
      Technology: '#e67e22',
      Environment: '#2ecc71',
      Sports: '#e74c3c',
      default: '#95a5a6'
    };
    return colors[category] || colors.default;
  };

  // Function to handle opening the image in a modal
  const onImagePress = (imageObject) => {
    setSelectedImage(imageObject);
    setIsModalVisible(true);
  };

  // Renders a single news item card for the FlatList
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        <View style={styles.newsActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => shareNews(item)}>
            <Ionicons name="share-outline" size={22} color="#555" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={22} color="#555" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // If fonts are not yet loaded, return null to prevent screen flicker
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Modal for displaying the full-screen image */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <>
              <Image source={{ uri: selectedImage.uri }} style={styles.fullScreenImage} resizeMode="contain" />
              {selectedImage.preciseLocation && (
                <View style={[styles.locationOverlay, styles.modalLocationOverlay]}>
                  <Ionicons name="location-sharp" size={16} color="white" />
                  <Text style={[styles.locationText, { fontSize: 14 }]}>{selectedImage.preciseLocation}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.downloadButton} onPress={() => downloadImage(selectedImage.uri)}>
                <Ionicons name="download-outline" size={24} color="white" />
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      <LinearGradient colors={['#4A6CF7', '#1E40AF']} style={styles.header}>
        <Text style={styles.headerTitle}>📺 News Channel</Text>
        <TouchableOpacity style={styles.liveButton} onPress={handleGoLive}>
          <Ionicons name="videocam" size={18} color="white" />
          <Text style={styles.liveButtonText}>GO LIVE</Text>
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.newsFeed}
        contentContainerStyle={{ paddingVertical: 10 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          capturedImages.length > 0 && (
            <View style={styles.capturedImageContainer}>
              <Text style={styles.newsTitle}>Your Captured Photos:</Text>
              <FlatList
                horizontal
                data={capturedImages}
                keyExtractor={(item, index) => `${item.uri}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.thumbnailContainer}>
                    <TouchableOpacity onPress={() => onImagePress(item)}>
                      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                      {item.city && (
                        <View style={[styles.locationOverlay, styles.thumbnailLocationOverlay]}>
                          <Ionicons name="location-sharp" size={12} color="white" />
                          <Text style={styles.locationText}>{item.city}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dismissButton} onPress={() => dismissImage(item.uri)}>
                      <Ionicons name="close-circle" size={24} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )
        }
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Home')}>
            <Ionicons name={activeTab === 'Home' ? 'home' : 'home-outline'} size={26} color={activeTab === 'Home' ? '#1E40AF' : '#888'} />
            <Text style={[styles.navText, { color: activeTab === 'Home' ? '#1E40AF' : '#888' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Search')}>
            <Ionicons name={activeTab === 'Search' ? 'search' : 'search-outline'} size={26} color={activeTab === 'Search' ? '#1E40AF' : '#888'} />
            <Text style={[styles.navText, { color: activeTab === 'Search' ? '#1E40AF' : '#888' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Videos')}>
            <Ionicons name={activeTab === 'Videos' ? 'play-circle' : 'play-circle-outline'} size={26} color={activeTab === 'Videos' ? '#1E40AF' : '#888'} />
            <Text style={[styles.navText, { color: activeTab === 'Videos' ? '#1E40AF' : '#888' }]}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Alerts')}>
            <Ionicons name={activeTab === 'Alerts' ? 'notifications' : 'notifications-outline'} size={26} color={activeTab === 'Alerts' ? '#1E40AF' : '#888'} />
            <Text style={[styles.navText, { color: activeTab === 'Alerts' ? '#1E40AF' : '#888' }]}>Alerts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
  },
  liveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  liveButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 6, fontSize: 12 },
  newsFeed: { flex: 1, paddingHorizontal: 10 },
  newsItem: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 16,
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: 5,
  },
  newsImage: { width: '100%', height: 200, borderRadius: 16 },
  newsContent: { padding: 15 },
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  categoryText: { color: 'white', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  timeText: { color: '#888', fontSize: 12, fontFamily: 'Roboto_400Regular' },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    color: '#222',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 15,
  },
  newsActions: { flexDirection: 'row', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F0F2F5' },
  actionButton: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  actionText: { marginLeft: 8, color: '#555', fontSize: 14, fontFamily: 'Roboto_400Regular' },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingBottom: 20,
  },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 10, fontFamily: 'Roboto_400Regular', marginTop: 4 },
  capturedImageContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
  },
  thumbnailContainer: {
    marginRight: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  dismissButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  locationOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailLocationOverlay: {
    bottom: 5,
    left: 5,
  },
  locationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  // Styles for the full-screen image modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  modalLocationOverlay: {
    position: 'absolute',
    bottom: 120, // Position it above the download button
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
