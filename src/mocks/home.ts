/**
 * Site data loader. Services, reviews, cities, prices and contact details live in
 * src/content/data/*.json (editable in Pages CMS and at /admin).
 */
import bathroomAddersData from '../content/data/bathroomAdders.json';
import bedroomAddersData from '../content/data/bedroomAdders.json';
import cityDetailsData from '../content/data/cityDetails.json';
import contactInfoData from '../content/data/contactInfo.json';
import frequencyDiscountsData from '../content/data/frequencyDiscounts.json';
import frequencyOptionsData from '../content/data/frequencyOptions.json';
import navLinksData from '../content/data/navLinks.json';
import pricingConfigData from '../content/data/pricingConfig.json';
import reviewsData from '../content/data/reviews.json';
import serviceAreasData from '../content/data/serviceAreas.json';
import serviceOptionsData from '../content/data/serviceOptions.json';
import servicesData from '../content/data/services.json';
import socialLinksData from '../content/data/socialLinks.json';
import whyUsPillarsData from '../content/data/whyUsPillars.json';
import workGalleryData from '../content/data/workGallery.json';

export type CityDetail = {
  titleEn: string;
  titleFr: string;
  descKey: string;
  neighborhoodsEn: string[];
  neighborhoodsFr: string[];
  mapEmbedUrl: string;
};

export const bathroomAdders = bathroomAddersData.items;
export const bedroomAdders = bedroomAddersData.items;
export const contactInfo = contactInfoData;
export const frequencyDiscounts = frequencyDiscountsData.items;
export const frequencyOptions = frequencyOptionsData.items;
export const navLinks = navLinksData.items;
export const pricingConfig = pricingConfigData.items;
export const reviews = reviewsData.items;
export const serviceAreas = serviceAreasData.items;
export const serviceOptions = serviceOptionsData.items;
export const services = servicesData.items;
export const socialLinks = socialLinksData.items;
export const whyUsPillars = whyUsPillarsData.items;
export const workGallery = workGalleryData.items;
export const cityDetails = cityDetailsData as Record<string, CityDetail>;
