// src/managers/SettingsManager.ts
import Dexie from 'dexie';
import emitter from '../../shared/utils/EventBus';
import { SettingsType } from '../settings/Settings';

class SettingsDB extends Dexie {
  settings: Dexie.Table<SettingsType, string>;

  constructor() {
    super('SettingsDB');
    this.version(1).stores({
      settings: 'name, midiEnabled, audioInput, midiInput, midiChannels'
    });
    this.settings = this.table('settings');
  }
}

class SettingsManager {
  private static instance: SettingsManager;
  private db: SettingsDB;
  private settings: SettingsType = {
    midiEnabled: false,
    audioInput: 'default', // Replace with actual default
    midiInput: 'all',
    midiChannels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  };

  private constructor() {
    this.db = new SettingsDB();
  }

  public static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager();
    }
    return SettingsManager.instance;
  }

  public async loadSettings() {
    const storedSettings = await this.db.settings.get('userSettings');
    if (storedSettings) {
      this.settings = storedSettings;
      emitter.emit('settingsUpdated', this.settings);
    } else {
      await this.saveSettings(this.settings);
    }
  }

  public async saveSettings(newSettings: SettingsType) {
    this.settings = newSettings;
    await this.db.settings.put(this.settings, 'userSettings');
    emitter.emit('settingsUpdated', this.settings);
  }

  public getSettings(): SettingsType {
    return this.settings;
  }

  // Add methods to update specific settings as needed
}

export default SettingsManager;