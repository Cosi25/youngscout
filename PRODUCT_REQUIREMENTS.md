
# **YoungScout: Ürün Gereksinimleri Dokümanı (MVP)**

**Versiyon:** 1.0 | **Tarih:** 2024-10-26

---

### **1. Giriş ve Sorun Tanımı**

Genç futbolcu izleme süreci parçalı, verimsiz ve genellikle uzak bölgelerdeki yetenekli oyuncular için erişilemez durumdadır. Gözlemciler (scout'lar) sistematik olarak yeni yetenekleri keşfetmekte zorlanırken, ebeveynler çocuklarının gizliliğini ve güvenliğini tehlikeye atmadan yeteneklerini sergileyebilecekleri güvenli bir platformdan yoksundur.

**YoungScout**, genç futbolcuları kulüpler, gözlemciler ve menajerlerle buluşturan güvenli, mobil öncelikli bir platformdur. Oyuncuların dijital bir profil oluşturması, öne çıkan videolarını yüklemesi ve tamamen ebeveyn denetimi altında doğrulanmış profesyoneller tarafından keşfedilmesi için yasalara uygun bir ortam sağlar.

### **2. Hedef Kitle ve Personal_ar**

*   **Çocuk Oyuncu (6-17 Yaş):** Yeteneğin kendisi. Oynamaya ve becerilerini sergilemeye odaklanır. Platform, bir vasi tarafından *onun adına* kullanılır.
*   **Ebeveyn/Vasi:** Birincil hesap sahibi ve denetleyici. Çocuğun profilini oluşturmaktan, içerik yüklemekten, gizliliği yönetmekten ve tüm iletişimi yürütmekten sorumludur. Ana endişesi çocuğun güvenliği ve veri gizliliğidir.
*   **Gözlemci / Kulüp Temsilcisi:** Profesyonel kullanıcı. Belirli kriterlere (yaş, pozisyon, beceriler) göre yetenekleri keşfetmek, filtrelemek ve değerlendirmek için verimli araçlara ihtiyaç duyar. Platformun doğrulama ve güvenlik önlemlerine güvenmesi gerekir.

### **3. MVP Hedefleri ve Başarı Metrikleri**

| Hedef | Temel Başarı Metriği/Metrikleri |
| --- | --- |
| **Güvenli ve Güvenilir Bir Topluluk Oluşturmak** | 1. Çocuk profillerinin %100'ünün doğrulanmış bir veli izin akışıyla oluşturulması. <br/> 2. İşaretlenen içerik için müdahale süresinin 24 saatten az olması. |
| **Temel Değer Önerisini Doğrulamak** | 1. **Aktivasyon:** İlk 3 ay içinde en az bir video yüklenmiş 500'den fazla tam olarak doldurulmuş çocuk profili. <br/> 2. **Etkileşim:** Haftalık olarak aktif olarak arama yapan/profil görüntüleyen 50'den fazla doğrulanmış gözlemci hesabı. |
| **Yetenek Keşfini Sağlamak** | 1. **Gözlemci Aktivitesi:** Oturum başına gözlemci başına ortalama 10'dan fazla oyuncu profili görüntülemesi. <br/> 2. **Bağlantılar:** Platform üzerinden gözlemcilerden ebeveynlere gönderilen 100'den fazla ilk iletişim talebi. |

### **4. Temel Özellikler (MVP Kapsamı)**

| ID | Özellik Adı | Kullanıcı Hikayesi / Açıklama |
| :--- | :--- | :--- |
| F01 | **Ebeveyn/Vasi Kaydı** | Bir ebeveyn olarak, çocuğumun profilini yönetebilmek için e-posta/telefonumu kullanarak güvenli bir hesap oluşturmak istiyorum. |
| F02 | **Veli İzin Akışı** | Bir ebeveyn olarak, çocuğumun profili oluşturulmadan önce (veri, medya ve iletişimle ilgili) açık bir izin formunu incelemeli ve dijital olarak imzalamalıyım. |
| F03 | **Çocuk Profili Oluşturma** | Bir ebeveyn olarak, çocuğumun kimliğini sergilemek için temel bilgileri (isim, yaş, pozisyon, ülke) ve bir biyografi içeren bir profil oluşturmak istiyorum. |
| F04 | **Video Yükleme ve Yönetimi** | Bir ebeveyn olarak, çocuğum için öne çıkan videolar yüklemek istiyorum ve bu videoların yayınlanmadan önce bir moderasyon sistemi tarafından otomatik olarak kontrol edilmesini istiyorum. |
| F05 | **Gözlemci/Kulüp Kaydı** | Bir gözlemci olarak, yetenek veritabanına erişim kazanabilmek için doğrulanmış bir profesyonel hesap oluşturmak istiyorum. |
| F06 | **Yetenek Keşif Paneli** | Bir gözlemci olarak, ilgili yetenekleri verimli bir şekilde bulabilmek için oyuncuları temel özelliklere (yaş, pozisyon, ülke) göre aramak ve filtrelemek istiyorum. |
| F07 | **Oyuncu Profili Görüntüleme** | Bir gözlemci olarak, potansiyelini değerlendirmek için bir oyuncunun biyografisi, istatistikleri ve videoları dahil olmak üzere tam profilini görüntülemek istiyorum. |
| F08 | **Güvenli İlk İletişim** | Bir gözlemci olarak, ilgi göstermek için bir oyuncunun ebeveyniyle güvenli, uygulama içi bir mesajlaşma sistemi aracılığıyla iletişim kurmak istiyorum. |
| F09 | **İçerik Moderasyonu ve Raporlama** | Bir kullanıcı olarak, uygunsuz içerik veya profilleri bildirmek istiyorum. Bir yönetici olarak, işaretlenen içeriği incelemek ve işlem yapmak için bir panele ihtiyacım var. |

### **5. Fonksiyonel Olmayan Gereksinimler**

*   **Güvenlik:** Tüm veriler aktarım sırasında (TLS 1.2+) ve beklemedeyken şifrelenmelidir. Güvenli depolamaya doğrudan medya yüklemeleri için önceden imzalanmış URL'ler (pre-signed URLs) uygulanmalıdır.
*   **Gizlilik ve Uyumluluk:** Platform, ilk günden itibaren KVKK (Türkiye), GDPR (AB) ve COPPA (ABD) ile uyumlu olacak şekilde tasarlanmalıdır. Veri minimizasyonu temel bir ilkedir.
*   **Performans:** Video dönüştürme ve profil yükleme süreleri, sorunsuz bir mobil deneyim için optimize edilmelidir.

### **6. MVP Kapsamı Dışındakiler**

*   Gelişmiş ML tabanlı yetenek puanlaması veya oyuncu eşleştirmesi.
*   Oyuncular arasında veya gözlemciler ile oyuncular arasında doğrudan mesajlaşma.
*   Sosyal paylaşım özellikleri.
*   Uygulama içi abonelikler veya para kazanma özellikleri.
*   Gözlemciler/kulüpler için gelişmiş analiz panelleri.
