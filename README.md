# Discord Direct Message Bot

Discord sunucunuzdaki üyelere toplu veya bireysel özel mesaj göndermenizi sağlayan bir bot.

## Özellikler

-  Toplu mesaj gönderme: Tüm sunucu üyelerine aynı anda mesaj gönderebilirsiniz
-  Bireysel mesaj gönderme: Belirli bir kullanıcıya mesaj gönderebilirsiniz
-  Placeholder desteği: Mesajlarınızı kişiselleştirebilirsiniz
-  Kalıcı mesaj depolama: Ayarladığınız mesajlar dosyaya kaydedilir, bot yeniden başlatılsa bile korunur
-  Modal ve input desteği: Mesaj ayarlama için iki farklı yöntem
-  Rate limiting: Toplu gönderimlerde güvenlik için otomatik gecikme

## Gereksinimler

-  Node.js 20.0.0 veya üzeri
-  Discord Bot Token
-  Discord Application Client ID

## Kurulum

1. Projeyi klonlayın veya indirin:

```bash
git clone https://github.com/thrashxr/discordDirectMessage.git
cd discordDirect
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin ve bot bilgilerinizi ekleyin:

```
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

5. Botu başlatın:

```bash
npm start
```

## Komutlar

### `/setmessage`

Gönderilecek mesaj içeriğini ayarlar. İki yöntemle kullanılabilir:

-  Input ile: Komut parametresi olarak mesajı yazabilirsiniz
-  Modal ile: Parametre boş bırakıldığında modal pencere açılır

**Yetki:** Administrator

### `/sendtoall`

Ayarladığınız mesajı sunucudaki tüm üyelere gönderir. Botlar ve botun kendisi hariç tutulur.

**Yetki:** Administrator

**Not:** Her mesaj arasında 1 saniye gecikme vardır (rate limiting).

### `/sendtouser`

Ayarladığınız mesajı belirli bir kullanıcıya gönderir.

**Yetki:** Administrator

### `/help`

Placeholder'lar ve komutlar hakkında bilgi gösterir.

**Yetki:** Herkes

## Placeholder'lar

Mesajlarınızda aşağıdaki placeholder'ları kullanabilirsiniz:

-  `{username}` - Kullanıcının kullanıcı adı
-  `{mention}` - Kullanıcıyı mention et
-  `{displayName}` - Kullanıcının görünen adı (sunucuda ayarlanmışsa)
-  `{guild}` - Sunucu adı
-  `{memberCount}` - Sunucudaki toplam üye sayısı

### Örnek Kullanım

```
Merhaba {mention}!
{guild} sunucusuna hoş geldin!
Şu anda {memberCount} üyemiz var.
```

Bu mesaj gönderildiğinde:

```
Merhaba @Kullanıcı!
Discord Sunucusu sunucusuna hoş geldin!
Şu anda 150 üyemiz var.
```

## Proje Yapısı

```
discordDirect/
├── commands/          # Slash komutları
│   ├── help.js
│   ├── sendToAll.js
│   ├── sendToUser.js
│   └── setMessage.js
├── utils/             # Yardımcı fonksiyonlar
│   ├── messageFormatter.js
│   └── messageStorage.js
├── data/              # Mesaj depolama (otomatik oluşturulur)
│   └── message.json
├── index.js           # Ana bot dosyası
├── package.json
└── .env               # Bot token ve client ID (oluşturulmalı)
```

## Notlar

-  Mesajlar `data/message.json` dosyasına kaydedilir
-  `.env` dosyası git'e commit edilmez (güvenlik için)
-  `data/` klasörü git'e commit edilmez
-  Bot yeniden başlatıldığında mesajlar korunur

## Hata Yönetimi

Bot, aşağıdaki durumları otomatik olarak yönetir:

-  Kullanıcıların DM'lerinin kapalı olması
-  Botun engellenmiş olması
-  Ağ hataları

Başarılı ve başarısız gönderim sayıları raporlanır.

## Lisans

Bu proje ISC lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için önce bir issue açarak neyi değiştirmek istediğinizi tartışın.

## Destek

Sorunlar için GitHub Issues kullanabilirsiniz.
