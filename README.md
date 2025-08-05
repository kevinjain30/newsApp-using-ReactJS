# News Channel App (React Native)

![App Screenshot](https://placehold.co/600x400/4A6CF7/ffffff?text=News+App+UI)

A mobile news application built with React Native and Expo. It provides a dynamic news feed, live streaming capabilities, and allows users to capture and share geotagged photos, simulating a citizen journalism experience.

## ✨ Features

* **Dynamic News Feed**: A scrollable list of news articles with images, titles, descriptions, and color-coded categories.
* **Pull-to-Refresh**: Easily refresh the news feed with a simple pull-down gesture.
* **Go Live Functionality**: A "Go Live" button that offers users the choice to stream via YouTube or use the in-app camera.
* **Camera & Geotagging**:
    * Integrated camera access using `expo-image-picker`.
    * Automatic geotagging of captured photos with city and precise location data using `expo-location`.
* **User-Generated Content Gallery**:
    * Captured images are saved locally using `@react-native-async-storage/async-storage`.
    * An in-app horizontal gallery displays all user-captured photos.
* **Image Management**:
    * Tap any captured photo to view it in a full-screen modal.
    * Download photos directly to the device's media library using `expo-media-library`.
    * Dismiss (delete) photos from the gallery and local storage.
* **Modern UI/UX**:
    * Clean, card-based layout for news articles.
    * Custom fonts loaded with `expo-font` and `@expo-google-fonts`.
    * Smooth gradients using `expo-linear-gradient`.
    * Intuitive bottom tab navigation with vector icons from `@expo/vector-icons`.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Expo Go](https://expo.dev/client) app on your Android or iOS device.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/newsapp-using-reactjs.git](https://github.com/your-username/newsapp-using-reactjs.git)
    cd newsapp-using-reactjs
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will start the Metro Bundler and display a QR code in your terminal.

4.  **Run the app:**
    * **On a physical device**: Scan the QR code using the Expo Go app on your Android or iOS device.
    * **On an emulator/simulator**: Press `a` for the Android Emulator or `i` for the iOS Simulator in the terminal.

## 🛠️ Built With

* [React Native](https://reactnative.dev/) - The framework for building native apps using React.
* [Expo](https://expo.dev/) - The framework and a platform for universal React applications.
* [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) - For camera and image library access.
* [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - For accessing device location.
* [Expo Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/) - For saving media to the device.
* [Async Storage](https://react-native-async-storage.github.io/async-storage/) - For persistent data storage.
* [Expo Google Fonts](https://github.com/expo/google-fonts) - For using custom fonts.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
