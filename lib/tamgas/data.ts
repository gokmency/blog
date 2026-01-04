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
      "The Kus Bird motif represents pleasure, happiness, and love. The eagle, falcon, and hawk are symbols of strength and power. The Kus Bird motif is a symbol with a wide range of connotations, including good fortune, ill fortune, pleasure and happiness, the spirit of the dead, ladies, the anticipation of news, and strength and might. Pigeons and nightingales represent good luck, whereas owls, vultures, and ravens show bad luck. Birds flying away from the tree of life show that a person is entering heaven.",
  },
  2: {
    title: "Basak - Spike",
    description:
      "The Basak Spike motif represents fertility. Because of its likeness to phallic symbols or emblems of vigor and life force, the spike or spike-like formations have been linked to fertility and growth. This relationship may be because of the widespread belief that growth, reproduction, and vitality are commonly connected with spikes on both plants and animals. Throughout history, the spike pattern has been a crucial component of Turkish rug motifs. The spike motif carpets are striking and a wonderful addition to home design, besides being a symbol of joy and fertility.",
  },
  3: {
    title: "Ibrik - Ewer",
    description:
      "The Ibrik Ewer motif represents both pregnancy and cleansing. It is based on how an Ibrik Ewer looks or is shaped. Ibriks (also known as ewers) are spout-equipped containers for holding and pouring liquids. Although the Turkish word Ibrik merely means a pitcher or ewer, the phrase is frequently used to refer to a Turkish coffee pot. It is frequently shown as a symmetrical pattern with a center vase or ewer and spreading stylized flora and other ornamental embellishments.",
  },
  4: {
    title: "Elma Cicegi - Apple Blossom",
    description:
      "The Elma Cicegi Apple Blossom motif is a representation of fertility. It is also a popular symbol for wedding decorations since it signifies the start of a new chapter in a couple's life together. Apple flowers have five petals and are often white or light pink. These are among the first flowers to blossom after winter, representing spring and fresh beginnings. It is frequently employed to produce an aesthetic that is new, romantic, or whimsical.",
  },
  5: {
    title: "Sac Bagi - Hair Band",
    description:
      "The Sac Bagi Hair Band motif suggests a longing for marriage. In Anatolian villages, it is customary for females to grow their hair out until they are married. The bride also wears a hair band during the wedding ceremony as an adornment. These hair bands can be fashioned of black cord wool and embellished with beads, seashells, gold thread, horsetail, and double-twisted silk thread, among other materials. The styles, forms, and representational patterns of various hair bands vary depending on the location.",
  },
  6: {
    title: "Bukagi - Fetter",
    description:
      "The Bukagi Fetter motif symbolizes the desire to unite a family or a pair of lovers. A fetter is a cuff-like device used to restrain horses' legs from bolting. The chain ties the cuffs to one another. It represents the peace and unity of lovers. Another name for the fetter pattern is “Kostek.” It represents the continuity of the family unit, the love of the lovers, and the wish that they would always be together when used on Anatolian weavings.",
  },
  7: {
    title: "Kupe - Earring",
    description:
      "The Kupe Earring motif suggests marriage because earrings are a popular bridal gift in Turkish culture. A girl is signaling to everyone that she wants to be married when she incorporates the earring pattern into her rug. The earring and a straightforward crevice in a prayer mat suggest anticipation of marriage. The motifs utilized in creating earrings can be simple or complicated, and they can be fashioned in a variety of forms and styles. Some common earring design themes include squares, triangles, and circles.",
  },
  8: {
    title: "Sandik - Chest",
    description:
      "The Sandik Chest motif is linked to marriage. It portrays the trousseau chest that the young woman uses to store the clothing she will wear at her husband's home. The items she knitted, weaved, and embroidered show her aspirations and expectations. A girl would start weaving rugs, bags, and kilims as early as childhood to fill this chest. The Sandik Chest motif also represents the desire to have a kid and a marriage. In some contexts, it occasionally represents a coffin and death.",
  },
  9: {
    title: "Kurt Agzi - Wolf's Mouth",
    description:
      "The Kurt Agzi Wolf's Mouth motif represents the weavers' wish for wolf protection for their flocks. It consists of a traditional wolf's mouth pattern, which was originally used in antiquity to protect tribes and their cattle from wolves. This design was imitated in weaving with the belief that one may be protected from anything if one did so (fighting fire with fire). Wolves were a major danger because nomadic people bred livestock. Since then, the image stands for broad defense against evil spirits and creatures.",
  },
  10: {
    title: "Ask ve Birlesim - Love and Unison",
    description:
      "The motif Aşk ve Birleşim (Love and Unison) is derived from the Far-East “Yin-Yang.” It stands for the desire for a connection that is harmoniously balanced between a man and a woman. It represents duality. The pattern often comprises two opposite hues with a dot in the opposite color to signify that nothing in nature is perfect or error-free. Love and Unison demonstrates harmony between two opposites by including a little of each.",
  },
  11: {
    title: "Yilan - Snake",
    description:
      "The Yilan Snake motif is employed as a fertility symbol and for defensive purposes. Black snakes can represent rebirth, immortality, and infinity and are also employed as a sign of joy and fertility in Anatolian weavings. The snake is also responsible for watching after the tree of life. Snakes have a long and important relationship with human history; the motif of a snake appears in all of existence's stories. A flat weave rug with a visually attractive snake design is manufactured by meticulously fusing warps and wefts of various colors.",
  },
  12: {
    title: "Su Yolu - Running Water",
    description:
      "The Su Yolu Running Water motif represents the ability of water to sustain life. It may also represent purity and fertility. It is said that consuming this water grants immortality, strengthens the frail and elderly, and changes the ugly into the beautiful. It underlines how crucial water is to humanity. As a result, this motif, which symbolizes life itself, is frequently used in Turkish rug border designs. The same subject is expressed through motifs like meanders, clouds, and vases.",
  },
  13: {
    title: "Kocboynuzu - Ram's Horn",
    description:
      "The Koç Boynuzu Ram's Horn motif is frequently employed on carpets and kilims as a symbol of power, bravery, and heroism. The ram's horn represents masculinity, masculine fertility, and power with its unfailing strength. The lady who has woven this design is wishing for a partner who will be strong in all ways. It served as the national emblem of the Turkish States established in Central Asia. The Hittite, Phrygian, and Seljuk civilizations all often used the ram motif. This design was inspired by the helix, a symbol of eternity.",
  },
  14: {
    title: "Hayat Agaci - Tree of Life",
    description:
      "The Hayat Agaci Tree of Life motif represents the hope for life after death or the quest for immortality. It may also allude to eternal life. This pattern, which includes both earth and heaven, is the universal representation of life rising to the heavens. The tree of life is represented by stylized versions of different plants, including cypress, palm, pomegranate, date, fig, olive, vine, oak, and beech. The tree is frequently mounted upside down on a wall since it is believed that its roots are in heaven.",
  },
  15: {
    title: "Cengel - Hook",
    description:
      "The Cengel Hook motif is a symbol intended to ward against bad luck. It is thought to have developed from the conviction that they are the finest defenses against evil eyes. Depending on the design and place of origin of the rug, hook rug themes can differ. Although the motif may have somewhat changed as it was passed down from generation to generation, they still convey the same emotions of protection and defense.",
  },
  16: {
    title: "Fertility - Bereket",
    description:
      "The hands-on-hips (female) and ram's-horn (male) symbols are used together in the Bereket fertility motif to represent a man and a woman united. Fruits with several seeds, such as pomegranates and crops, can also denote fertility. A central eye motif is often added to protect the family from the bad eye. The motif can be found in artifacts from really old times, and there is a unique variation of it in almost every region.",
  },
  17: {
    title: "Elebelinde - Hands on Hips",
    description:
      "Elebelinde (hands on hips) is a common and extensively used rug theme. It represents the mother goddess, a woman carrying a kid, fertility, plenty, or the desire to have healthy offspring, as well as the productivity of both animals and plants. It represents life, birth, and the desire for a kid to be born. In ancient societies, this pattern was associated with the mother goddess and is a crucial component of all forms of art from Mesopotamia and Anatolia.",
  },
  18: {
    title: "Akrep - Scorpion",
    description:
      "The Akrep Scorpion motif is employed to ward against scorpions. It is a representation of power and safety. People used to wear jewelry shaped like scorpions or embellished with scorpion tails because they were afraid of the venom a scorpion may inject into them. Symbols of the scorpion are used as charms to ward against harmful or evil forces. The scorpion design was used frequently, showing that the rug warded off evil. The scorpion is also a representation of pride and freedom.",
  },
  19: {
    title: "Tarak - Comb",
    description:
      "The Tarak Comb motif has a strong connection to marriage and childbirth. It indicates the intention to safeguard marriage and childbirth from the evil eye when employed as a defense against it. It also stands for the water of life and rain. The design of the comb motif may vary depending on the weaver. Although the designs vary between tribes and localities, it is widespread throughout Anatolia.",
  },
  20: {
    title: "Ei - Hand",
    description:
      "The Ei Hand motif is employed to ward against curses and the evil eye. Depending on the context, it can have a variety of shapes and connotations, but in general, it is linked to strength, power, protection, direction, and creativity. Five is a lucky number, hence the fingers on the hand are the number five. This motif has been used from very ancient times. The hand is frequently utilized in rituals, amulets, and talismans to ward off evil spirits, provide good luck, or give healing.",
  },
  21: {
    title: "Goz - Eye",
    description:
      "The Goz eye, according to popular belief, is the best defense against the evil eye. It is frequently shown as a spot inside of a triangle, square, or quadrangle, generally in the color blue. The human eye often has the shape of a diamond with four distinct sections. The notion of sight, perception, and knowledge are frequently connected with the eye. It is a potent symbol that, depending on the situation and cultural context, may signify several things but primarily protection.",
  },
  22: {
    title: "Swastika",
    description:
      "The swastika, a version of the cross design, has been a traditional rug theme for ages. It is an age-old emblem that has been utilized by several cultures all over the globe for countless years. The swastika is a symbol of luck, wealth, and well-being in various cultures. It is frequently incorporated into religious architecture, art, and rituals. The sun, the four cardinal points, and the cycle of life are also represented by this sign.",
  },
  23: {
    title: "Hac - Cross",
    description: "Description will be added.",
  },
  24: {
    title: "Star",
    description:
      "The Star motif represents happiness. It is also a fertility sign and represents the womb. Anatolian kilims frequently include eight-pointed stars because of the weaving restrictions and methods. The six-pointed stars, sometimes referred to as “Solomon's Seal,” are used to represent the mother goddess figures' wombs. Each interior area may benefit from the traditional elegance and cultural importance that a star motif kilim can bring.",
  },
  25: {
    title: "Muska - Amulet",
    description:
      "Muska is a Turkish term for a little piece of paper or fabric with prayers, Quran passages, or other religious inscriptions inscribed on it. Muska is frequently worn as an amulet or charm to fend off evil spirits, disease, and bad luck since it is said to have therapeutic and protecting characteristics. In Arabic, it is also called “Ta'wiz.” The rug motif mimics the triangular shape of these physical amulets to provide spiritual protection to the household.",
  },
  26: {
    title: "Nazarlik - The Evil Eye",
    description:
      "The Turkish word Nazarlik or Nazar indicates a little trinket or ornament that is used to ward off the evil eye. The evil eye is a superstition notion that claims that by just gazing at someone with envy or jealousy, one might damage or bring ill luck onto them. The Nazarlik motif is thought to absorb destructive energy and shield the owner from harm. It is frequently found in Turkish culture and is used as decoration in homes and workplaces.",
  },
  27: {
    title: "Pitrak - Burdock",
    description:
      "Pitrak Burdock is a plant of the Asteraceae family. It has been used for a very long time in conventional medicine. It is thought to protect against the evil eye. The usage of this image on flour sacks as a representation of wealth stems from the phrase “like a burdock,” which signifies full of blossoms. The plant is well-known for its substantial, heart-shaped leaves and summer-blooming purple blooms.",
  },
  28: {
    title: "Edjer - Dragon",
    description:
      "Edjer Dragon has long been a well-liked motif in Turkish mythology and art, signifying strength, protection, and power. Turkish dragon motifs are known for their elaborate patterns and vivid colors, and they frequently combine the dragon motif with floral or geometric patterns. The dragon represents the master of air and water. The Turkish art forms of textiles, pottery, and architecture all feature this pattern.",
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


