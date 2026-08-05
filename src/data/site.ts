export type Service = {
  number: string;
  field: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
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
  representative: "代表取締役　澤田 叶夢",
} as const;

export const services: readonly Service[] = [
  {
    number: "01",
    field: "TREE",
    title: "伐採・抜根",
    description: "樹木の伐採から、根の撤去まで。現場の状態を確認しながら内容を整理します。",
  },
  {
    number: "02",
    field: "GROUND",
    title: "草刈り・年間管理",
    description: "一度の草刈りから、継続的な緑地管理までご相談いただけます。",
  },
  {
    number: "03",
    field: "TREE",
    title: "剪定",
    description: "庭木や敷地内の樹木について、状態とご希望を確認します。",
  },
  {
    number: "04",
    field: "EXTERIOR",
    title: "外構工事",
    description: "建物の外まわりを、用途と現在の状態に合わせて整えます。",
  },
  {
    number: "05",
    field: "SITE",
    title: "足場仮設",
    description: "工事内容と現場条件を確認し、必要な足場仮設をご案内します。",
  },
  {
    number: "06",
    field: "GROUND",
    title: "防草シート施工",
    description: "施工範囲と下地の状態を確認し、雑草対策を進めます。",
  },
] as const;

export const processSteps: readonly ProcessStep[] = [
  { number: "01", title: "ご相談" },
  { number: "02", title: "内容確認" },
  { number: "03", title: "現場確認・お見積り" },
  { number: "04", title: "作業" },
  { number: "05", title: "完了確認" },
] as const;

export const faqs: readonly Faq[] = [
  {
    question: "どのような仕事を相談できますか？",
    answer:
      "伐採・抜根、草刈り・年間管理、剪定、外構工事、足場仮設、防草シート施工についてご相談いただけます。内容が複数にまたがる場合も、まずは概要をお知らせください。",
  },
  {
    question: "現場の写真だけでも相談できますか？",
    answer:
      "写真は状況確認の参考になります。場所と気になる箇所が分かる写真をお送りください。写真だけで判断が難しい場合は、追加で確認したい内容をご案内します。",
  },
  {
    question: "見積りの前に現場確認はありますか？",
    answer:
      "ご相談内容や現場の状況に応じて、確認方法をご案内します。まずは場所とご希望の内容をお知らせください。",
  },
  {
    question: "法人からも相談できますか？",
    answer:
      "法人・管理を担当されている方からのご相談も受け付けています。対象の場所と相談内容を添えてご連絡ください。",
  },
] as const;

export const instagramHref =
  "https://www.instagram.com/sawadatomugroup?igsh=aG04ZGp1NHludTBl";
