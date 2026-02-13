import type { Metadata } from "next";
import { copy, type Lang } from "@/lib/i18n";
import { AboutGallery, type GalleryImage } from "@/components/AboutGallery";

const BASE_URL = "https://gokmens.com";

// Gallery images - WebP formatında görseller
const galleryImages: GalleryImage[] = [
  {
    src: "/assets/grainz-studio-kurucuları-burak-gökmen-çelik-abdülkadir-maslak-ve-burak-yüzgüç-riot-etkinliği-valorant-maçı-redbull-eventinde.webp",
    alt: "GRAINZ Studio kurucuları Burak Gökmen Çelik, Abdülkadir Maslak ve Burak Yüzgüç Riot etkinliği Valorant maçı Redbull eventinde",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/sebastien-borget-sandbox-game-founder-and-grainzstudio-co-founders-burak-gökmen-çelik-and-burak-yüzgüç.webp",
    alt: "Sebastien Borget (The Sandbox Game Founder) ve GRAINZ Studio kurucuları Burak Gökmen Çelik ve Burak Yüzgüç",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/burak-gokmen-celik-grainzstudio-kuruculari-binance-global-ve-binanceTR-etkinligine-geldi-2.webp",
    alt: "Burak Gökmen Çelik ve GRAINZ Studio kurucuları Binance Global ve Binance TR etkinliğinde, konferans salonunda sunum yapılırken",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/grainz-studio-kurucuları-burak-gökmen-çelik-ve-burak-yüzgüç.webp",
    alt: "GRAINZ Studio kurucuları Burak Gökmen Çelik ve Burak Yüzgüç",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/ibw-grainz-kurucuları-burak-gökmen-çelik-ve-burak-yüzgüç.webp",
    alt: "IBW etkinliğinde GRAINZ Studio kurucuları Burak Gökmen Çelik ve Burak Yüzgüç",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/grainzstudio-takim-ekip-uyeleri-burak-gokmen-celik-ve-takim-arkadaslari-tatilde-antalya-gezisi.webp",
    alt: "GRAINZ Studio takım ekip üyeleri Burak Gökmen Çelik ve takım arkadaşları tatilde Antalya gezisinde şelale önünde",
    width: 1200,
    height: 800,
  },
];

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await Promise.resolve(params);
  const t = copy[lang];
  const title = t.about.title;
  const description =
    lang === "tr"
      ? "Burak Gökmen Çelik hakkında: Web3, growth, indie making ve ürün geliştirme odağında kısa biyografi."
      : "About Burak Gökmen Çelik: brief bio focused on Web3, growth, indie making, and product development.";

  // SEO için görseller - galerideki ilk görseli veya varsayılan görseli kullan
  const ogImage = galleryImages.length > 0 
    ? `${BASE_URL}${galleryImages[0].src}` 
    : `${BASE_URL}/assets/me.png`;
  const images = galleryImages.length > 0 
    ? galleryImages.map(img => `${BASE_URL}${img.src}`)
    : [ogImage];

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        tr: `${BASE_URL}/tr/about`,
      },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `${BASE_URL}/${lang}/about`,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      siteName: "Burak Gökmen Çelik",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}) {
  const { lang } = await Promise.resolve(params);
  const t = copy[lang];

  const grainzLink = (
    <a
      href="https://grainz.site"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--accent)]"
    >
      GRAINZ
    </a>
  );
  const grainzStudioLink = (
    <a
      href="https://grainz.site"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--accent)]"
    >
      Grainz Studio
    </a>
  );

  const tr = (
    <>
      <p className="mb-5">Selam, ben Burak Gökmen Çelik.</p>
      <p className="mb-5">
        Blockchain ve kripto para evrenine adım attığımda takvimler 2019&apos;u gösteriyordu. O günden beri bu teknolojiyi
        sadece ekran başından izleyen, whitepaper okuyup geçen biri olmadım; mutfağına girdim, hamuruna dokundum ve
        teknolojinin insanla buluştuğu her noktada bizzat bulundum. Piyasaların en coşkulu boğa sezonlarını da, en sessiz
        ayı kışlarını da içeriden tecrübe ettim. Dijital ekosistemde beni @gokmeneth olarak tanıyor olabilirsiniz; bu isim
        benim için sadece bir kullanıcı adı değil, Web3 dünyasındaki 5 yılı aşkın serüvenimin, kriz yönetimlerimin ve
        bitmek bilmeyen inşa etme tutkumun bir özeti.
      </p>
      <h2 className="mb-4 mt-10 font-serif text-[22px] font-semibold leading-tight tracking-tight text-[var(--foreground)]">
        İnsan Odaklı Bir Başlangıç: Topluluk, Psikoloji ve Büyüme
      </h2>
      <p className="mb-5">
        Hikayem aslında &quot;insanları anlamakla&quot; başladı. Web3 projelerinin en kusursuz kodlara sahip olsalar bile,
        arkasında inanan bir topluluk yoksa &quot;hayalet kasabalara&quot; dönüştüğünü çok erken fark ettim. Bu yüzden ilk
        yıllarımda Community Management, Marketing ve Growth dinamiklerine kafa yordum. Sektörün en hareketli
        dönemlerinde, global devlerin yerel ve küresel stratejilerinde aktif roller üstlendim:
      </p>
      <p className="mb-5">
        <strong>The Sandbox:</strong> Global bir metaverse devinin Türkiye tarafını 3 yıl boyunca (2020-2023) yönetirken,
        dijital sahiplik ve sanal arsa çılgınlığını en önden izledim. Sadece binlerce kişilik toplulukları yönetmekle
        kalmadım; markaların metaverse evrenine entegrasyon süreçlerini yönettim, etkinlikler kurguladım ve ekosistemi
        sıfırdan inşa ettim. Bu süreç benim için sadece bir iş değil, kitlesel adaptasyonun nasıl sağlandığını analiz
        ettiğim dev bir laboratuvar çalışmasıydı.
      </p>
      <p className="mb-5">
        <strong>Binance TR:</strong> Global bir devin Türkiye pazarına girişindeki ilk zamanlarda Beta Tester olarak yer
        aldım. Sistemin uç noktalarındaki açıkları kovaladım, kullanıcı deneyimini iyileştirmek için testler yaptım ve
        ekosistemin yerel ihtiyaçlarını, Türk trader&apos;ların reflekslerini büyük bir sisteme entegre etmek için ter
        döktüm.
      </p>
      <p className="mb-5">
        <strong>Pixelcraft Studios (Aavegotchi):</strong> GameFi ve NFT mekaniklerinin, kullanıcı sadakati ve topluluk
        psikolojisi üzerindeki etkisini bizzat yönettim. Token ekonomilerinin (tokenomics) sadece matematiksel bir tablo
        olmadığını; enflasyon, ödül mekanizmaları ve merkeziyetsiz yönetişimin (DAO) bir araya gelerek nasıl yaşayan bir
        oyun ekonomisi oluşturduğuna dair derin bir tecrübe kazandım.
      </p>
      <p className="mb-5">
        Kurucusu olduğum {grainzLink} ile de bu birikimi onlarca farklı Web3 projesinin büyüme yolculuğuna aktardım. Bir
        projenin sıfırdan nasıl &quot;hype&quot; yaratacağını, botlardan arındırılmış gerçek toplulukların neye heyecanlanıp
        neye tepki verdiğini ve geçici rüzgarlar yerine sürdürülebilir bir büyümenin nasıl kurgulanacağını sahada, krizleri
        bizzat yöneterek öğrendim.
      </p>

      <h2 className="mb-4 mt-10 font-serif text-[22px] font-semibold leading-tight tracking-tight text-[var(--foreground)]">
        Evrim: Stratejiden Mimariye ve &quot;Builder&quot; Kimliğine
      </h2>
      <p className="mb-5">
        Hikaye benim için hiçbir zaman tek bir noktada sabit kalmadı, aksine sürekli şekil değiştirdi. Zamanla kendimi
        sadece strateji kuran, topluluğu yönlendiren tarafta değil; o stratejiyi teknik olarak sıfırdan hayata geçiren
        tarafta buldum. Harika pazarlama stratejilerinin kötü arayüzler yüzünden çöp oluşunu defalarca gördükten sonra,
        &quot;Neden bu deneyimi kendim inşa etmiyorum?&quot; dedim.
      </p>
      <p className="mb-5">
        Mühendislik bakış açımı, topluluk yönetimi tecrübemle birleştirerek &quot;inşa edici&quot; (builder) kimliğimi ön plana
        çıkardım. Bilgisayar mühendisliği altyapımı, sektörün pratik ihtiyaçlarıyla ve blockchain&apos;in teknik
        sınırlarıyla harmanlıyorum. Bir projenin hem kod arkasındaki mimarisini kuruyor hem de son kullanıcıya nasıl
        hissettireceğini hesaplıyorum. Bu süreçteki teknik çalışmalarımı, denemelerimi ve açık kaynaklı projelerimi
        düzenli olarak GitHub profilimde paylaşıyor ve ekosisteme geri veriyorum.
      </p>

      <h2 className="mb-4 mt-10 font-serif text-[22px] font-semibold leading-tight tracking-tight text-[var(--foreground)]">
        Peki, Masaya Ne Getiriyorum?
      </h2>
      <p className="mb-5">
        Beni Web3 dünyasında bir tür &quot;İsviçre Çakısı&quot; (Swiss Army Knife) gibi düşünebilirsiniz.
      </p>
      <p className="mb-5">
        Sektörde genellikle keskin ve aşılması zor bir ayrım vardır: Yazılımcılar pazarlamanın dilinden, kullanıcı
        psikolojisinden pek hoşlanmaz; pazarlamacılar ise kodun sınırlarından, akıllı sözleşmelerin teknik zorunluluklarından
        bihaberdir. Ben ise tam bu iki dünyanın ortasında, köprü görevi gören bir noktada duruyorum.
      </p>
      <p className="mb-5">
        <strong>Teknik Yetkinlik:</strong> Next.js, Tailwind CSS ve Solidity gibi modern teknolojileri kullanarak uçtan
        uca ürünler geliştiriyorum. Amacım sadece &quot;çalışan&quot; bir kod yazmak değil; aynı zamanda şık, hızlı, SEO uyumlu
        ve Web2 pürüzsüzlüğünde Web3 arayüzleri oluşturmak. Güvenliği merkeze alan akıllı sözleşmeler yazarak projelerin
        temelini sağlamlaştırıyorum.
      </p>
      <p className="mb-5">
        <strong>Analitik Güç ve On-Chain Vizyon:</strong> Bir yandan karmaşık teknik yapıları inşa ederken, diğer yandan o
        yapıyı kullanacak kitlenin veri odaklı analizini yapabiliyorum. Piyasanın DeFi dinamiklerine —bir Full-time DeFi
        Farmer perspektifiyle— son derece hakimim. Likidite havuzları, yield stratejileri ve on-chain hareketleri
        okuyarak geliştirdiğimiz stratejilerin ekonomik olarak da mantıklı bir temele oturmasını sağlıyorum.
      </p>

      <h2 className="mb-4 mt-10 font-serif text-[22px] font-semibold leading-tight tracking-tight text-[var(--foreground)]">
        Fikrinizi Gerçeğe Dönüştürelim
      </h2>
      <p className="mb-5">
        Şu an aktif olarak bireysel bir iş arayışında değilim. LinkedIn üzerinde de görebileceğiniz üzere, tüm enerjimi
        kendi projelerimi geliştirmeye ve {grainzStudioLink} çatısı altında teknoloji üretmeye ayırmış durumdayım.
      </p>
      <p className="mb-5">
        Şimdilerde {grainzStudioLink} ile çok net bir misyon üstleniyoruz: Aklında harika bir fikir olan fakat bunu hayata
        geçirmek için nereden başlayacağını bilmeyenlere uçtan uca destek oluyoruz. Sadece kağıt üzerinde kalmış
        vizyonları alıp; teknik mimarisinden kodlamasına, büyüme (growth) stratejisinden pazarlamasına ve organik topluluk
        inşasına kadar her alanda omuz omuza çalışarak nefes alan projelere dönüştürüyoruz. Vizyonuna inandığım, sektörde
        kalıcı bir fark yaratmayı hedefleyen hiçbir iyi fikre kayıtsız kalamam.
      </p>
      <p className="mb-5">Eğer sizin de aklınızda;</p>
      <ul className="mb-5 list-disc pl-5 space-y-2">
        <li>
          Web3 dinamiklerine ve DeFi mekaniklerine hakim, teknik altyapısı kusursuz ve estetik olarak etkileyici modern
          bir web projesi geliştirmek,
        </li>
        <li>
          Airdrop avcısı botların değil, vizyonu anlayan gerçek insanların konuştuğu, organik ve sadık bir topluluk
          kurmak,
        </li>
        <li>
          Ya da projenizi doğru kitleyle buluşturacak, kodun mantığıyla pazarın psikolojisini birleştiren hibrit (teknik +
          pazarlama) bir büyüme stratejisi çizmek varsa...
        </li>
      </ul>
      <p className="mb-5">
        Ben buradayım. Sadece bir parçayı tamamlamak için (&quot;kod yazmak&quot; veya &quot;reklam çıkmak&quot; için) değil; projenin
        bütününü gören, eksikleri fark eden ve masaya o eksik parçaları tamamlayacak vizyonu koyan hibrit bir bakış
        açısıyla konuşabiliriz.
      </p>
      <p className="mb-5">Tanıştığımıza memnun oldum!</p>
    </>
  );

  const en = (
    <>
      <p className="mb-5">Hi, I'm Gökmen.</p>
      <p className="mb-5">
        I entered the blockchain and crypto world in 2019. Since then, I haven't just watched from the sidelines—I've
        been in the kitchen, hands-on, at every point where technology meets people.
      </p>
      <p className="mb-5">
        My story started with understanding humans. I focused on community, marketing, and growth dynamics. Managing
        Turkey operations for a global giant like The Sandbox, I experienced the metaverse craze from the front row. In
        the early days of Binance TR, I worked as a beta tester—hunting bugs and improving user experience.
      </p>
      <p className="mb-5">
        With{" "}
        <a
          href="https://grainz.site"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--accent)]"
        >
          GRAINZ
        </a>
        , I've helped many Web3 projects grow—learning what creates hype from zero, what communities react to, and how
        sustainable growth is built in the field.
      </p>
      <p className="mb-5">But the story didn't end there—it evolved.</p>
      <p className="mb-5">
        Lately, I've been happiest on the builder side. As an indie maker and developer, I turn ideas into code, ship
        MVPs, and publish. Ideation is fun, but shipping a working product is a different kind of satisfaction.
      </p>
      <p className="mb-5">What do I bring to the table?</p>
      <p className="mb-5">
        Think of me as a Web3 “Swiss Army Knife”. I sit between two worlds: I can build modern interfaces with Next.js
        and also understand the psychology of the community using them.
      </p>
      <p className="mb-5">
        I'm not actively job hunting right now—I'm enjoying building my own products. But I can't ignore projects with a
        vision and a compelling story.
      </p>
      <p className="mb-5">If you want to:</p>
      <ul className="mb-5 list-disc pl-5">
        <li>Build a modern web project aligned with Web3 dynamics,</li>
        <li>Grow an organic community where real people (not bots) talk,</li>
        <li>Design a growth strategy to reach the right audience…</li>
      </ul>
      <p className="mb-5">I'm here. Let's talk with a hybrid perspective that sees the whole product.</p>
      <p className="mb-5">Nice to meet you.</p>
    </>
  );

  return (
    <section className="py-16">
      <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">{t.about.title}</h1>
      <div className="max-w-none font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
        {lang === "tr" ? tr : en}
      </div>
      
      <div className="mt-12">
        <h2 className="mb-6 font-serif text-[24px] leading-tight tracking-tight text-[var(--foreground)]">
          {lang === "tr" ? "Galeri" : "Gallery"}
        </h2>
        <AboutGallery images={galleryImages} />
      </div>
    </section>
  );
}

