export const Position = Object.freeze({
  Goalkeeper: 'Kaleci',
  Defender: 'Defans',
  Midfielder: 'Orta Saha',
  Forward: 'Forvet',
});

// YENİ: Kullanıcı rollerini tanımlayan enum
export const UserRole = Object.freeze({
  Talent: 'Yetenek',
  Scout: 'Gözlemci',
  Admin: 'Yönetici',
});

// YENİ: Farklı rollerin sahip olabileceği temel yetkileri tanımlayan enum
export const Permission = Object.freeze({
  // Yetenek Yetkileri
  EditOwnChildProfile: 'Kendi Çocuk Profilini Düzenle',
  UploadVideoForChild: 'Çocuk İçin Video Yükle',

  // Gözlemci Yetkileri
  ViewAllProfiles: 'Tüm Profilleri Görüntüle',
  InitiateContactWithTalent: 'Yetenekle İletişim Başlat',
  
  // Admin Yetkileri
  AccessAdminDashboard: 'Yönetim Paneline Eriş',
  ModerateContent: 'İçeriği Yönet',
  ManageUsers: 'Kullanıcıları Yönet',
});