import type { StaticImageData } from "next/image";

import t1 from "@/images/1.png";
import t2 from "@/images/2.png";
import t3 from "@/images/3.png";
import t4 from "@/images/4.png";
import t5 from "@/images/5.png";
import t6 from "@/images/6.png";
import t7 from "@/images/7.png";
import t8 from "@/images/8.png";
import t9 from "@/images/9.png";
import t10 from "@/images/10.png";
import t11 from "@/images/11.png";
import t12 from "@/images/12.png";
import t13 from "@/images/13.png";
import t14 from "@/images/14.png";
import t15 from "@/images/15.png";
import t16 from "@/images/16.png";
import t17 from "@/images/17.png";
import t18 from "@/images/18.png";
import t19 from "@/images/19.png";
import t20 from "@/images/20.png";
import t21 from "@/images/21.png";
import t22 from "@/images/22.png";
import t23 from "@/images/23.png";
import t24 from "@/images/24.png";
import t25 from "@/images/25.png";
import t26 from "@/images/26.png";
import t27 from "@/images/27.png";
import t28 from "@/images/28.png";

export type TamgaCopy = {
  title: string;
  description: string;
};

export type TamgaItem = {
  id: string;
  image: StaticImageData;
  copy: TamgaCopy;
};

const COPY_BY_NUMBER: Record<number, TamgaCopy> = {
  1: {
    title: "Kus - Bird",
    description:
      "Represents pleasure, happiness, and love. Eagles suggest power, while pigeons imply luck. Birds flying from the Tree of Life symbolize the soul’s journey to heaven.",
  },
  2: {
    title: "Basak - Spike",
    description:
      "Represents fertility and growth. Associated with vitality across nature, it stands for reproduction, abundance, and joy in Turkish design.",
  },
  3: {
    title: "Ibrik - Ewer",
    description:
      "Symbolizes pregnancy and cleansing. Based on the spouted vessel for pouring water, it often appears as a central ewer with floral extensions.",
  },
  4: {
    title: "Elma Cicegi - Apple Blossom",
    description:
      "Represents fertility and fresh beginnings. Linked to spring and renewal, it is commonly used in wedding contexts to mark a new chapter.",
  },
  5: {
    title: "Sac Bagi - Hair Band",
    description:
      "Expresses a desire for marriage. Reflects the Anatolian tradition where brides wore decorated hair bands, signaling readiness for wedding ceremonies.",
  },
  6: {
    title: "Bukagi - Fetter",
    description:
      "Symbolizes unity and bonding between lovers or family. Based on a horse fetter, it represents attachment and the wish to stay together.",
  },
  7: {
    title: "Kupe - Earring",
    description:
      "Signals a wish for marriage, as earrings are a common bridal gift. Weaving this motif communicates readiness for engagement.",
  },
  8: {
    title: "Sandik - Chest",
    description:
      "Relates to marriage and the trousseau. Represents the dowry chest filled with hopes for the future, home, and children.",
  },
  9: {
    title: "Kurt Agzi - Wolf's Mouth",
    description:
      "A protective motif to safeguard flocks and family. Based on 'fighting fire with fire,' depicting the danger grants immunity against it.",
  },
  10: {
    title: "Ask ve Birlesim - Love and Unison",
    description:
      "Echoes the Yin–Yang concept of balance. Represents harmony between counterparts and the union where each side complements the other.",
  },
  11: {
    title: "Yilan - Snake",
    description:
      "Symbolizes fertility and protection. Black snakes can imply rebirth and immortality, often acting as guardians of the Tree of Life.",
  },
  12: {
    title: "Su Yolu - Running Water",
    description:
      "Symbolizes life, purity, and fertility. Emphasizes water’s sustaining power, appearing frequently in rug borders as meanders.",
  },
  13: {
    title: "Kocboynuzu - Ram's Horn",
    description:
      "Stands for power, bravery, and heroism. Represents masculinity and strength, appearing historically across Turkic and Central Asian symbols.",
  },
  14: {
    title: "Hayat Agaci - Tree of Life",
    description:
      "Represents the hope for immortality and a bridge between earth and heaven. Depicted via stylized trees like cypress or pomegranate.",
  },
  15: {
    title: "Cengel - Hook",
    description:
      "A protective motif used to ward off bad luck and the evil eye. Its core meaning is defense and safeguarding across generations.",
  },
  16: {
    title: "Fertility - Bereket",
    description:
      "Represents fertility via the union of female and male symbols. Often includes fruit or eye motifs for abundance and protection.",
  },
  17: {
    title: "Elebelinde - Hands on Hips",
    description:
      "Symbolizes the Mother Goddess, fertility, and abundance. Represents the wish for healthy children and is deeply rooted in Anatolian tradition.",
  },
  18: {
    title: "Akrep - Scorpion",
    description:
      "Used for protection to ward off evil and venom. Historically appeared in charms as a safeguard, symbolizing pride and independence.",
  },
  19: {
    title: "Tarak - Comb",
    description:
      "Connects to marriage and birth rituals. Serves as protection against the evil eye and safeguards family transitions.",
  },
  20: {
    title: "Ei - Hand",
    description:
      "Protects against curses and the evil eye. Signifies strength and guidance, with five fingers echoing the sacred number five.",
  },
  21: {
    title: "Goz - Eye",
    description:
      "A powerful defense against the evil eye. Symbolizes perception and spiritual sight, warding off envious glares.",
  },
  22: {
    title: "Swastika",
    description:
      "An ancient symbol of luck and prosperity. Represents the sun, the four directions, and the cosmic cycle of life.",
  },
  23: {
    title: "Hac - Cross",
    description:
      "Used to ward off the evil eye by dividing it into four parts. An ancient protective symbol predating many modern uses.",
  },
  24: {
    title: "Star",
    description:
      "Represents happiness and the womb. Often appears as eight-pointed stars in kilims, symbolizing guidance and fertility.",
  },
  25: {
    title: "Muska - Amulet",
    description:
      "A talisman for protection against illness and bad luck. The motif mirrors the triangular form of physical amulets worn as shields.",
  },
  26: {
    title: "Nazarlik - The Evil Eye",
    description:
      "A charm to ward off envy and harm. Believed to absorb negative energy, protecting the owner and their home.",
  },
  27: {
    title: "Pitrak - Burdock",
    description:
      "Believed to catch and ward off the evil eye. Also symbolizes abundance and blossoms, echoing the plant's rich flowering nature.",
  },
  28: {
    title: "Edjer - Dragon",
    description:
      "Signifies strength, protection, and power. Represents mastery over air and water, often rendered with floral or geometric elements.",
  },
};

const IMAGES: Array<[number, StaticImageData]> = [
  [1, t1],
  [2, t2],
  [3, t3],
  [4, t4],
  [5, t5],
  [6, t6],
  [7, t7],
  [8, t8],
  [9, t9],
  [10, t10],
  [11, t11],
  [12, t12],
  [13, t13],
  [14, t14],
  [15, t15],
  [16, t16],
  [17, t17],
  [18, t18],
  [19, t19],
  [20, t20],
  [21, t21],
  [22, t22],
  [23, t23],
  [24, t24],
  [25, t25],
  [26, t26],
  [27, t27],
  [28, t28],
];

export const TAMGAS: TamgaItem[] = IMAGES.map(([n, image]) => ({
  id: `tamga-${n}`,
  image,
  copy: COPY_BY_NUMBER[n] ?? { title: `Tamga ${n}`, description: "" },
}));


