import type { NuxtLayout, NuxtOptions, NuxtPage } from '@nuxt/schema'
import type { StorageMounts } from 'nitropack'
import type { StorageValue } from 'unstorage'
import type { Component } from 'vue'
import type { WizardActions, WizardArgs } from '../wizard'
import type { ModuleCustomTab } from './custom-tabs'
import type { AssetInfo, AutoImportsWithMetadata, HookInfo, ImageMeta, UpdateInfo } from './integrations'
import type { ComponentRelationship } from './module'

export interface ServerFunctions {
  // Static RPCs (can be provide on production build in the future)
  getServerConfig(): NuxtOptions
  getComponents(): Component[]
  getComponentsRelationships(): Promise<ComponentRelationship[]>
  getAutoImports(): AutoImportsWithMetadata
  getServerPages(): NuxtPage[]
  getCustomTabs(): ModuleCustomTab[]
  getServerHooks(): HookInfo[]
  getServerLayouts(): NuxtLayout[]
  getStaticAssets(): Promise<AssetInfo[]>
  getPackageVersions(): UpdateInfo[]

  // Storage
  getStorageMounts(): Promise<StorageMounts>
  getStorageKeys(base?: string): Promise<string[]>
  getStorageItem(key: string): Promise<StorageValue>
  setStorageItem(key: string, value: StorageValue): Promise<void>
  removeStorageItem(key: string): Promise<void>

  // Queries
  getImageMeta(filepath: string): Promise<ImageMeta | undefined>
  getTextAssetContent(filepath: string, limit?: number): Promise<string | undefined>

  // Actions
  customTabAction(name: string, action: number): Promise<boolean>
  runWizard<T extends WizardActions>(name: T, ...args: WizardArgs<T>): Promise<void>
  openInEditor(filepath: string): void
}

export interface ClientFunctions {
  refresh(event: ClientUpdateEvent): void
  callHook(hook: string, ...args: any[]): Promise<void>
}

export type ClientUpdateEvent = keyof ServerFunctions
