export enum Position {
  Goalkeeper = 'Kaleci',
  Defender = 'Defans',
  Midfielder = 'Orta Saha',
  Forward = 'Forvet',
}

// YENİ: Kullanıcı rollerini tanımlayan enum
export enum UserRole {
  Talent = 'Yetenek',
  Scout = 'Gözlemci',
  Admin = 'Yönetici',
}

// YENİ: Farklı rollerin sahip olabileceği temel yetkileri tanımlayan enum
export enum Permission {
  // Yetenek Yetkileri
  EditOwnChildProfile = 'Kendi Çocuk Profilini Düzenle',
  UploadVideoForChild = 'Çocuk İçin Video Yükle',

  // Gözlemci Yetkileri
  ViewAllProfiles = 'Tüm Profilleri Görüntüle',
  InitiateContactWithTalent = 'Yetenekle İletişim Başlat',
  
  // Admin Yetkileri
  AccessAdminDashboard = 'Yönetim Paneline Eriş',
  ModerateContent = 'İçeriği Yönet',
  ManageUsers = 'Kullanıcıları Yönet',
}

export interface Player {
  id: number;
  name: string;
  age: number;
  position: Position;
  height: number; // in cm
  weight: number; // in kg
  bio: string;
  profileImageUrl: string;
  videoUrl: string;
  talentScore: number; // 1-100
  tags: string[];
  country: string;
  countryCode: string;
  status: 'active' | 'suspended'; // YENİ: Moderasyon durumu
}

// GÜNCELLENDİ: UserSession interface'i artık UserRole enum'ını kullanıyor
export interface UserSession {
  role: UserRole;
  consented: boolean;
}