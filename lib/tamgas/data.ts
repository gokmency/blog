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
import t24 from "@/images/24.png";
import t25 from "@/images/25.png";
import t26 from "@/images/26.png";
import t27 from "@/images/27.png";
import t28 from "@/images/28.png";
import t29 from "@/images/29.png";

export type TamgaCopy = {
  title: string;
  description: string;
};

export type TamgaItem = {
  id: string;
  image: StaticImageData;
  en: TamgaCopy;
  tr: TamgaCopy;
};

const DEFAULT_EN = (n: number): TamgaCopy => ({
  title: `Tamga ${n}`,
  description: "Details will be added.",
});

const DEFAULT_TR = (n: number): TamgaCopy => ({
  title: `Tamga ${n}`,
  description: "Detayları sonra eklenecek.",
});

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
  [24, t24],
  [25, t25],
  [26, t26],
  [27, t27],
  [28, t28],
  [29, t29],
];

export const TAMGAS: TamgaItem[] = IMAGES.map(([n, image]) => ({
  id: `tamga-${n}`,
  image,
  en: DEFAULT_EN(n),
  tr: DEFAULT_TR(n),
}));


