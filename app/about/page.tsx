"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  const tr = (
    <>
      <p className="mb-5">Selam, ben Gökmen.</p>
      <p className="mb-5">
        Blockchain ve kripto para evrenine adım attığımda takvimler 2019&apos;u gösteriyordu. O günden beri bu
        teknolojiyi sadece ekran başından izleyen biri olmadım; mutfağına girdim, hamuruna dokundum ve insanla
        buluştuğu her noktada bizzat bulundum.
      </p>
      <p className="mb-5">
        Hikayem aslında &quot;insanları anlamakla&quot; başladı. İlk yıllarımda Community Management, Marketing ve Growth
        dinamiklerine kafa yordum. The Sandbox gibi global bir devin Türkiye tarafını yönetirken metaverse çılgınlığını
        en önden izledim. Binance TR’nin ilk zamanlarında Beta Tester olarak sistemin açıklarını kovaladım, kullanıcı
        deneyimini iyileştirmek için ter döktüm.
      </p>
      <p className="mb-5">
        Kurucusu olduğum GRAINZ ile de onlarca farklı Web3 projesinin büyüme yolculuğuna eşlik ettim. Bir projenin
        sıfırdan nasıl &quot;hype&quot; yaratacağını, toplulukların neye heyecanlanıp neye tepki verdiğini ve sürdürülebilir bir
        büyümenin nasıl kurgulanacağını sahada, yaşayarak öğrendim.
      </p>
      <p className="mb-5">Ama hikaye burada bitmedi, aksine şekil değiştirdi.</p>
      <p className="mb-5">
        Son dönemde kendimi sadece strateji kuran tarafta değil, o stratejiyi hayata geçiren &quot;inşa edici&quot; tarafta daha
        mutlu hissediyorum. Artık bir Indie Maker ve Indie Developer olarak kendi fikirlerimi koda döküyor, MVP&apos;ler
        geliştiriyor ve yayınlıyorum. Fikir üretmek güzel ama o fikri çalışır bir ürüne dönüştürmenin hazzı bambaşka.
      </p>
      <p className="mb-5">Peki, masaya ne getiriyorum?</p>
      <p className="mb-5">
        Beni Web3 dünyasında bir tür &quot;İsviçre Çakısı&quot; (Swiss Army Knife) gibi düşünebilirsiniz.
      </p>
      <p className="mb-5">
        Sektörde genellikle yazılımcılar pazarlamanın dilinden, pazarlamacılar ise kodun sınırlarından pek hoşlanmaz. Ben
        ise bu iki dünyanın ortasında duruyorum. Hem Next.js ile modern bir arayüz kodlarken hem de o arayüzü
        kullanacak topluluğun psikolojisini analiz edebiliyorum.
      </p>
      <p className="mb-5">
        Şu an aktif olarak iş aramıyorum, kendi ürünlerimi geliştirmenin tadını çıkarıyorum. Ancak vizyonuna inandığım,
        heyecan verici bir hikayesi olan projelere kayıtsız kalamam.
      </p>
      <p className="mb-5">Eğer aklınızda;</p>
      <ul className="mb-5 list-disc pl-5">
        <li>Web3 dinamiklerine hakim modern bir web projesi geliştirmek,</li>
        <li>Botların değil, gerçek insanların konuştuğu organik bir topluluk kurmak,</li>
        <li>Ya da projenizi doğru kitleyle buluşturacak bir büyüme stratejisi çizmek varsa...</li>
      </ul>
      <p className="mb-5">
        Ben buradayım. Sadece &quot;kod&quot; veya &quot;reklam&quot; için değil, projenin bütününü gören hibrit bir bakış açısıyla eksik
        parçaları tamamlamak için konuşabiliriz.
      </p>
      <p className="mb-5">Tanıştığımıza memnun oldum!</p>
    </>
  );

  const en = (
    <>
      <p className="mb-5">Hi, I’m Gökmen.</p>
      <p className="mb-5">
        I entered the blockchain and crypto world in 2019. Since then, I haven’t just watched from the sidelines—I’ve
        been in the kitchen, hands-on, at every point where technology meets people.
      </p>
      <p className="mb-5">
        My story started with understanding humans. I focused on community, marketing, and growth dynamics. Managing
        Turkey operations for a global giant like The Sandbox, I experienced the metaverse craze from the front row. In
        the early days of Binance TR, I worked as a beta tester—hunting bugs and improving user experience.
      </p>
      <p className="mb-5">
        With GRAINZ, I’ve helped many Web3 projects grow—learning what creates hype from zero, what communities react to,
        and how sustainable growth is built in the field.
      </p>
      <p className="mb-5">But the story didn’t end there—it evolved.</p>
      <p className="mb-5">
        Lately, I’ve been happiest on the builder side. As an indie maker and developer, I turn ideas into code, ship
        MVPs, and publish. Ideation is fun, but shipping a working product is a different kind of satisfaction.
      </p>
      <p className="mb-5">What do I bring to the table?</p>
      <p className="mb-5">
        Think of me as a Web3 “Swiss Army Knife”. I sit between two worlds: I can build modern interfaces with Next.js
        and also understand the psychology of the community using them.
      </p>
      <p className="mb-5">
        I’m not actively job hunting right now—I’m enjoying building my own products. But I can’t ignore projects with a
        vision and a compelling story.
      </p>
      <p className="mb-5">If you want to:</p>
      <ul className="mb-5 list-disc pl-5">
        <li>Build a modern web project aligned with Web3 dynamics,</li>
        <li>Grow an organic community where real people (not bots) talk,</li>
        <li>Design a growth strategy to reach the right audience…</li>
      </ul>
      <p className="mb-5">I’m here. Let’s talk with a hybrid perspective that sees the whole product.</p>
      <p className="mb-5">Nice to meet you.</p>
    </>
  );

  return (
    <section className="py-16">
      <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">
        {language === "tr" ? "Hakkımda" : "About"}
      </h1>
      <div className="max-w-none font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
        {language === "tr" ? tr : en}
      </div>
    </section>
  );
}


