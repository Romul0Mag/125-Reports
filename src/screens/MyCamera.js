import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

import { commonStyles } from "../styles/styles";

export default function CameraButton() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
    }
  };

  if (capturedImage) {
    return (
      <View style={styles.containerCamera}>
        <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />
        <TouchableOpacity style={styles.closeButton} onPress={() => setCapturedImage(null)}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isCameraOpen) {
    return (
      <View style={styles.containerCamera}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
        </Camera>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
                <Text style={styles.takePictureIcon}>📷</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraOpen(false)}>
            <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={ commonStyles.button } onPress={() => setIsCameraOpen(true)}>
        <Text style={styles.text}>📷 Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    takePictureButton: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    takePictureIcon: {
        fontSize: 24,
        color: '#000',
    },
    containerCamera: {
      width: 300, // Fixed width
      height: 300, 
      marginLeft: 20
    },
    container: {
        flex: 1,
    },
    camera: {
      flex: 1,
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#FFF', 
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
      },
      closeButtonText: {
        fontSize: 18,
        color: '#000',
      },
  });