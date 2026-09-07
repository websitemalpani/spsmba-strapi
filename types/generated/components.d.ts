import type { Schema, Struct } from '@strapi/strapi';

export interface CommitteeMember extends Struct.ComponentSchema {
  collectionName: 'components_committee_members';
  info: {
    displayName: 'Committee Member';
    icon: 'user';
  };
  attributes: {
    contact: Schema.Attribute.String;
    designation: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.Enumeration<
      ['Chairperson', 'Convenor', 'Secretary', 'Member']
    > &
      Schema.Attribute.DefaultTo<'Member'>;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    displayName: 'CTA Banner';
    icon: 'cursor';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_slides';
  info: {
    displayName: 'Hero Slide';
    icon: 'images';
  };
  attributes: {
    accent: Schema.Attribute.String;
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    copy: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPhotoCaption extends Struct.ComponentSchema {
  collectionName: 'components_sections_photo_captions';
  info: {
    displayName: 'Photo + Caption';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsStatBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_blocks';
  info: {
    displayName: 'Stat Block';
    icon: 'chart-bar';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'YouTube', 'LinkedIn', 'Twitter', 'WhatsApp']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedYearFact extends Struct.ComponentSchema {
  collectionName: 'components_shared_year_facts';
  info: {
    displayName: 'Year Fact';
    icon: 'calendar';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'committee.member': CommitteeMember;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.hero-slide': SectionsHeroSlide;
      'sections.photo-caption': SectionsPhotoCaption;
      'sections.rich-text': SectionsRichText;
      'sections.stat-block': SectionsStatBlock;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.year-fact': SharedYearFact;
    }
  }
}
