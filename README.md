# 📰 News Channel App – React Native & Expo

![App Screenshot](https://placehold.co/600x400/4A6CF7/ffffff?text=News+App+UI)

> A feature-rich mobile news application simulating a citizen journalism platform with live streaming and geotagged photo sharing.

[![React Native](https://img.shields.io/badge/React%20Native-%5E0.73-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0.10-green?logo=expo)](https://expo.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

---

## ✨ Features

- **🗞 Dynamic News Feed**  
  Scrollable list of articles with images, titles, descriptions, and color-coded categories.

- **🔄 Pull-to-Refresh**  
  Refresh articles with a simple pull-down gesture.

- **📡 Go Live Integration**  
  Launch live streams via YouTube or capture real-time video using the in-app camera.

- **📷 Camera & Geotagging**  
  - Capture photos with the device camera using `expo-image-picker`.  
  - Automatically attach location data (city + GPS) using `expo-location`.

- **🖼️ User Gallery**  
  - Captured photos are stored locally using `@react-native-async-storage/async-storage`.  
  - A sleek horizontal gallery displays all user-generated content.

- **🧰 Media Management**  
  - Full-screen image modal viewer.  
  - Save images to device gallery using `expo-media-library`.  
  - Delete (dismiss) images from local storage.

- **💅 Modern UI/UX**  
  - Stylish, card-based layout for articles.  
  - Google Fonts via `@expo-google-fonts`.  
  - Smooth gradients using `expo-linear-gradient`.  
  - Tabbed navigation with `@expo/vector-icons`.

---

## 🚀 Getting Started

Get a local development environment up and running:

### 📦 Prerequisites

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app (for Android/iOS)

### ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/newsapp-using-reactjs.git
   cd newsapp-using-reactjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run the App**
   - **On a physical device**: Scan the QR code with the Expo Go app.
   - **On an emulator/simulator**: Press `a` (Android) or `i` (iOS) in the terminal.

---

## 🛠️ Built With

| Package                     | Purpose                                     |
|----------------------------|---------------------------------------------|
| [React Native](https://reactnative.dev/) | Cross-platform native app development |
| [Expo](https://expo.dev/)  | Rapid development with prebuilt tools      |
| [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Access camera/image library           |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | Location tracking for geotagging       |
| [expo-media-library](https://docs.expo.dev/versions/latest/sdk/media-library/) | Save photos to device gallery          |
| [Async Storage](https://react-native-async-storage.github.io/async-storage/) | Persistent local storage              |
| [Expo Google Fonts](https://github.com/expo/google-fonts) | Custom font integration                |

---

## 🤝 Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to your branch:  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request 🚀  
   Submit your pull request with a clear title and description. Make sure to explain:
   - What feature or fix your PR adds
   - Any relevant issue numbers (e.g., `Fixes #12`)
   - Steps to test or reproduce the new feature or fix

💡 **Tip:** Keep your commits clean and meaningful. Squash your commits if necessary before submitting your PR.

The project maintainers will review your PR and provide feedback. Once everything looks good, it will be merged into the main branch.

Thank you for contributing and making this project better! 🙌
