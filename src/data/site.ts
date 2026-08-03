export type AnchorLink = {
  label: string;
  href: `#${string}`;
};

export type TrustSignal = {
  label: string;
  title: string;
  detail: string;
};

export type AudiencePath = {
  label: string;
  title: string;
  description: string;
  href: `#${string}`;
  cta: string;
};

export type Service = {
  number: string;
  slug: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export const siteIdentity = {
  name: "株式会社STG",
  englishName: "SAWADA TOMU GROUP",
  tagline: "あなたを笑顔にする会社",
  statement: "どんな夢も叶えていく",
} as const;

export const anchorLinks: readonly AnchorLink[] = [
  { label: "STGについて", href: "#about" },
  { label: "業務内容", href: "#services" },
  { label: "仕事の流れ", href: "#process" },
  { label: "よくある質問", href: "#faq" },
  { label: "お問い合わせ", href: "#contact" },
];

export const trustSignals: readonly TrustSignal[] = [
  {
    label: "TREE WORK",
    title: "樹木に関わる仕事",
    detail: "伐採・抜根、剪定。現場の状態と周囲の状況を確認し、必要な作業を整理します。",
  },
  {
    label: "GROUND CARE",
    title: "緑地を整える仕事",
    detail: "草刈りと年間管理。対象となる範囲やご希望を伺い、相談内容を明確にします。",
  },
  {
    label: "SITE WORK",
    title: "外まわりと現場の仕事",
    detail: "外構工事、防草シート施工、足場仮設。それぞれの現場条件に合わせて確認します。",
  },
];

export const audiencePaths: readonly AudiencePath[] = [
  {
    label: "FOR BUSINESS",
    title: "法人・管理を任されている方",
    description:
      "敷地管理、伐採、外構、足場仮設など、依頼したい内容と現場の状況をお聞かせください。",
    href: "#contact",
    cta: "法人のご相談へ",
  },
  {
    label: "FOR OWNERS",
    title: "庭木や敷地でお困りの方",
    description:
      "木や雑草、外まわりのお困りごとに、どの業務が合うか分からない段階からご確認いただけます。",
    href: "#services",
    cta: "対応業務を見る",
  },
  {
    label: "FOR CAREERS",
    title: "STGで働くことを考えている方",
    description:
      "仕事内容と、STGが仕事や人に向き合ううえで大切にしている考え方をご覧ください。",
    href: "#contact",
    cta: "採用について問い合わせる",
  },
];

export const services: readonly Service[] = [
  {
    number: "01",
    slug: "tree-removal",
    title: "伐採・抜根",
    description:
      "樹木の伐採から根の撤去まで。周囲の状況を確認し、必要な作業内容を整理します。",
  },
  {
    number: "02",
    slug: "grounds-maintenance",
    title: "草刈り・年間管理",
    description:
      "一度の草刈りから継続的な管理のご相談まで。対象範囲やご希望の頻度を確認します。",
  },
  {
    number: "03",
    slug: "pruning",
    title: "剪定",
    description:
      "庭木や敷地内の樹木について、現在の状態とご希望を伺いながら作業内容を確認します。",
  },
  {
    number: "04",
    slug: "exterior",
    title: "外構工事",
    description:
      "敷地まわりの整備について、用途と現在の状態に合わせてご相談を承ります。",
  },
  {
    number: "05",
    slug: "scaffolding",
    title: "足場仮設",
    description:
      "工事内容と現場条件を確認し、足場仮設に必要な内容を整理してご案内します。",
  },
  {
    number: "06",
    slug: "weed-control-sheet",
    title: "防草シート施工",
    description:
      "雑草対策として、施工範囲や下地の状態を確認しながら作業内容をご案内します。",
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "ご相談",
    description:
      "ご希望の業務、現場の場所や状態、希望時期など、分かる範囲でお知らせください。",
  },
  {
    number: "02",
    title: "内容の確認",
    description:
      "現場写真がある場合は、状況確認の参考としてお送りください。追加で必要な情報を確認します。",
  },
  {
    number: "03",
    title: "現場確認・お見積り",
    description:
      "ご相談内容に応じて現場を確認し、作業範囲と進め方、お見積りをご案内します。",
  },
  {
    number: "04",
    title: "作業",
    description:
      "事前に確認した内容に沿って作業を進めます。気になる点は作業前にご確認ください。",
  },
  {
    number: "05",
    title: "完了の確認",
    description:
      "作業後の状態をご確認いただき、依頼内容との行き違いがないよう仕上がりを確認します。",
  },
];

export const faqs: readonly Faq[] = [
  {
    question: "どのような仕事を相談できますか？",
    answer:
      "伐採・抜根、草刈り・年間管理、剪定、外構工事、足場仮設、防草シート施工についてご相談いただけます。内容が複数にまたがる場合も、まずは現場の状況をお知らせください。",
  },
  {
    question: "現場の写真だけでも相談できますか？",
    answer:
      "写真は状況確認の参考になります。全体が分かる写真と、気になる箇所の写真があると確認が進めやすくなります。写真だけで判断できない場合は、現場確認をご案内します。",
  },
  {
    question: "見積りの前に現場確認はありますか？",
    answer:
      "ご相談の内容や現場の状況により、現場確認をお願いする場合があります。作業範囲や条件を確認したうえで、お見積りをご案内します。",
  },
  {
    question: "法人からも相談できますか？",
    answer:
      "法人・管理を任されている方からのご相談も、依頼内容と現場の状況を添えてお問い合わせください。必要な確認事項を整理してご案内します。",
  },
  {
    question: "対応できる地域を知りたいです。",
    answer:
      "場所とご相談内容を添えてお問い合わせください。内容を確認したうえで、対応についてご案内します。",
  },
  {
    question: "求人について質問できますか？",
    answer:
      "採用に関するご質問は、お問い合わせからご連絡ください。募集状況や仕事内容など、確認したい内容をお知らせください。",
  },
];
