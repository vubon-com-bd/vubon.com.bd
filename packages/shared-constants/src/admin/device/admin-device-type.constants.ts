/**
 * Admin Device Type Constants
 * Detailed device type definitions for admin device management
 */

export const ADMIN_DEVICE_TYPE = {
  // Computer types
  DESKTOP: 'desktop',
  WORKSTATION: 'workstation',
  SERVER: 'server',
  MAINFRAME: 'mainframe',
  MINI_COMPUTER: 'mini_computer',
  ALL_IN_ONE: 'all_in_one',

  // Mobile types
  SMARTPHONE: 'smartphone',
  PHABLET: 'phablet',
  TABLET: 'tablet',
  E_READER: 'e_reader',
  PDA: 'pda',

  // Laptop types
  LAPTOP: 'laptop',
  NOTEBOOK: 'notebook',
  ULTRA_BOOK: 'ultra_book',
  CONVERTIBLE: 'convertible',
  CHROME_BOOK: 'chrome_book',
  GAMING_LAPTOP: 'gaming_laptop',

  // Wearable types
  SMART_WATCH: 'smart_watch',
  FITNESS_TRACKER: 'fitness_tracker',
  SMART_GLASSES: 'smart_glasses',
  VR_HEADSET: 'vr_headset',
  AR_HEADSET: 'ar_headset',
  HEARABLE: 'hearable',

  // TV types
  SMART_TV: 'smart_tv',
  TV_BOX: 'tv_box',
  STREAMING_STICK: 'streaming_stick',
  SET_TOP_BOX: 'set_top_box',

  // Gaming types
  GAMING_CONSOLE: 'gaming_console',
  HANDHELD_GAMING: 'handheld_gaming',
  GAMING_PC: 'gaming_pc',

  // Network types
  ROUTER: 'router',
  SWITCH: 'switch',
  FIREWALL: 'firewall',
  NETWORK_ATTACHED_STORAGE: 'nas',
  ACCESS_POINT: 'access_point',

  // Virtual types
  VIRTUAL_MACHINE: 'virtual_machine',
  CONTAINER: 'container',
  CLOUD_INSTANCE: 'cloud_instance',
  EMULATOR: 'emulator',
  SIMULATOR: 'simulator',

  // IoT types
  IOT_SENSOR: 'iot_sensor',
  IOT_ACTUATOR: 'iot_actuator',
  SMART_HOME: 'smart_home',
  INDUSTRIAL_IOT: 'industrial_iot',

  // Peripheral types
  PRINTER: 'printer',
  SCANNER: 'scanner',
  MONITOR: 'monitor',
  PROJECTOR: 'projector',
  SPEAKER: 'speaker',
  CAMERA: 'camera',
  MICROPHONE: 'microphone',

  // Storage types
  EXTERNAL_HDD: 'external_hdd',
  EXTERNAL_SSD: 'external_ssd',
  USB_DRIVE: 'usb_drive',
  MEMORY_CARD: 'memory_card',

  // Other types
  DIGITAL_SIGNAGE: 'digital_signage',
  POS_TERMINAL: 'pos_terminal',
  ATM: 'atm',
  KIOSK: 'kiosk',
  OTHER: 'other',
} as const;

export type AdminDeviceTypeDetail = (typeof ADMIN_DEVICE_TYPE)[keyof typeof ADMIN_DEVICE_TYPE];

export const ADMIN_DEVICE_TYPE_CATEGORIES: Record<AdminDeviceTypeDetail, string> = {
  // Computer types
  [ADMIN_DEVICE_TYPE.DESKTOP]: 'computer',
  [ADMIN_DEVICE_TYPE.WORKSTATION]: 'computer',
  [ADMIN_DEVICE_TYPE.SERVER]: 'computer',
  [ADMIN_DEVICE_TYPE.MAINFRAME]: 'computer',
  [ADMIN_DEVICE_TYPE.MINI_COMPUTER]: 'computer',
  [ADMIN_DEVICE_TYPE.ALL_IN_ONE]: 'computer',

  // Mobile types
  [ADMIN_DEVICE_TYPE.SMARTPHONE]: 'mobile',
  [ADMIN_DEVICE_TYPE.PHABLET]: 'mobile',
  [ADMIN_DEVICE_TYPE.TABLET]: 'mobile',
  [ADMIN_DEVICE_TYPE.E_READER]: 'mobile',
  [ADMIN_DEVICE_TYPE.PDA]: 'mobile',

  // Laptop types
  [ADMIN_DEVICE_TYPE.LAPTOP]: 'laptop',
  [ADMIN_DEVICE_TYPE.NOTEBOOK]: 'laptop',
  [ADMIN_DEVICE_TYPE.ULTRA_BOOK]: 'laptop',
  [ADMIN_DEVICE_TYPE.CONVERTIBLE]: 'laptop',
  [ADMIN_DEVICE_TYPE.CHROME_BOOK]: 'laptop',
  [ADMIN_DEVICE_TYPE.GAMING_LAPTOP]: 'laptop',

  // Wearable types
  [ADMIN_DEVICE_TYPE.SMART_WATCH]: 'wearable',
  [ADMIN_DEVICE_TYPE.FITNESS_TRACKER]: 'wearable',
  [ADMIN_DEVICE_TYPE.SMART_GLASSES]: 'wearable',
  [ADMIN_DEVICE_TYPE.VR_HEADSET]: 'wearable',
  [ADMIN_DEVICE_TYPE.AR_HEADSET]: 'wearable',
  [ADMIN_DEVICE_TYPE.HEARABLE]: 'wearable',

  // TV types
  [ADMIN_DEVICE_TYPE.SMART_TV]: 'tv',
  [ADMIN_DEVICE_TYPE.TV_BOX]: 'tv',
  [ADMIN_DEVICE_TYPE.STREAMING_STICK]: 'tv',
  [ADMIN_DEVICE_TYPE.SET_TOP_BOX]: 'tv',

  // Gaming types
  [ADMIN_DEVICE_TYPE.GAMING_CONSOLE]: 'gaming',
  [ADMIN_DEVICE_TYPE.HANDHELD_GAMING]: 'gaming',
  [ADMIN_DEVICE_TYPE.GAMING_PC]: 'gaming',

  // Network types
  [ADMIN_DEVICE_TYPE.ROUTER]: 'network',
  [ADMIN_DEVICE_TYPE.SWITCH]: 'network',
  [ADMIN_DEVICE_TYPE.FIREWALL]: 'network',
  [ADMIN_DEVICE_TYPE.NETWORK_ATTACHED_STORAGE]: 'network',
  [ADMIN_DEVICE_TYPE.ACCESS_POINT]: 'network',

  // Virtual types
  [ADMIN_DEVICE_TYPE.VIRTUAL_MACHINE]: 'virtual',
  [ADMIN_DEVICE_TYPE.CONTAINER]: 'virtual',
  [ADMIN_DEVICE_TYPE.CLOUD_INSTANCE]: 'virtual',
  [ADMIN_DEVICE_TYPE.EMULATOR]: 'virtual',
  [ADMIN_DEVICE_TYPE.SIMULATOR]: 'virtual',

  // IoT types
  [ADMIN_DEVICE_TYPE.IOT_SENSOR]: 'iot',
  [ADMIN_DEVICE_TYPE.IOT_ACTUATOR]: 'iot',
  [ADMIN_DEVICE_TYPE.SMART_HOME]: 'iot',
  [ADMIN_DEVICE_TYPE.INDUSTRIAL_IOT]: 'iot',

  // Peripheral types
  [ADMIN_DEVICE_TYPE.PRINTER]: 'peripheral',
  [ADMIN_DEVICE_TYPE.SCANNER]: 'peripheral',
  [ADMIN_DEVICE_TYPE.MONITOR]: 'peripheral',
  [ADMIN_DEVICE_TYPE.PROJECTOR]: 'peripheral',
  [ADMIN_DEVICE_TYPE.SPEAKER]: 'peripheral',
  [ADMIN_DEVICE_TYPE.CAMERA]: 'peripheral',
  [ADMIN_DEVICE_TYPE.MICROPHONE]: 'peripheral',

  // Storage types
  [ADMIN_DEVICE_TYPE.EXTERNAL_HDD]: 'storage',
  [ADMIN_DEVICE_TYPE.EXTERNAL_SSD]: 'storage',
  [ADMIN_DEVICE_TYPE.USB_DRIVE]: 'storage',
  [ADMIN_DEVICE_TYPE.MEMORY_CARD]: 'storage',

  // Other types
  [ADMIN_DEVICE_TYPE.DIGITAL_SIGNAGE]: 'other',
  [ADMIN_DEVICE_TYPE.POS_TERMINAL]: 'other',
  [ADMIN_DEVICE_TYPE.ATM]: 'other',
  [ADMIN_DEVICE_TYPE.KIOSK]: 'other',
  [ADMIN_DEVICE_TYPE.OTHER]: 'other',
};

export const ADMIN_DEVICE_TYPE_LABELS_DETAIL: Record<AdminDeviceTypeDetail, string> = {
  // Computer types
  [ADMIN_DEVICE_TYPE.DESKTOP]: 'Desktop Computer',
  [ADMIN_DEVICE_TYPE.WORKSTATION]: 'Workstation',
  [ADMIN_DEVICE_TYPE.SERVER]: 'Server',
  [ADMIN_DEVICE_TYPE.MAINFRAME]: 'Mainframe Computer',
  [ADMIN_DEVICE_TYPE.MINI_COMPUTER]: 'Mini Computer',
  [ADMIN_DEVICE_TYPE.ALL_IN_ONE]: 'All-in-One Computer',

  // Mobile types
  [ADMIN_DEVICE_TYPE.SMARTPHONE]: 'Smartphone',
  [ADMIN_DEVICE_TYPE.PHABLET]: 'Phablet',
  [ADMIN_DEVICE_TYPE.TABLET]: 'Tablet',
  [ADMIN_DEVICE_TYPE.E_READER]: 'E-Reader',
  [ADMIN_DEVICE_TYPE.PDA]: 'PDA',

  // Laptop types
  [ADMIN_DEVICE_TYPE.LAPTOP]: 'Laptop',
  [ADMIN_DEVICE_TYPE.NOTEBOOK]: 'Notebook',
  [ADMIN_DEVICE_TYPE.ULTRA_BOOK]: 'Ultrabook',
  [ADMIN_DEVICE_TYPE.CONVERTIBLE]: 'Convertible Laptop',
  [ADMIN_DEVICE_TYPE.CHROME_BOOK]: 'ChromeBook',
  [ADMIN_DEVICE_TYPE.GAMING_LAPTOP]: 'Gaming Laptop',

  // Wearable types
  [ADMIN_DEVICE_TYPE.SMART_WATCH]: 'Smart Watch',
  [ADMIN_DEVICE_TYPE.FITNESS_TRACKER]: 'Fitness Tracker',
  [ADMIN_DEVICE_TYPE.SMART_GLASSES]: 'Smart Glasses',
  [ADMIN_DEVICE_TYPE.VR_HEADSET]: 'VR Headset',
  [ADMIN_DEVICE_TYPE.AR_HEADSET]: 'AR Headset',
  [ADMIN_DEVICE_TYPE.HEARABLE]: 'Hearable Device',

  // TV types
  [ADMIN_DEVICE_TYPE.SMART_TV]: 'Smart TV',
  [ADMIN_DEVICE_TYPE.TV_BOX]: 'TV Box',
  [ADMIN_DEVICE_TYPE.STREAMING_STICK]: 'Streaming Stick',
  [ADMIN_DEVICE_TYPE.SET_TOP_BOX]: 'Set-Top Box',

  // Gaming types
  [ADMIN_DEVICE_TYPE.GAMING_CONSOLE]: 'Gaming Console',
  [ADMIN_DEVICE_TYPE.HANDHELD_GAMING]: 'Handheld Gaming Device',
  [ADMIN_DEVICE_TYPE.GAMING_PC]: 'Gaming PC',

  // Network types
  [ADMIN_DEVICE_TYPE.ROUTER]: 'Router',
  [ADMIN_DEVICE_TYPE.SWITCH]: 'Network Switch',
  [ADMIN_DEVICE_TYPE.FIREWALL]: 'Firewall Appliance',
  [ADMIN_DEVICE_TYPE.NETWORK_ATTACHED_STORAGE]: 'NAS Device',
  [ADMIN_DEVICE_TYPE.ACCESS_POINT]: 'Access Point',

  // Virtual types
  [ADMIN_DEVICE_TYPE.VIRTUAL_MACHINE]: 'Virtual Machine',
  [ADMIN_DEVICE_TYPE.CONTAINER]: 'Container',
  [ADMIN_DEVICE_TYPE.CLOUD_INSTANCE]: 'Cloud Instance',
  [ADMIN_DEVICE_TYPE.EMULATOR]: 'Emulator',
  [ADMIN_DEVICE_TYPE.SIMULATOR]: 'Simulator',

  // IoT types
  [ADMIN_DEVICE_TYPE.IOT_SENSOR]: 'IoT Sensor',
  [ADMIN_DEVICE_TYPE.IOT_ACTUATOR]: 'IoT Actuator',
  [ADMIN_DEVICE_TYPE.SMART_HOME]: 'Smart Home Device',
  [ADMIN_DEVICE_TYPE.INDUSTRIAL_IOT]: 'Industrial IoT Device',

  // Peripheral types
  [ADMIN_DEVICE_TYPE.PRINTER]: 'Printer',
  [ADMIN_DEVICE_TYPE.SCANNER]: 'Scanner',
  [ADMIN_DEVICE_TYPE.MONITOR]: 'Monitor',
  [ADMIN_DEVICE_TYPE.PROJECTOR]: 'Projector',
  [ADMIN_DEVICE_TYPE.SPEAKER]: 'Speaker',
  [ADMIN_DEVICE_TYPE.CAMERA]: 'Camera',
  [ADMIN_DEVICE_TYPE.MICROPHONE]: 'Microphone',

  // Storage types
  [ADMIN_DEVICE_TYPE.EXTERNAL_HDD]: 'External HDD',
  [ADMIN_DEVICE_TYPE.EXTERNAL_SSD]: 'External SSD',
  [ADMIN_DEVICE_TYPE.USB_DRIVE]: 'USB Drive',
  [ADMIN_DEVICE_TYPE.MEMORY_CARD]: 'Memory Card',

  // Other types
  [ADMIN_DEVICE_TYPE.DIGITAL_SIGNAGE]: 'Digital Signage',
  [ADMIN_DEVICE_TYPE.POS_TERMINAL]: 'POS Terminal',
  [ADMIN_DEVICE_TYPE.ATM]: 'ATM',
  [ADMIN_DEVICE_TYPE.KIOSK]: 'Kiosk',
  [ADMIN_DEVICE_TYPE.OTHER]: 'Other Device',
};

export function getAdminDeviceTypeCategory(type: AdminDeviceTypeDetail): string {
  return ADMIN_DEVICE_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminDeviceTypeLabel(type: AdminDeviceTypeDetail): string {
  return ADMIN_DEVICE_TYPE_LABELS_DETAIL[type] || 'Unknown Device Type';
}

export function isAdminMobileDeviceType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'mobile';
}

export function isAdminComputerType(type: AdminDeviceTypeDetail): boolean {
  return (
    getAdminDeviceTypeCategory(type) === 'computer' || getAdminDeviceTypeCategory(type) === 'laptop'
  );
}

export function isAdminWearableType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'wearable';
}

export function isAdminIoTType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'iot';
}

export function isAdminVirtualType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'virtual';
}

export function isAdminNetworkType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'network';
}

export function isAdminGamingType(type: AdminDeviceTypeDetail): boolean {
  return getAdminDeviceTypeCategory(type) === 'gaming';
}

export function getAdminDeviceCategoryForType(type: AdminDeviceTypeDetail): string {
  return ADMIN_DEVICE_TYPE_CATEGORIES[type] || 'other';
}
