/**
 * অ্যাডমিন বায়োমেট্রিকের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// বায়োমেট্রিক টাইপ
export const BIOMETRIC_TYPES = {
  FINGERPRINT: 'fingerprint',
  FACE_RECOGNITION: 'face_recognition',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',
  PALM_SCAN: 'palm_scan',
} as const;

// টাইপের আইকন
export const BIOMETRIC_TYPE_ICONS = {
  FINGERPRINT: '🖐️',
  FACE_RECOGNITION: '👤',
  IRIS_SCAN: '👁️',
  VOICE_RECOGNITION: '🎤',
  PALM_SCAN: '✋',
} as const;

// টাইপের কালার কোড
export const BIOMETRIC_TYPE_COLORS = {
  FINGERPRINT: '#3B82F6',
  FACE_RECOGNITION: '#22C55E',
  IRIS_SCAN: '#8B5CF6',
  VOICE_RECOGNITION: '#F59E0B',
  PALM_SCAN: '#EC4899',
} as const;

// টাইপের ডেসক্রিপশন
export const BIOMETRIC_TYPE_DESCRIPTIONS = {
  FINGERPRINT: 'Fingerprint recognition using touch sensor',
  FACE_RECOGNITION: 'Face recognition using camera',
  IRIS_SCAN: 'Iris scan using specialized camera',
  VOICE_RECOGNITION: 'Voice recognition using microphone',
  PALM_SCAN: 'Palm scan using specialized sensor',
} as const;

// টাইপের নির্ভুলতা লেভেল (১ = সর্বোচ্চ)
export const BIOMETRIC_TYPE_ACCURACY_LEVEL = {
  FINGERPRINT: 1,
  FACE_RECOGNITION: 2,
  IRIS_SCAN: 1,
  VOICE_RECOGNITION: 3,
  PALM_SCAN: 2,
} as const;

// টাইপের ডিভাইস সাপোর্ট
export const BIOMETRIC_TYPE_DEVICE_SUPPORT = {
  FINGERPRINT: {
    ios: [
      'iphone_5s',
      'iphone_6',
      'iphone_7',
      'iphone_8',
      'iphone_x',
      'iphone_11',
      'iphone_12',
      'iphone_13',
      'iphone_14',
    ],
    android: [
      'android_6',
      'android_7',
      'android_8',
      'android_9',
      'android_10',
      'android_11',
      'android_12',
    ],
    windows: ['windows_10', 'windows_11'],
    macos: ['macos_big_sur', 'macos_monterey', 'macos_ventura'],
  },
  FACE_RECOGNITION: {
    ios: ['iphone_x', 'iphone_11', 'iphone_12', 'iphone_13', 'iphone_14'],
    android: ['android_9', 'android_10', 'android_11', 'android_12'],
    windows: ['windows_11'],
    macos: ['macos_monterey', 'macos_ventura'],
  },
  IRIS_SCAN: {
    android: ['android_8', 'android_9'],
    windows: ['windows_10'],
  },
  VOICE_RECOGNITION: {
    ios: [
      'iphone_6',
      'iphone_7',
      'iphone_8',
      'iphone_x',
      'iphone_11',
      'iphone_12',
      'iphone_13',
      'iphone_14',
    ],
    android: ['android_7', 'android_8', 'android_9', 'android_10', 'android_11', 'android_12'],
    windows: ['windows_10', 'windows_11'],
    macos: ['macos_big_sur', 'macos_monterey', 'macos_ventura'],
  },
  PALM_SCAN: {
    windows: ['windows_10', 'windows_11'],
    android: ['android_10', 'android_11', 'android_12'],
  },
} as const;

// টাইপের সেটআপ প্রক্রিয়া
export const BIOMETRIC_TYPE_SETUP_PROCESS = {
  FINGERPRINT: 'Place finger on sensor and follow instructions',
  FACE_RECOGNITION: 'Position face in camera and follow instructions',
  IRIS_SCAN: 'Position eye in scanner and follow instructions',
  VOICE_RECOGNITION: 'Speak the provided phrase clearly',
  PALM_SCAN: 'Place palm on scanner and follow instructions',
} as const;

// টাইপ গ্রুপ
export const BIOMETRIC_TYPE_GROUPS = {
  TOUCH_BASED: ['fingerprint', 'palm_scan'],
  CAMERA_BASED: ['face_recognition', 'iris_scan'],
  AUDIO_BASED: ['voice_recognition'],
} as const;

// টাইপের লেবেল (বাংলা)
export const BIOMETRIC_TYPE_LABELS_BN = {
  FINGERPRINT: 'আঙুলের ছাপ',
  FACE_RECOGNITION: 'মুখ শনাক্তকরণ',
  IRIS_SCAN: 'আইরিস স্ক্যান',
  VOICE_RECOGNITION: 'ভয়েস শনাক্তকরণ',
  PALM_SCAN: 'হাতের ছাপ',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const BIOMETRIC_TYPE_LABELS_EN = {
  FINGERPRINT: 'Fingerprint',
  FACE_RECOGNITION: 'Face Recognition',
  IRIS_SCAN: 'Iris Scan',
  VOICE_RECOGNITION: 'Voice Recognition',
  PALM_SCAN: 'Palm Scan',
} as const;

// টাইপের CSS ক্লাস
export const BIOMETRIC_TYPE_CSS_CLASSES = {
  FINGERPRINT: 'bio-fingerprint',
  FACE_RECOGNITION: 'bio-face',
  IRIS_SCAN: 'bio-iris',
  VOICE_RECOGNITION: 'bio-voice',
  PALM_SCAN: 'bio-palm',
} as const;

// টাইপের জন্য ইমোজি
export const BIOMETRIC_TYPE_EMOJIS = {
  FINGERPRINT: '🔐',
  FACE_RECOGNITION: '📸',
  IRIS_SCAN: '🔍',
  VOICE_RECOGNITION: '🎙️',
  PALM_SCAN: '✋',
} as const;

// টাইপের সেটআপ সময় (মিনিটে)
export const BIOMETRIC_TYPE_SETUP_TIME = {
  FINGERPRINT: 2,
  FACE_RECOGNITION: 3,
  IRIS_SCAN: 5,
  VOICE_RECOGNITION: 3,
  PALM_SCAN: 2,
} as const;

// টাইপের হার্ডওয়্যার প্রয়োজন কিনা
export const BIOMETRIC_TYPE_REQUIRES_HARDWARE = {
  FINGERPRINT: true,
  FACE_RECOGNITION: true,
  IRIS_SCAN: true,
  VOICE_RECOGNITION: true,
  PALM_SCAN: true,
} as const;

// টাইপের সফটওয়্যার প্রয়োজন
export const BIOMETRIC_TYPE_SOFTWARE_REQUIREMENTS = {
  FINGERPRINT: ['fingerprint_service', 'touch_sensor_driver'],
  FACE_RECOGNITION: ['camera_service', 'face_detection_library'],
  IRIS_SCAN: ['iris_scanner_service', 'iris_detection_library'],
  VOICE_RECOGNITION: ['voice_service', 'speech_to_text_library'],
  PALM_SCAN: ['palm_scanner_service', 'palm_detection_library'],
} as const;
